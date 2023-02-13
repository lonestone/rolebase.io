export function getFirstname(name: string) {
  return name.replace(/ .*$/, '')
}
