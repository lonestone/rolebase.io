import {
  chakra,
  forwardRef,
  ModalContentProps,
  SystemStyleObject,
  useColorMode,
  useModalContext,
  useStyles,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import React from 'react'

// Forked from ModalContent component
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/modal/src/modal.tsx

export const ModalPanel = forwardRef<ModalContentProps, 'section'>(
  (props: ModalContentProps, ref) => {
    const { className, children, containerProps: rootProps, ...rest } = props

    const { getDialogProps, getDialogContainerProps } = useModalContext()

    const dialogProps = getDialogProps(rest, ref) as any
    const containerProps = getDialogContainerProps(rootProps)

    const _className = cx('chakra-modal__content', className)

    const styles = useStyles()
    const { colorMode } = useColorMode()

    const dialogStyles: SystemStyleObject = {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      outline: 0,
      ...styles.dialog,

      // Default modal style overrides
      my: 0,
      overflowY: 'auto',
      w: '450px',
      h: '100%',
      flex: 1,
      maxW: '100vw',
      borderRadius: 0,
      borderLeftWidth: '1px',
      borderLeftColor: colorMode === 'light' ? 'gray.200' : 'gray.550',
      shadow: 'none',
    }

    const dialogContainerStyles: SystemStyleObject = {
      display: 'flex',
      position: 'absolute',
      right: 0,
      top: '48px',
      bottom: 0,
      ...styles.dialogContainer,

      // Default container style overrides
      zIndex: '0',
    }

    return (
      <chakra.div
        {...containerProps}
        className="chakra-modal__content-container"
        // tabindex="-1" means that the element is not reachable via sequential keyboard navigation, @see #4686
        tabIndex={-1}
        __css={dialogContainerStyles}
      >
        <chakra.div
          className={_className}
          {...dialogProps}
          __css={dialogStyles}
        >
          {children}
        </chakra.div>
      </chakra.div>
    )
  }
)
