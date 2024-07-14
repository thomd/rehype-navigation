import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeNavigation from '../index.js'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import rehypeWrap from 'rehype-wrap'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import { read } from 'to-vfile'

const file = await remark()
   .use(remarkRehype)
   .use(rehypeSlug)
   .use(rehypeWrap, { wrapper: 'main' })
   .use(rehypeNavigation, {
      wrapperTag: 'nav',
   })
   .use(rehypeDocument, {
      title: 'Demo',
      language: 'en',
      js: 'script.js',
      css: 'style.css',
   })
   .use(rehypeFormat, { indent: '\t' })
   .use(rehypeStringify)
   .process(await read('demo.md'))

console.log(file.value)
