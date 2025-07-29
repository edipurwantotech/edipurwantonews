"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "./file-upload"
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, ImageIcon, Link2, Code, Code2 } from "lucide-react"
import { useState } from "react"
import { Node } from "@tiptap/core";
import Heading from "@tiptap/extension-heading"
import { HTMLBlock } from "./html-block-extension"

const Div = Node.create({
  name: "div",
  group: "block",
  content: "block+", // Allow other blocks inside
  defining: true,

  addAttributes() {
    return {
      class: {
        default: "",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", HTMLAttributes, 0]; // [tagName, attrs, content]
  },

  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (node) => ({
          class: (node as HTMLElement).getAttribute("class"),
        }),
      },
    ];
  },
});

// Create a lowlight instance with common languages
const lowlight = createLowlight(common)

interface EnhancedRichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function EnhancedRichTextEditor({ content, onChange }: EnhancedRichTextEditorProps) {
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [codeDialogOpen, setCodeDialogOpen] = useState(false)
  const [showHtmlInput, setShowHtmlInput] = useState(false)
const [rawHtmlContent, setRawHtmlContent] = useState("")
const [htmlDialogOpen, setHtmlDialogOpen] = useState(false)
const [showRawHtml, setShowRawHtml] = useState(false);
  const [imageUrl, setImageUrl] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [codeContent, setCodeContent] = useState("")
  const [codeLanguage, setCodeLanguage] = useState("javascript")
  const [codeFilename, setCodeFilename] = useState("")

  const editor = useEditor({
    extensions: [
      StarterKit,
      HTMLBlock,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: "heading",
        },
      }),
      Div,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "code-block-highlighted",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl("")
      setImageDialogOpen(false)
    }
  }

  const addLink = () => {
    if (linkUrl) {
      if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run()
      }
      setLinkUrl("")
      setLinkText("")
      setLinkDialogOpen(false)
    }
  }

  const addCodeBlock = () => {
    if (codeContent) {
      // If we have a filename, add it as a separate paragraph first
      if (codeFilename) {
        editor
          .chain()
          .focus()
          .insertContent({
            type: "div",  // Using your custom Div node
            attrs: { class: "code-filename-header" },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: codeFilename }]
              }
            ]
          })
          .run();
      }

      // Insert the code block using TipTap's built-in method
      editor
        .chain()
        .focus()
        .insertContent({
          type: "codeBlock",
          attrs: { language: codeLanguage },
          content: [{ type: "text", text: codeContent }],
        })
        .run()

      setCodeContent("")
      setCodeLanguage("javascript")
      setCodeFilename("")
      setCodeDialogOpen(false)
    }
  }

   const handleRawHtmlChange = (html: string) => {
    try {
      // Try to parse the HTML to catch any potential errors
      const doc = new DOMParser().parseFromString(html, 'text/html');
      editor?.commands.setContent(html);
      onChange(html);
    } catch (error) {
      console.error('Error parsing HTML:', error);
    }
  };

  const handleFileUploaded = (url: string, type: "image" | "file") => {
    if (type === "image") {
      editor.chain().focus().setImage({ src: url }).run()
    } else {
      // For files, insert as a link
      const fileName = url.split("/").pop() || "Download File"
      editor
        .chain()
        .focus()
        .insertContent(
          `<a href="${url}" target="_blank" class="inline-flex items-center text-blue-600 hover:text-blue-800 underline"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg>${fileName}</a>`,
        )
        .run()
    }
    setImageDialogOpen(false)
  }

  const languages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "cpp",
    "csharp",
    "php",
    "ruby",
    "go",
    "rust",
    "html",
    "css",
    "sql",
    "json",
    "xml",
    "yaml",
    "bash",
    "powershell",
  ]

  return (
    <div className="border rounded-md flex flex-col max-h-[600px]">
      {/* Fixed Toolbar */}
      <div className="border-b rounded-t-md p-2 flex gap-2 flex-wrap flex-shrink-0 bg-white sticky top-0 z-10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
          title="Heading 2"
        >
          H2
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
          title="Heading 3"
        >
          H3
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive("heading", { level: 4 }) ? "bg-muted" : ""}
          title="Heading 4"
        >
          H4
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive("heading", { level: 5 }) ? "bg-muted" : ""}
          title="Heading 5"
        >
          H5
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive("heading", { level: 6 }) ? "bg-muted" : ""}
          title="Heading 6"
        >
          H6
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-muted" : ""}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-muted" : ""}
        >
          <Quote className="h-4 w-4" />
        </Button>
       <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowRawHtml(!showRawHtml)}
          className={showRawHtml ? "bg-muted" : ""}
        >
          {showRawHtml ? (
            <>
              Rich Text
            </>
          ) : (
            <>
              HTML
            </>
          )}
        </Button>
        {/* Code Block Dialog */}
        <Dialog open={codeDialogOpen} onOpenChange={setCodeDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={editor.isActive("codeBlock") ? "bg-muted" : ""}
              title="Code Block"
            >
              <Code2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>Add Code Block</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code-filename">Filename (optional)</Label>
                <div className="mb-2"></div>
                <Input
                  id="code-filename"
                  value={codeFilename}
                  onChange={(e) => setCodeFilename(e.target.value)}
                  placeholder="e.g., contentlayer.config.ts"
                />
              </div>
              <div>
                <Label htmlFor="code-language">Language</Label>
                <div className="mb-2"></div>
                <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="code-content">Code</Label>
                <div className="mb-2"></div>
                <Textarea
                  id="code-content"
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  placeholder="Enter your code here..."
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
              <Button onClick={addCodeBlock} disabled={!codeContent} className="w-full">
                Add Code Block
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Upload Dialog */}
        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="sm">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Add Image or File</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-url">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button onClick={addImage} disabled={!imageUrl}>
                    Add
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">or</div>
              <FileUpload onFileUploaded={handleFileUploaded} />
            </div>
          </DialogContent>
        </Dialog>

        {/* Link Dialog */}
        <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="ghost" size="sm">
              <Link2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="link-text">Link Text (optional)</Label>
                <Input
                  id="link-text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Click here"
                />
              </div>
              <Button onClick={addLink} disabled={!linkUrl} className="w-full">
                Add Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-auto">
        {showRawHtml ? (
          <div className="p-4 h-full">
            <div className="flex justify-between items-center mb-2">
              <Label>Raw HTML</Label>
              <div className="text-sm text-muted-foreground">
                Switch back to rich text to edit formatting
              </div>
            </div>
            <Textarea
              value={editor?.getHTML() || ""}
              onChange={(e) => handleRawHtmlChange(e.target.value)}
              className="h-full min-h-[400px] font-mono text-sm w-full whitespace-pre-wrap resize-none"
            />
            <div className="mt-2 text-sm text-muted-foreground">
              Note: Complex HTML may not render perfectly when switching back to rich text.
            </div>
          </div>
        ) : (
          <EditorContent 
            editor={editor} 
            className="prose max-w-none p-4 h-full min-h-[400px] focus:outline-none focus:ring-4 focus:ring-black focus:border-black overflow-auto [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus:ring-1 [&_.ProseMirror]:focus:ring-black" 
          />
        )}
      </div>
    </div>
  )
}