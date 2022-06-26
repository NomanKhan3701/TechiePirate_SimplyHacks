
import { FaTree } from 'react-icons/fa'
import { TbBeach, TbHeartHandshake } from 'react-icons/tb'

export const eventTypes = {
  'tree_planting': {
    title: 'Tree Planting',
    icon: FaTree,
    color: 'var(--color-green)'
  },
  'water': {
    title: 'Save the Ocean',
    icon: TbBeach,
    color: 'var(--color-blue)'
  },
  'misc': {
    title: 'Miscellaneous',
    icon: TbHeartHandshake,
    color: 'var(--color-yellow)'
  },
}

export const testMarkdown = 
`
This post is written in markdown. You can make things **bold**, *italics* and do all sorts of cool stuff.
Including:
## Headings
`