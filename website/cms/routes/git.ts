import { Hono } from 'hono'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { unlink } from 'fs/promises'
import { join } from 'path'

const exec = promisify(execFile)

let gitRoot: string | undefined

async function getGitRoot() {
  if (!gitRoot) {
    const { stdout } = await exec('git', ['rev-parse', '--show-toplevel'], {
      cwd: process.cwd(),
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

// Git status (file list only)
gitRoutes.get('/status', async (c) => {
  try {
    const status = await git('status', '--porcelain')
    return c.json({
      files: status
        .split('\n')
        .filter(Boolean)
        .map((line) => ({
          status: line.substring(0, 2).trim(),
          path: line.substring(3),
        })),
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

// Commit and optionally push
gitRoutes.post('/commit', async (c) => {
  const body = await c.req.json<{ message: string; paths?: string[]; push?: boolean }>()
  if (!body.message) {
    return c.json({ error: 'Missing commit message' }, 400)
  }

  try {
    if (body.paths && body.paths.length > 0) {
      await git('add', '--', ...body.paths)
    } else {
      await git('add', '-A')
    }
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

// Discard changes for a specific file
gitRoutes.post('/discard', async (c) => {
  const body = await c.req.json<{ path: string }>()
  if (!body.path) {
    return c.json({ error: 'Missing path' }, 400)
  }

  if (body.path.includes('..')) {
    return c.json({ error: 'Invalid path' }, 400)
  }

  try {
    // Check if the file is untracked (new file not known to git)
    const status = await git('status', '--porcelain', '--', body.path)
    const statusCode = status.substring(0, 2).trim()

    if (statusCode === '??' || statusCode === 'A') {
      // Untracked or newly added file: remove it
      const root = await getGitRoot()
      const fullPath = join(root, body.path)
      await unlink(fullPath)
    } else {
      // Tracked file: restore from git
      await git('checkout', '--', body.path)
    }
    return c.json({ ok: true, path: body.path })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})
