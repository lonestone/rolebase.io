import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { MemberSkillLevelFragment } from '@gql'
import React from 'react'

interface Props {
  skills?: MemberSkillLevelFragment[]
}

const MemberSkillsTable = ({ skills }: Props) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name / categorie</Th>
            <Th>niveau</Th>
            <Th>description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {skills?.map((skill) => (
            <Tr key={skill.id}>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default MemberSkillsTable
