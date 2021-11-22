import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

const BasicStyle = styled(Box)`
  ul,
  ol {
    padding-left: 1.5em;
    margin-bottom: 0.5em;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1em 0 0.5em 0;
    font-weight: bold;
  }
  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.35em;
  }
  h3 {
    font-size: 1.25em;
  }
  h4 {
    font-size: 1.2em;
  }
  h5 {
    font-size: 1.1em;
  }
  a {
    text-decoration: underline;
  }
  blockquote {
    border-left: 0.25em solid #ccc;
    padding-left: 0.5em;
    margin-bottom: 1em;
  }
  code {
    padding: 0.2em 0.4em;
    background-color: #f8f8f8;
  }
  pre {
    margin: 0.5em 0;
    code {
      display: block;
    }
  }
`

export default BasicStyle
