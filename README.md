# rehype-navigation

![Build][build-badge]

`rehype-navigation` is a [rehype][rehype] plugin to create a navigation reflecting the headline hierarchy. THe plugin works best in combination with
`rehype-slug`.

## Usage

Say we have the following file `example.md`:

```markdown
# Level 1.1

## Level 2.1

text

## Level 2.2

text

# Level 1.2

text
```

and a module `example.js`:

```js
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeNavigation from 'rehype-navigation'
import rehypeStringify from 'rehype-stringify'
import { read } from 'to-vfile'

const file = await remark()
   .use(remarkRehype)
   .use(rehypeSlug)
   .use(rehypeNavigation, { wrapperTag: 'nav' })
   .use(rehypeStringify)
   .process(await read('example.md'))

console.log(file.value)
```

then running `node example.js` yields:

```html
<h1 id="level-11">Level 1.1</h1>
<h2 id="level-21">Level 2.1</h2>
<p>text</p>
<h2 id="level-22">Level 2.2</h2>
<p>text</p>
<h1 id="level-12">Level 1.2</h1>
<p>text</p>
<nav>
   <ul>
      <li>
         <a href="#level-11">Level 1.1</a>
         <ul>
            <li><a href="#level-21">Level 2.1</a></li>
            <li><a href="#level-22">Level 2.2</a></li>
         </ul>
      </li>
      <li><a href="#level-12">Level 1.2</a></li>
   </ul>
</nav>
```

## API

The default export is `rehypeNavigation`.

```js
unified().use(rehypeNavigation, options)
```

### Options

The follwoing options are available:

-  `extract` (`Boolean`, optional) — Whether to render navigation only and remove everything else. Deafult is `false`.

[rehype]: https://github.com/rehypejs/rehype
[build-badge]: https://github.com/thomd/rehype-navigation/workflows/plugin-test/badge.svg
