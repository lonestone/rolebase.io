export const isMac = /Mac/i.test(navigator.platform)
export const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.platform)
export const isApple = isMac || isIOS
export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
)

export const cmdOrCtrlKey = isMac ? '⌘' : 'Ctrl'
