'use babel'

import { getHighlightJsStyles } from './api/filesystem'
import { join } from 'path'

export default {
  imageExportFileType: {
    type: 'string',
    default: 'jpeg',
    enum: ['jpeg', 'png'],
    order: 10
  },
  format: {
    title: 'Papersize Format',
    type: 'string',
    default: 'A4',
    enum: ['A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'],
    description: 'Available only for export as pdf, jpg, png.',
    order: 20
  },
  width: {
    title: 'Papersize Width',
    type: 'string',
    default: '',
    description: 'E.g. 10.5in, overrides Papersize Format if set. Allowed units: mm, cm, in, px',
    order: 25
  },
  height: {
    title: 'Papersize Height',
    type: 'string',
    default: '',
    description: 'E.g. 8in, overrides Papersize Format if set. Allowed units: mm, cm, in, px',
    order: 26
  },
  pageBorder: {
    title: 'Page border size',
    type: 'string',
    default: '1cm',
    description: 'Allowed units: mm, cm, in, px. Available only for export as pdf, jpg, png.',
    order: 30
  },
  orientation: {
    title: 'Papersize Orientation',
    type: 'string',
    default: 'portrait',
    enum: ['portrait', 'landscape'],
    description: 'Available only for export as pdf, jpg, png.',
    order: 40
  },
  imageQuality: {
    title: 'Image quality',
    type: 'integer',
    default: 90,
    description: 'Available only for export as jpg, png.',
    order: 50
  },
  enableSmartArrows: {
    type: 'boolean',
    default: true,
    description: 'Beautification for arrows like <code>--></code> or <code>==></code>. Note that using this plugin will interfere with using HTML comments in your Markdown.',
    order: 60
  },
  enableCheckboxes: {
    title: 'Enable task lists',
    type: 'boolean',
    default: true,
    description: 'Replacement for <code>[ ]</code> and <code>[x]</code> in markdown source.',
    order: 70
  },
  enableFootnotes: {
    title: 'Footnotes support',
    type: 'boolean',
    default: true,
    description: 'Enables footnotes markup like <code>!&#91;^1&#93;</code> or <code>!&#91;^longnote&#93;</code>.',
    order: 71
  },
  enableImSizeMarkup: {
    title: 'Enable size-specified image markups',
    type: 'boolean',
    default: true,
    description: 'Enables markup like <code>!&#91;test&#93;&#40;image.png =100x200&#41;</code> and will fill the width and height fields automatically if the specified image path is valid.',
    order: 72
  },
  enableEmoji: {
    title: 'Emoji support',
    type: 'string',
    enum: ['Disabled', 'Full', 'Light'],
    default: 'Full',
    description: '<code>Full</code>, with <a href="https://www.webpagefx.com/tools/emoji-cheat-sheet/">all github supported</a> emojis. <code>Light</code>, with only <a href="https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/light.json">well-supported unicode</a> emojis.',
    order: 73
  },
  enableTocAndAnchor: {
    title: 'TOC (Table Of Content) & Heading Anchors',
    type: 'string',
    enum: ['Disabled', 'TOC enabled', 'Anchors enabled', 'TOC and Anchors enabled'],
    default: 'Disabled',
    description: 'Config to render TOC <code>@!&#91;toc&#93;</code> and anchor links in headings.',
    order: 74
  },
  tocFirstLevel: {
    title: 'TOC first heading level',
    type: 'integer',
    enum: [1, 2, 3, 4, 5, 6],
    default: 1,
    description: 'Allows you to skip some heading level. Example: use <code>2</code> if you want to skip <code>&lt;h1&gt;</code> from the TOC.',
    order: 76
  },
  tocLastLevel: {
    title: 'TOC last heading level',
    type: 'integer',
    enum: [1, 2, 3, 4, 5, 6],
    default: 6,
    description: 'Allows you to skip some heading level. Example: use <code>5</code> if you want to skip <code>&lt;h6&gt;</code> from the TOC.',
    order: 78
  },
  anchorLinkSymbol: {
    title: 'Heading anchor link symbol',
    type: 'string',
    default: '#',
    description: 'Allows you to customize the anchor link symbol.',
    order: 79
  },
  enableHtmlInMarkdown: {
    title: 'Enable HTML tags in markdown source',
    type: 'boolean',
    default: true,
    description: 'Required for <code>&lt;div class=&quot;page-break&quot;&gt;&lt;/div&gt;</code>!',
    order: 80
  },
  enableLinkify: {
    title: 'Autoconvert URL-like text to links',
    type: 'boolean',
    default: false,
    order: 90
  },
  enableTypographer: {
    title: 'Enable Typographer',
    type: 'boolean',
    default: true,
    description: 'Some language-neutral replacement + quotes beautification.',
    order: 100
  },
  smartQuotes: {
    title: 'Quotes beautification replacement',
    type: 'string',
    default: '""\'\'',
    description: 'Double + single quotes replacement pairs, when typographer enabled.',
    order: 110
  },
  enableXHTML: {
    title: 'Use \'/\' to close single tags',
    type: 'boolean',
    default: false,
    description: 'Eg. <code>&lt;br /&gt;</code> or <code>&lt;img /&gt;</code>.',
    order: 120
  },
  enableBreaks: {
    title: 'Convert new lines',
    type: 'boolean',
    default: false,
    description: 'Convert new lines (<code>\\n</code>) in paragraphs into <code>&lt;br&gt;</code>.',
    order: 130
  },
  preWrap: {
    title: 'Break long code lines',
    type: 'boolean',
    default: true,
    description: 'Text inside code blocks will wrap when necessary, and on line breaks.',
    order: 135
  },
  codeHighlightingTheme: {
    type: 'string',
    default: 'github-gist.css',
    enum: getHighlightJsStyles(),
    description: 'Theme preview: https://highlightjs.org/static/demo/',
    order: 140
  },
  enableCodeHighlighting: {
    title: 'Highlight code blocks with highlight.js',
    type: 'boolean',
    default: true,
    order: 142
  },
  codeHighlightingAuto: {
    title: 'Highlight code blocks automatically (detect language if not specified)',
    type: 'boolean',
    default: false,
    order: 145
  },
  customStylesPath: {
    type: 'string',
    default: join('markdown-themeable-pdf', 'styles.css'),
    description: 'You can use this stylesheet file to customize everything. The path is relative to Atom config directory <code>' + atom.config.configDirPath + '</code>. This relative path can also be used inside each project.',
    order: 150
  },
  enableCustomHeader: {
    type: 'boolean',
    default: true,
    order: 160
  },
  customHeaderPath: {
    type: 'string',
    default: join('markdown-themeable-pdf', 'header.js'),
    description: 'You can use this javascript file to customize the document header. The path is relative to Atom config directory <code>' + atom.config.configDirPath + '</code>. This relative path can also be used inside each project.',
    order: 170
  },
  enableCustomFooter: {
    type: 'boolean',
    default: true,
    order: 180
  },
  customFooterPath: {
    type: 'string',
    default: join('markdown-themeable-pdf', 'footer.js'),
    description: 'You can use this javascript file to customize the document footer. The path is relative to Atom config directory <code>' + atom.config.configDirPath + '</code>. This relative path can also be used inside each project.',
    order: 190
  },
  openPdfInAtomWorkspace: {
    type: 'boolean',
    default: true,
    description: 'Open PDF inside Atom with <a href="https://atom.io/packages/pdf-view">pdf-view</a> package.',
    order: 200
  }
}