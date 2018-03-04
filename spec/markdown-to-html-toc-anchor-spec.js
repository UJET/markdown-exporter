'use babel'

import { get, escapeRegExp } from 'lodash'

import {
  markdownItOptions,
  getMarkdown,
  getHtml
} from './_preset'

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.
//
// Tests are written with https://jasmine.github.io/1.3/introduction.html

describe('TOC and Anchor', () => {

  it('checks that TOC and Anchor links are disabled by default', () =>{
    const opt = markdownItOptions()
    expect(get(opt, 'enableTOC')).toBe(false)
    expect(get(opt, 'enableAnchor')).toBe(false)
  })

  it('checks disabled TOC and disabled Anchor generation', () => {
    let html = ''
    runs(async () => {
      const md = await getMarkdown('tocAndAnchor.md')
      html = await getHtml(md, { enableTOC: false, enableAnchor: false })
    })
    waitsFor(() => {
      return html
    }, 'Should get html')
    runs(() => {
      expect(html).toMatch(escapeRegExp('<p>@[toc]</p>'))
      expect(html).toMatch(escapeRegExp('<h2>h2 headline</h2>'))
    })
  })

  it('checks disabled TOC and enabled Anchor generation', () => {
    let html = ''
    runs(async () => {
      const md = await getMarkdown('tocAndAnchor.md')
      html = await getHtml(md, { enableTOC: false, enableAnchor: true })
    })
    waitsFor(() => {
      return html
    }, 'Should get html')
    runs(() => {
      expect(html).toMatch(escapeRegExp('<p><strong>TOC</strong></p>\n<p></p>'))
      expect(html).toMatch(escapeRegExp('<h2 id="h2-headline"><a class="markdown-themeable-pdf-anchor" href="#h2-headline">'))
    })
  })

  it('checks enabled TOC and disabled Anchor generation', () => {
    let html = ''
    runs(async () => {
      const md = await getMarkdown('tocAndAnchor.md')
      html = await getHtml(md, { enableTOC: true, enableAnchor: false })
    })
    waitsFor(() => {
      return html
    }, 'Should get html')
    runs(() => {
      expect(html).toMatch(escapeRegExp('<ul class="markdown-themeable-pdf-toc">\n<li><a href="#'))
      expect(html).toMatch(escapeRegExp('<h2 id="h2-headline">h2 headline</h2>'))
    })
  })

  it('checks enabled TOC and enabled Anchor generation', () => {
    let html = ''
    runs(async () => {
      const md = await getMarkdown('tocAndAnchor.md')
      html = await getHtml(md, { enableTOC: true, enableAnchor: true })
    })
    waitsFor(() => {
      return html
    }, 'Should get html')
    runs(() => {
      expect(html).toMatch(escapeRegExp('<ul class="markdown-themeable-pdf-toc">\n<li><a href="#'))
      expect(html).toMatch(escapeRegExp('<h2 id="h2-headline"><a class="markdown-themeable-pdf-anchor" href="#h2-headline">'))
    })
  })

  it('checks TOC with heading range 2 - 4', () => {
    let html = ''
    runs(async () => {
      const md = await getMarkdown('tocAndAnchor.md')
      html = await getHtml(md, { enableTOC: true, tocFirstLevel: 2, tocLastLevel: 4 })
    })
    waitsFor(() => {
      return html
    }, 'Should get html')
    runs(() => {
      expect(html).toMatch(escapeRegExp('<ul class="markdown-themeable-pdf-toc">\n<li><a href="#h2-headline">h2 headline</a>'))
      expect(html).toMatch(escapeRegExp('<li><a href="#h4-headline">h4 headline</a></li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>'))
    })
  })

  it('checks anchor link symbol', () => {
    let html = ''
    runs(async () => {
      const md = await getMarkdown('tocAndAnchor.md')
      html = await getHtml(md, { enableAnchor: true, anchorLinkSymbol: '$' })
    })
    waitsFor(() => {
      return html
    }, 'Should get html')
    runs(() => {
      expect(html).toMatch(escapeRegExp('<span class="markdown-themeable-pdf-anchor-symbol">$</span>'))
    })
  })

})