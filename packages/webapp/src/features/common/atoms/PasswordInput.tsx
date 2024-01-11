import {
  forwardRef,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HideIcon, ShowIcon } from 'src/icons'

const PasswordInput = forwardRef<Omit<InputProps, 'type'>, 'input'>(
  ({ onChange, ...props }, ref) => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false)
    const [showButton, setShowButton] = useState(false)

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      setShowButton(() => event.target.value.length > 0)
      onChange?.(event)
    }

    return (
      <InputGroup size={props.size}>
        <Input
          ref={ref}
          type={show ? 'text' : 'password'}
          onChange={handleChange}
          {...props}
        />

        {showButton && (
          <Tooltip
            hasArrow
            openDelay={400}
            label={t(show ? 'common.hide' : 'common.show')}
          >
            <InputRightElement>
              <IconButton
                aria-label={t(show ? 'common.hide' : 'common.show')}
                icon={show ? <HideIcon size={18} /> : <ShowIcon size={18} />}
                size="sm"
                onClick={() => setShow((s) => !s)}
              />
            </InputRightElement>
          </Tooltip>
        )}
      </InputGroup>
    )
  }
)

export default PasswordInput
