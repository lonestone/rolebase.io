export default function getTextFromJSONEditor(data: any): string {
  if (!data) return ''
  return internal(JSON.parse(data).root)
}

function internal(data: any): string {
  if (data.text) {
    return data.text
  }
  if (data.children) {
    return data.children.map((child: any) => internal(child)).join('\n')
  }
  return ''
}
