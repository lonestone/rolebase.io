import { SearchDoc } from '@rolebase/shared/model/search'
import { RestError } from '../../../rest/route'
import { HasuraEvent } from '../../../utils/nhost'
import getAlgoliaIndex from '../../search/utils/getAlgoliaClient'

export abstract class IndexEntity<
  Entity extends { id: string; archived?: boolean },
> {
  protected index = getAlgoliaIndex()

  public async applyEvent(event: HasuraEvent<Entity>) {
    const { data, op } = event.event
    const id = data.new?.id ?? data.old?.id
    const archived = data.new?.archived

    if (!id) throw new RestError(400, 'No id found in event')

    if ((op === 'INSERT' || op === 'UPDATE') && !archived) {
      const searchDoc = await this.getById(id)
      if (searchDoc) {
        // Insert or update object
        await this.index.saveObject(searchDoc).catch(console.error)
        return
      }
    }

    // Delete object
    await this.index.deleteObject(id).catch(console.error)
  }

  public async getById(id: string): Promise<SearchDoc | undefined> {
    id
    return undefined
  }

  public async getAll(): Promise<SearchDoc[]> {
    return []
  }
}
