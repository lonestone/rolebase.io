import {
  forwardRef,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const PasswordInput = forwardRef<Omit<InputProps, 'type'>, 'input'>(
  ({ onChange, ...props }, ref) => {
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
          <InputRightElement>
            <IconButton
              aria-label={show ? 'Cacher' : 'Afficher'}
              icon={show ? <FiEyeOff /> : <FiEye />}
              size="sm"
              onClick={() => setShow((s) => !s)}
            />
          </InputRightElement>
        )}
      </InputGroup>
    )
  }
)

export default PasswordInput
