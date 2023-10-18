export abstract class Importer {
  constructor(protected userId: string) {}
  abstract importFile(fileData: Buffer): Promise<string>
}
