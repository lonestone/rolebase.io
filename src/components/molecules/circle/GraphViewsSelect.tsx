import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'
import { GraphViews } from 'src/circles-viz/types'

interface Props {
  value: GraphViews
  onChange: (view: GraphViews) => void
}

export const viewsList = [
  GraphViews.AllCircles,
  GraphViews.SimpleCircles,
  GraphViews.FlatCircle,
  GraphViews.Members,
]

export default function GraphViewsSelect({ value, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FiChevronDown />}
        className="userflow-graph-views"
        variant="solid"
        boxShadow="md"
        bg="white"
        _dark={{
          bg: 'gray.700',
        }}
        _focus={{
          boxShadow: 'md !important',
        }}
      >
        {t(`GraphViewsSelect.${value}` as any)}
      </MenuButton>

      <MenuList zIndex={2000} shadow="md" maxW="300px">
        {viewsList.map((view) => (
          <MenuItem
            key={view}
            flexDirection="column"
            alignItems="left"
            onClick={() => onChange(view)}
          >
            <Text fontWeight="bold">
              {t(`GraphViewsSelect.${view}` as any)}
            </Text>
            <Text fontSize="sm">
              {t(`GraphViewsSelect.${view}_desc` as any)}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
