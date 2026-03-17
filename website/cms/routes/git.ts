import { Hono } from 'hono'
import { execFile } from 'child_process'
import { promisify } from 'util'

const exec = promisify(execFile)

async function git(...args: string[]) {
  const { stdout } = await exec('git', args, {
    cwd: process.cwd(),
    maxBuffer: 10 * 1024 * 1024, // 10MB
  })
  return stdout.trim()
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
  const body = await c.req.json<{ message: string; push?: boolean }>()
  if (!body.message) {
    return c.json({ error: 'Missing commit message' }, 400)
  }

  try {
    await git('add', '-A')
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
    await git('checkout', '--', body.path)
    return c.json({ ok: true, path: body.path })
  } catch (err) {
    return c.json({ error: String(err) }, 500)
  }
})
