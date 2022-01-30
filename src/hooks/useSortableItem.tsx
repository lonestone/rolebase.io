import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function useSortableItem(id: string) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  return {
    attributes: {
      ref: setNodeRef,
      style: {
        transform: CSS.Transform.toString(transform),
        // There is an annoying bug with this transition and the end of drag
        // So we set to undefined when transition is 0ms
        transition:
          transition === 'transform 0ms linear' ? undefined : transition,
      },
      ...attributes,
      zIndex: 1,
    },
    listeners,
  }
}
