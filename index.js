import { selectAll } from 'hast-util-select'
import { h } from 'hastscript'

const rehypeNavigation = (opts) => {
   const defaultOptions = {
      extract: false,
      wrapperTag: null,
      maxDepth: 6,
   }
   const options = { ...defaultOptions, ...opts }
   return (tree) => {
      const hTags = Array.from({ length: options.maxDepth }, (_, i) => `h${1 + i}`).join(', ')
      const headings = selectAll(hTags, tree)
      const navItems = []
      const stack = []

      headings.forEach((heading) => {
         const id = heading.properties.id
         const text = heading.children[0].value
         const depth = heading.tagName[1]
         const item = { id, text, depth, children: [] }
         while (stack.length && stack[stack.length - 1].depth >= depth) {
            stack.pop()
         }
         if (stack.length) {
            stack[stack.length - 1].children.push(item)
         } else {
            navItems.push(item)
         }
         stack.push(item)
      })

      const navTree = buildNavTree(options.wrapperTag, navItems)
      if (options.extract) {
         tree.children = []
      }
      tree.children.push(navTree)
   }
}

function buildNavTree(tag, items) {
   const ul = h(
      'ul',
      items.map((item) => buildNavItem(item))
   )
   if (tag === '' || tag === null) {
      return ul
   } else {
      return h(tag, [ul])
   }
}

function buildNavItem(item) {
   return h('li', [
      h('a', { href: `#${item.id}` }, item.text),
      item.children.length > 0
         ? h(
              'ul',
              item.children.map((child) => buildNavItem(child))
           )
         : null,
   ])
}

export default rehypeNavigation
