'use babel'

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.
//
// Tests are written with https://jasmine.github.io/1.3/introduction.html

describe('Grammar', () => {
  it('parses the grammar', () => {
    let grammar = null
    runs(async () => {
      try {
        await atom.packages.activatePackage('markdown-themeable-pdf')
        grammar = await atom.grammars.grammarForScopeName('source.gfm')
      } catch (e) {
        throw e
      }
    })
    waitsFor(() => {
      return grammar
    }, 'Should set grammar')
    runs(() => {
      expect(grammar).toBeTruthy()
      expect(grammar.scopeName).toBe('source.gfm')
    })
  })

  it('tokenizes YAML front matter', () => {
    let grammar = null
    runs(async () => {
      try {
        await atom.packages.activatePackage('markdown-themeable-pdf')
        grammar = await atom.grammars.grammarForScopeName('source.gfm')
      } catch (e) {
        throw e
      }
    })
    waitsFor(() => {
      return grammar
    }, 'Should set grammar')
    runs(() => {
      const content = '<!-- [markdown-themeable-pdf] options:\nfront: matter\n--- [markdown-themeable-pdf] options; -->'
      const [firstLineTokens, secondLineTokens, thirdLineTokens] = grammar.tokenizeLines(content)
      expect(firstLineTokens[0]).toEqual({
        value: '<!-- [markdown-themeable-pdf] options:',
        scopes: ['source.gfm', 'markdown-themeable-pdf.front-matter.yaml.gfm', 'comment.hr.gfm']
      })
      expect(secondLineTokens[0]).toEqual({
        value: 'front: matter',
        scopes: ['source.gfm', 'markdown-themeable-pdf.front-matter.yaml.gfm']
      })
      expect(thirdLineTokens[0]).toEqual({
        value: '--- [markdown-themeable-pdf] options; -->',
        scopes: ['source.gfm', 'markdown-themeable-pdf.front-matter.yaml.gfm', 'comment.hr.gfm']
      })
    })
  })

  it('checks extended source.gfm is equal standard source.gfm', () => {
    const grammar = {}
    let fin = false
    runs(async () => {
      try {
        await atom.packages.activatePackage('language-gfm')
        grammar.default = await atom.grammars.grammarForScopeName('source.gfm')
        await atom.packages.activatePackage('markdown-themeable-pdf')
        grammar.extended = await atom.grammars.grammarForScopeName('source.gfm')
        fin = true
      } catch (e) {
        throw e
      }
    })
    waitsFor(() => {
      return fin
    }, 'Should set grammar')
    runs(() => {
      const content = '# headline\n<!-- some -->\n`code`'
      const [
        firstLineTokensDefault,
        secondLineTokensDefault,
        thirdLineTokensDefault
      ] = grammar.default.tokenizeLines(content)
      const [
        firstLineTokensExtended,
        secondLineTokensExtended,
        thirdLineTokensExtended
      ] = grammar.extended.tokenizeLines(content)
      expect(firstLineTokensExtended[0]).toEqual(firstLineTokensDefault[0])
      expect(secondLineTokensExtended[0]).toEqual(secondLineTokensDefault[0])
      expect(thirdLineTokensExtended[0]).toEqual(thirdLineTokensDefault[0])
      // expect(firstLineTokensExtended[0]).toEqual({
      //   value: '#',
      //   scopes: ['source.gfm', 'markup.heading.heading-1.gfm', 'markup.heading.marker.gfm']
      // })
      // expect(secondLineTokensDefault[0]).toEqual({
      //   value: '<!--',
      //   scopes: ['source.gfm', 'comment.block.gfm', 'punctuation.definition.comment.gfm']
      // })
      // expect(thirdLineTokensDefault[0]).toEqual({
      //   value: '`',
      //   scopes: ['source.gfm', 'markup.raw.gfm']
      // })
    })
  })
})