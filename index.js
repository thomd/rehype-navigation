import { h } from 'hastscript'
import { selectAll } from 'hast-util-select'

const rehypeNavigation = (opts) => {
   const defaultOptions = {
      extract: false,
      wrapperTag: null,
   }
   const options = { ...defaultOptions, ...opts }
   return (tree) => {
      const headings = selectAll('h1, h2, h3, h4, h5, h6', tree)
      const navItems = []
      const stack = []

      headings.forEach((heading) => {
         const id = heading.properties.id
         const text = heading.children[0].value
         const level = parseInt(heading.tagName.substring(1), 10)
         const item = { id, text, level, children: [] }
         while (stack.length && stack[stack.length - 1].level >= level) {
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
