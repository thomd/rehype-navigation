import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeNavigation from '../index.js'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import { read } from 'to-vfile'

const file = await remark()
   .use(remarkRehype)
   .use(rehypeSlug)
   .use(rehypeNavigation)
   .use(rehypeDocument)
   .use(rehypeFormat, { indent: '\t' })
   .use(rehypeStringify)
   .process(await read('example.md'))

console.log(file.value)
