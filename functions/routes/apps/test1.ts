import { route } from '@utils/route'

export default route(async (context) => {
  console.log('test1')
  return '42'
})
