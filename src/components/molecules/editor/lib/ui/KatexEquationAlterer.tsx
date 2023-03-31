/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import './KatexEquationAlterer.css'

import React, { useCallback, useState } from 'react'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Switch,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import KatexRenderer from './KatexRenderer'

type Props = {
  initialEquation?: string
  onConfirm: (equation: string, inline: boolean) => void
}

export default function KatexEquationAlterer({
  onConfirm,
  initialEquation = '',
}: Props) {
  const [equation, setEquation] = useState<string>(initialEquation)
  const [inline, setInline] = useState<boolean>(true)

  const onClick = useCallback(() => {
    onConfirm(equation, inline)
  }, [onConfirm, equation, inline])

  const onCheckboxChange = useCallback(() => {
    setInline(!inline)
  }, [setInline, inline])

  return (
    <>
      <ModalBody>
        <VStack spacing={5}>
          <FormControl>
            <Switch isChecked={inline} onChange={onCheckboxChange}>
              Inline
            </Switch>
          </FormControl>

          <FormControl>
            <FormLabel>Equation</FormLabel>
            {inline ? (
              <Input
                value={equation}
                autoFocus
                onChange={(event) => setEquation(event.target.value)}
              />
            ) : (
              <Textarea
                value={equation}
                autoFocus
                onChange={(event) => setEquation(event.target.value)}
              />
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Visualization</FormLabel>
            <KatexRenderer
              equation={equation}
              inline={false}
              onDoubleClick={() => null}
            />
          </FormControl>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClick}>Confirm</Button>
      </ModalFooter>
    </>
  )
}
