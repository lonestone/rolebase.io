import { FunctionContext } from '@utils/getContext'
import { HolaspiritImporter } from './holaspirit/HolaspiritImporter'

export const importers = {
  Holaspirit: (context: FunctionContext) => new HolaspiritImporter(context),
}
