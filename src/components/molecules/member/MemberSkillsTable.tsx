import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react'
import { MemberSkillLevelFragment } from '@gql'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiTrash2 } from 'react-icons/fi'

interface Props {
  skills?: MemberSkillLevelFragment[]
}

const MemberSkillsTable = ({ skills }: Props) => {
  const { t } = useTranslation()

  if (!skills?.length)
    return <Text fontStyle="italic">{t('MemberSkillsTable.emptySkills')}</Text>

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('MemberSkillsTable.header.title')}</Th>
            <Th>{t('MemberSkillsTable.header.level')}</Th>
            <Th>{t('MemberSkillsTable.header.description')}</Th>
            <Th />
          </Tr>
        </Thead>
        {/* <Tbody>
          {skills?.map((skill) => (
            <Tr key={skill.skillLevels.id}>
              <Td>{skill.name}</Td>
              <Td>{skill.skillLevels.}</Td>
              <Td>{skill.skillLevels.description}</Td>
              <Td>
                <FiTrash2 />
              </Td>
            </Tr>
          ))}
        </Tbody> */}
      </Table>
    </TableContainer>
  )
}

export default MemberSkillsTable
