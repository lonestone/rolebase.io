import { HolaspiritImporter } from './holaspirit/HolaspiritImporter'

export const importers = {
  Holaspirit: (userId: string) => new HolaspiritImporter(userId),
}
