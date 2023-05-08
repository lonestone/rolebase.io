import { FunctionContext } from '@utils/getContext'
import { Holaspirit } from './holaspirit'

export enum ImportProviders {
  Holaspirit = 'Holaspirit',
}

export type Importer = (
  context: FunctionContext,
  fileData: Buffer
) => Promise<void>

export const importers: Record<ImportProviders, Importer> = {
  Holaspirit,
}
