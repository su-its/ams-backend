import { Request, Response } from 'express'
import * as packageJson from '../../package.json'

function getVersion (_: Request, res: Response) {
  res.status(200).json({
    version: packageJson.version
  })
}

export { getVersion }
