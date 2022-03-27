import styled from '@emotion/styled'
import { ColorModeProps, mode } from 'src/utils'

// Custom styles
const EditorContainer = styled.div<ColorModeProps>`
  // Borders and background
  .ProseMirror {
    padding: var(--chakra-space-2) var(--chakra-space-4);
    border-width: 1px;
    border-radius: 6px;

    //overflow: hidden;
    // Force to contain floating elements
    // https://www.cssmojo.com/latest-new-clearfix-so-far/#why-is-that
    &:after {
      content: '';
      display: table;
      clear: both;
    }

    &.ProseMirror-focused {
      border-color: ${mode('#3182ce', '#63b3ed')};
      box-shadow: 0 0 0 1px ${mode('#3182ce', '#63b3ed')};
    }
  }
  &[aria-invalid='true'] .ProseMirror {
    border-color: ${mode('#e53e3e', '#FC8181')};
    box-shadow: 0 0 0 1px ${mode('#e53e3e', '#FC8181')};
  }
  [readonly] .ProseMirror {
    padding: 0;
    border-width: 0;
    border-radius: 0;
  }

  .ProseMirror {
    .heading-actions {
      left: -20px;
      .heading-anchor {
        visibility: hidden;
      }
    }

    // "+" button
    .block-menu-trigger {
      color: ${mode('#4E5C6E', '#CBD5E0')};
      margin-left: -42px;
    }

    // Placeholder text
    .placeholder:before {
      color: ${mode('#a0aebf', '#4c4b4e')};
    }

    // Headings annotations
    h1:not(.placeholder):before,
    h2:not(.placeholder):before,
    h3:not(.placeholder):before,
    h4:not(.placeholder):before,
    h5:not(.placeholder):before,
    h6:not(.placeholder):before {
      visibility: hidden;
    }

    // List items handles
    ul li::before,
    ol li::before {
      left: -36px;
    }
    ul.checkbox_list li::before {
      left: 4px;
    }

    // Overlays zIndex
    .emoji-menu-container {
      z-index: 2000;
    }

    // Fix double bloquotes border
    blockquote:before {
      display: none;
    }

    /* This gives the remote user caret. The colors are automatically overwritten*/
    .ProseMirror-yjs-cursor {
      position: relative;
      margin-left: -1px;
      margin-right: -1px;
      border-left: 1px solid black;
      border-right: 1px solid black;
      // border-color: rgba(200, 200, 200, 0.5) !important;
      word-break: normal;
      pointer-events: none;
    }
    /* This renders the username above the caret */
    .ProseMirror-yjs-cursor > div {
      position: absolute;
      top: -1.05em;
      left: -1px;
      font-size: 13px;
      // background-color: rgba(200, 200, 200, 0.5) !important;
      color: #fff;
      font-style: normal;
      font-weight: normal;
      line-height: normal;
      user-select: none;
      padding-left: 2px;
      padding-right: 2px;
      white-space: nowrap;
    }
  }
`

export default EditorContainer
