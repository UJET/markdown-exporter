'use babel'

import { escapeRegExp } from 'lodash'
import { body, header, footer } from '../lib/api/convert/template'
import { PACKAGE_NAME, CHARSET } from '../lib/config'
import { getFileDirectory } from '../lib/api/filesystem'
import { getBodyCss, getHeaderFooterCss } from '../lib/style'
import {
  getMarkdown,
  getHtml,
  getProjectRootPath,
  getCurrentMdFilePath
} from './_preset'

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.
//
// Tests are written with https://jasmine.github.io/1.3/introduction.html

describe('Template', () => {
  it('creates html body from content', () => {
    let html = ''
    runs(async () => {
      try {
        const md = await getMarkdown('simple.md')
        const content = await getHtml(md, {})
        const css = await getBodyCss(getProjectRootPath(), 'html')
        html = await body(content, CHARSET, css, getFileDirectory(getCurrentMdFilePath()))
      } catch (e) {
        throw e
      }
    })
    waitsFor(() => {
      return html
    }, 'Should get body')
    runs(() => {
      expect(html).toMatch(escapeRegExp('<!DOCTYPE html>\n<html>'))
      expect(html).toMatch(escapeRegExp(`<meta charset="${CHARSET}">`))
      expect(html).toMatch(escapeRegExp('<title>Heading 1</title>'))
      expect(html).toMatch(escapeRegExp('html, body'))
      expect(html).not.toMatch(escapeRegExp('.page-break'))
      expect(html).not.toMatch(escapeRegExp('a[href^=http]:after'))
      expect(html).toMatch(escapeRegExp(`Your ${PACKAGE_NAME} custom styles`))
      expect(html).toMatch(escapeRegExp('.hljs'))
      expect(html).toMatch(escapeRegExp('id="pageContent"'))
    })
  })

  it('manipulates img src with data uri (base64) in body, header and footer', () => {
    let bodyHtml = ''
    let headerHtml = ''
    let footerHtml = ''
    let fin = false
    runs(async () => {
      try {
        const md = await getMarkdown('image.md')
        const content = await getHtml(md, {})
        const basePath = getFileDirectory(getCurrentMdFilePath())
        bodyHtml = await body(content, CHARSET, await getBodyCss(getProjectRootPath(), 'html'), basePath)
        headerHtml = await header(content, await getHeaderFooterCss(), {}, basePath)
        footerHtml = await footer(content, await getHeaderFooterCss(), {}, basePath)
        fin = true
      } catch (e) {
        throw e
      }
    })
    waitsFor(() => {
      return fin
    }, 'Should get document')
    runs(() => {
      expect(bodyHtml).toMatch(escapeRegExp('id="pageContent"'))
      expect(headerHtml).toMatch(escapeRegExp('id="pageHeader"'))
      expect(footerHtml).toMatch(escapeRegExp('id="pageFooter"'))
      const test = [
        // local md image
        'AAAABJRU5ErkJggg==" alt="example"',
        // local html image
        'AAAABJRU5ErkJggg==" alt="html image"',
        // external md image
        'AAAAASUVORK5CYII=" alt="external image"',
        // external html image
        'AAAAASUVORK5CYII=" alt="external html image"'
      ]
      test.forEach((t) => {
        expect(bodyHtml).toMatch(escapeRegExp(t))
        expect(headerHtml).toMatch(escapeRegExp(t))
        expect(footerHtml).toMatch(escapeRegExp(t))
      })
    })
  })
})
