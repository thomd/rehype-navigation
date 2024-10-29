# rehype-navigation

![Build][build-badge]

`rehype-navigation` is a [rehype][rehype] plugin to create a navigation with anchor links reflecting the headline hierarchy.

The plugin works best with headings having `id` attributes. You may use for example [rehype-slug][rehype-slug] to add them. If `id` attributes are missing, then the navigation is generated without anchor links.

## Demo

Generate the HTML for a demo page like this:

```
cd demo
node demo.js > index.html
npx http-server
open http://localhost:8080
```

or open this [demo page](https://thomd.github.io/rehype-navigation/).

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
   .use(rehypeNavigation, { wrapperTag: 'nav', maxDepth: 3 })
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

The following options are available:

-  `extract` (`Boolean`, optional) — Generate only the navigation and remove everything else. Default is `false`.

-  `maxDepth` (`Integer`, optional) — Maximum depth of the headings hierarchy which should be taken into account for the navigation. Default is `6`.

-  `wrapperTag` (`String`, optional) — Tag to wrap the navigation. Default is no wrapper tag.

-  `fullMonty` (`Boolean`, optional) — Generate navigation even if there is only **one** headline. Default is `true`.

[rehype]: https://github.com/rehypejs/rehype
[rehype-slug]: https://github.com/rehypejs/rehype-slug
[build-badge]: https://github.com/thomd/rehype-navigation/workflows/plugin-test/badge.svg
