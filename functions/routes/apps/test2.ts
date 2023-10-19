import { Request, Response } from 'express'

export default async (req: Request, res: Response) => {
  console.log('test2')
  res.status(200).send('42')
}
