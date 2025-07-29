import { Node, mergeAttributes } from '@tiptap/core'

export const CodeBlockWrapper = Node.create({
  name: 'codeBlockWrapper',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      class: {
        default: 'code-block-wrapper',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div.code-block-wrapper',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0]
  },
})
