import { Hono } from 'hono'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { ROOT_DIR } from '../root.js'

const exec = promisify(execFile)

let gitRoot: string | undefined

async function getGitRoot() {
  if (!gitRoot) {
    const { stdout } = await exec('git', ['rev-parse', '--show-toplevel'], {
      cwd: ROOT_DIR,
    })
    gitRoot = stdout.trimEnd()
  }
  return gitRoot
}

async function git(...args: string[]) {
  const root = await getGitRoot()
  const { stdout } = await exec('git', args, {
    cwd: root,
    maxBuffer: 10 * 1024 * 1024, // 10MB
  })
  return stdout.trimEnd()
}

export const gitRoutes = new Hono()

// Git status (file list with staged info)
gitRoutes.get('/status', async (c) => {
  try {
    const status = await git('status', '--porcelain')
    return c.json({
      files: status
        .split('\n')
        .filter(Boolean)
        .map((line) => {
          const indexStatus = line[0]
          const worktreeStatus = line[1]
          // Show the most relevant status code
          const status =
            indexStatus !== ' ' && indexStatus !== '?'
              ? indexStatus
              : worktreeStatus !== ' '
              ? worktreeStatus
              : indexStatus
          return {
            status,
            staged: indexStatus !== ' ' && indexStatus !== '?',
            path: line.substring(3),
          }
        }),
    })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})

// Git diff for a specific file (or all files)
gitRoutes.get('/diff', async (c) => {
  const filePath = c.req.query('path')
  try {
    const args = ['diff']
    if (filePath) args.push('--', filePath)
    const diff = await git(...args)
    return c.json({ diff })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})

// Stage files
gitRoutes.post('/stage', async (c) => {
  const body = await c.req.json<{ paths: string[] }>()
  if (!body.paths?.length) {
    return c.json({ error: 'Missing paths' }, 400)
  }
  try {
    await git('add', '--', ...body.paths)
    return c.json({ ok: true })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})

// Unstage files
gitRoutes.post('/unstage', async (c) => {
  const body = await c.req.json<{ paths: string[] }>()
  if (!body.paths?.length) {
    return c.json({ error: 'Missing paths' }, 400)
  }
  try {
    await git('reset', 'HEAD', '--', ...body.paths)
    return c.json({ ok: true })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})

// Commit staged files and optionally push
gitRoutes.post('/commit', async (c) => {
  const body = await c.req.json<{ message: string; push?: boolean }>()
  if (!body.message) {
    return c.json({ error: 'Missing commit message' }, 400)
  }

  try {
    const commitOutput = await git('commit', '-m', body.message)

    let pushOutput = ''
    if (body.push) {
      const branch = process.env.GIT_BRANCH || 'main'

      // If a PAT is configured, set the remote URL with auth
      const pat = process.env.GIT_PAT
      const repoUrl = process.env.GIT_REPO_URL
      if (pat && repoUrl) {
        const authedUrl = repoUrl.replace(
          'https://',
          `https://x-access-token:${pat}@`
        )
        await git('remote', 'set-url', 'origin', authedUrl)
      }

      pushOutput = await git('push', 'origin', branch)
    }

    return c.json({ ok: true, commit: commitOutput, push: pushOutput })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})

// Discard all changes for a specific file (staged + unstaged)
gitRoutes.post('/discard', async (c) => {
  const body = await c.req.json<{ path: string }>()
  if (!body.path) {
    return c.json({ error: 'Missing path' }, 400)
  }

  if (body.path.includes('..')) {
    return c.json({ error: 'Invalid path' }, 400)
  }

  try {
    // porcelain format: XY where X=index (staged), Y=worktree
    const status = await git('status', '--porcelain', '--', body.path)
    const indexStatus = status[0]

    if (indexStatus === '?') {
      // Untracked file: delete it
      const root = await getGitRoot()
      await unlink(join(root, body.path))
    } else if (indexStatus === 'A') {
      // Newly added (staged): unstage then delete
      await git('reset', 'HEAD', '--', body.path)
      const root = await getGitRoot()
      await unlink(join(root, body.path))
    } else {
      // Tracked file: fully restore to HEAD
      await git('checkout', 'HEAD', '--', body.path)
    }
    return c.json({ ok: true, path: body.path })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})
