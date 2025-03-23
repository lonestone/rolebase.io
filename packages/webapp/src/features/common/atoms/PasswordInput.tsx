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
  (props, ref) => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false)

    return (
      <InputGroup size={props.size}>
        <Input ref={ref} type={show ? 'text' : 'password'} {...props} />

        <Tooltip hasArrow label={t(show ? 'common.hide' : 'common.show')}>
          <InputRightElement>
            <IconButton
              aria-label={t(show ? 'common.hide' : 'common.show')}
              icon={show ? <HideIcon size={18} /> : <ShowIcon size={18} />}
              size="sm"
              onClick={() => setShow((s) => !s)}
            />
          </InputRightElement>
        </Tooltip>
      </InputGroup>
    )
  }
)

export default PasswordInput
