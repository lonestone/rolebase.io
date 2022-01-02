import {
  chakra,
  forwardRef,
  ModalContentProps,
  SystemStyleObject,
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

    const dialogStyles: SystemStyleObject = {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      outline: 0,
      ...styles.dialog,

      // Default modal style overides
      my: 0,
      overflowY: 'auto',
      w: '450px',
      maxH: 'calc(100vh - 71px)',
    }

    const dialogContainerStyles: SystemStyleObject = {
      display: 'flex',
      position: 'fixed',
      left: 0,
      top: 71, // padding (15px) + header height (56px) = 71px
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
