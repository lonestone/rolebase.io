import * as express from 'express'

export const migration: express.RequestHandler = async (req, res) => {
  res.send('ok')
}
