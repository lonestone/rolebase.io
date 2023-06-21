export default function getTextFromJSONEditor(data: any) {
  if (data.text) {
    return data.text
  }
  if (data.children) {
    return data.children
      .map((child: any) => getTextFromJSONEditor(child))
      .join('\n')
  }
  return ''
}
