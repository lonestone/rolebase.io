export function readFile(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => resolve(reader.result as string | null),
      false
    )
    reader.readAsDataURL(file)
  })
}
