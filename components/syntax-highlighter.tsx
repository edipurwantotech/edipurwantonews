"use client"

import { useEffect } from "react"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import python from "highlight.js/lib/languages/python"
import java from "highlight.js/lib/languages/java"
import cpp from "highlight.js/lib/languages/cpp"
import csharp from "highlight.js/lib/languages/csharp"
import php from "highlight.js/lib/languages/php"
import ruby from "highlight.js/lib/languages/ruby"
import go from "highlight.js/lib/languages/go"
import rust from "highlight.js/lib/languages/rust"
import xml from "highlight.js/lib/languages/xml"
import css from "highlight.js/lib/languages/css"
import sql from "highlight.js/lib/languages/sql"
import json from "highlight.js/lib/languages/json"
import yaml from "highlight.js/lib/languages/yaml"
import bash from "highlight.js/lib/languages/bash"
import powershell from "highlight.js/lib/languages/powershell"

// Register languages
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("java", java)
hljs.registerLanguage("cpp", cpp)
hljs.registerLanguage("csharp", csharp)
hljs.registerLanguage("php", php)
hljs.registerLanguage("ruby", ruby)
hljs.registerLanguage("go", go)
hljs.registerLanguage("rust", rust)
hljs.registerLanguage("html", xml)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("css", css)
hljs.registerLanguage("sql", sql)
hljs.registerLanguage("json", json)
hljs.registerLanguage("yaml", yaml)
hljs.registerLanguage("bash", bash)
hljs.registerLanguage("powershell", powershell)

export function SyntaxHighlighter() {
  useEffect(() => {
    // Highlight all code blocks on page load and updates
    const highlightCodeBlocks = () => {
      // Highlight standard pre code blocks
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })

      // Highlight custom code blocks
      document.querySelectorAll(".custom-code-block .code-content code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })
    }

    highlightCodeBlocks()

    // Set up observer for dynamic content
    const observer = new MutationObserver(() => {
      highlightCodeBlocks()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}
