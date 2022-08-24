import { Circle, CircleEntry } from '@shared/model/circle'
import { SearchTypes } from '@shared/model/search'
import { collections } from '../firebase'
import { getIndexEntities } from '../helpers/getIndexEntities'
import { getIndexEntity } from '../helpers/getIndexEntity'
import { getUpdateSearchHandler } from '../helpers/getUpdateSearchHandler'
import { getDocData } from '../utils'

const indexCircle = getIndexEntity<Circle>(SearchTypes.Circle, {
  async getTitle(circle) {
    const names = await getCircleNames(circle)
    return names.slice(names.length === 1 ? 0 : 1).join(' › ')
  },

  getBoost: () => 2,
})

export const indexCircles = getIndexEntities(collections.circles, indexCircle)

async function getCircleNames(circle: CircleEntry): Promise<string[]> {
  const { name } = getDocData(await collections.roles.doc(circle.roleId).get())
  if (circle.parentId) {
    const parentCircle = getDocData(
      await collections.circles.doc(circle.parentId).get()
    )
    if (parentCircle) {
      return [...(await getCircleNames(parentCircle)), name]
    }
  }
  return [name]
}

export const onCircleUpdateSearch = getUpdateSearchHandler(
  'circles/{id}',
  indexCircle
)
