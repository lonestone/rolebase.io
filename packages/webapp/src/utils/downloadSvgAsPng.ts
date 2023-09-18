function applyInlineStyles(element: Element) {
  // Handle children first
  for (let i = 0; i < element.children.length; i++) {
    applyInlineStyles(element.children[i])
  }

  const computedStyle = window.getComputedStyle(element)

  // Apply inline styles with variables values
  let styleString = ''
  for (const key of computedStyle) {
    const value = computedStyle.getPropertyValue(key)
    styleString += `${key}:${replaceVariables(value, computedStyle)};`
  }
  element.setAttribute('style', styleString)

  // Apply variables to attributes
  for (const attribute of element.attributes) {
    const newValue = replaceVariables(attribute.value, computedStyle)
    if (newValue !== attribute.value) {
      element.setAttribute(attribute.name, newValue)
    }
  }
}

function replaceVariables(value: string, computedStyle: CSSStyleDeclaration) {
  if (!value.includes('var(')) return value

  // Extract variables names
  const matches = [...value.matchAll(/var\(([^),]*),? ?([^)]*)?\)/g)]
  for (const match of matches) {
    const variableName = match[1]
    const fallback = match[2]

    // Try to get the variable value from the computed styles of the current element,
    // then fallback in the value.
    const variableValue =
      computedStyle.getPropertyValue(variableName) || fallback
    value = value.replace(match[0], variableValue)
  }
  return value
}

async function extractFontFaces() {
  const styleSheets = Array.from(document.styleSheets)
  const styles = []

  for (const styleSheet of styleSheets) {
    try {
      const cssRules = Array.from(styleSheet.cssRules)
      for (const rule of cssRules) {
        if (rule.type !== CSSRule.FONT_FACE_RULE) continue
        let style = rule.cssText
        const matches = [...style.matchAll(/url\("([^"]+)"\)/g)]
        for (const match of matches) {
          const url = match[1]
          const dataUrl = await fetchAsDataUrl(
            url[0] === '/' ? window.location.origin + url : url
          )
          style = style.replace(url, dataUrl)
        }
        styles.push(style)
      }
    } catch (error) {
      // Ignore errors
    }
  }
  return styles.join('\n')
}

async function fetchAsDataUrl(fontUrl: string) {
  return new Promise<string>((resolve) =>
    fetch(fontUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
  )
}

async function convertImagesToDataUrls(svgElement: SVGElement) {
  const images = Array.from(svgElement.getElementsByTagName('image'))
  const dataUrls = new Map()

  await Promise.all(
    images.map(async (image) => {
      const href = image.getAttribute('href')
      if (!href) return

      if (!dataUrls.has(href)) {
        try {
          const dataUrl = await loadImageDataUrl(href)
          dataUrls.set(href, dataUrl)
        } catch (error) {
          return
        }
      }

      image.setAttribute('href', dataUrls.get(href))
    })
  )
}

async function loadImageDataUrl(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous' // This won't work if the server doesn't allow cross origin requests
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas context not found')
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL())
    }
    img.onerror = reject
    img.src = url
  })
}

export async function downloadSvgAsPng(svgElement: SVGElement) {
  const svg = svgElement.cloneNode(true) as SVGElement

  // Append to same parent to get the same computed styles
  svgElement.parentNode?.appendChild(svg)

  const width = parseInt(svg.getAttribute('width') || '100', 10)
  const height = parseInt(svg.getAttribute('height') || '100', 10)

  // Inline the styles
  applyInlineStyles(svg)

  // Convert images to data URLs
  await convertImagesToDataUrls(svg)

  // Add styles from external stylesheets
  const styleElement = document.createElement('style')
  styleElement.innerHTML = await extractFontFaces()
  svg.prepend(styleElement)

  // Create a new Canvas element
  const canvas = document.createElement('canvas')
  if (!canvas) throw new Error('Canvas not found')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context not found')

  // Create an SVG string from the SVG element
  const xml = new XMLSerializer().serializeToString(svg)

  // Clean up cloned SVG
  svgElement.parentNode?.removeChild(svg)

  // Create a new Image element
  const image = new Image()
  image.src =
    'data:image/svg+xml;base64,' +
    window.btoa(unescape(encodeURIComponent(xml)))

  // When the image has loaded, draw it to the Canvas
  image.onload = () => {
    ctx.drawImage(image, 0, 0, width, height)

    // Create a data URL from the Canvas
    const dataUrl = canvas.toDataURL('image/png')

    // Create a new Anchor element
    const link = document.createElement('a')
    link.href = dataUrl
    //link.href = image.src; // To export SVG instead of PNG

    // Set the download attribute of the Anchor element
    link.download = 'rolebase.png'

    // Trigger a click event on the Anchor element
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
  }
}
