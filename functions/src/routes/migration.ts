import * as express from 'express'

// Migration script
// http://localhost:5001/roles-app-37879/us-central1/api/migration

export const migration: express.RequestHandler = async (req, res) => {
  res.send('ok')
}