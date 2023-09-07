const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { createElement } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const iconsax = require('iconsax-react')

const outputFolder = 'public/emails/icons'

// Icons to convert to PNG and include in build
const icons = {
  ThreadIcon: iconsax.MessageText1,
  MeetingIcon: iconsax.Calendar2,
}

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder)
}

for (const iconName in icons) {
  const Icon = icons[iconName]
  const outputFilePath = path.join(outputFolder, `${iconName}.png`)

  // Render icon to SVG string
  const iconHTML = renderToStaticMarkup(
    createElement(Icon, {
      variant: 'Linear',
      size: 64,
    })
  )

  // Convert SVG string to PNG
  sharp(Buffer.from(iconHTML))
    .png()
    .toFile(outputFilePath, (error) => {
      if (error) {
        console.error(`Error converting ${iconName} to PNG:`, error)
      } else {
        console.log(`Converted ${iconName} to PNG`)
      }
    })
}
