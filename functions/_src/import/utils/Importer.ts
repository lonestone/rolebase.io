import { FunctionContext } from '@utils/getContext'

export abstract class Importer {
  constructor(protected context: FunctionContext) {}
  abstract importFile(fileData: Buffer): Promise<string>
}
