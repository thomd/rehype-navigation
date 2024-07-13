import { visit } from 'unist-util-visit'

const rehypeNavigation = (opts) => {
   const defaultOptions = {
      extract: false,
   }
   const options = { ...defaultOptions, ...opts }
   return (tree) => {
      visit(
         tree,
         (node) => node.tagName === 'h',
         (node, index, parent) => {
         }
      )
   }
}
export default rehypeNavigation
