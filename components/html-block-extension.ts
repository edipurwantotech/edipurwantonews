// components/extensions/HTMLBlock.ts
import { Node } from '@tiptap/core'

export const HTMLBlock = Node.create({
  name: 'htmlBlock',

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      html: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'html-block',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'html-block',
      HTMLAttributes,
    ]
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = node.attrs.html
      return {
        dom: wrapper,
      }
    }
  },
})
