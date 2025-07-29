"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { List, ChevronRight } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: number
  numberedText: string
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h1.heading, h2.heading, h3.heading, h4.heading, h5.heading, h6.heading");

    const items: TocItem[] = [];
    const counters: number[] = [0, 0, 0, 0, 0, 0]; // For levels 1-6
    const hasHeadingAtLevel: boolean[] = [false, false, false, false, false, false]; // Track which levels exist
    let lastLevel = 1;

    // First pass: determine which heading levels exist
    headings.forEach((heading) => {
      const level = Number.parseInt(heading.tagName.charAt(1));
      hasHeadingAtLevel[level - 1] = true;
    });

    headings.forEach((heading, index) => {
      const level = Number.parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || "";
      const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

      // Reset lower level counters when we go up in hierarchy
      if (level < lastLevel) {
        for (let i = level; i < counters.length; i++) {
          counters[i] = 0;
        }
      }

      // Increment counter for current level
      counters[level - 1]++;

      // Build the numbered text - only include levels that actually exist
      let numberedParts: string[] = [];
      
      for (let i = 0; i < level; i++) {
        if (hasHeadingAtLevel[i]) {
          numberedParts.push(counters[i].toString());
        }
      }
      
      const numberedText = `${numberedParts.join('.')} ${text}`;

      items.push({ id, text, level, numberedText });
      lastLevel = level;
    });

    setTocItems(items);

    // Add IDs to headings in the DOM
    const domHeadings = document.querySelectorAll("h1.heading, h2.heading, h3.heading, h4.heading, h5.heading, h6.heading");
    domHeadings.forEach((heading, index) => {
      if (!heading.id) {
        const text = heading.textContent || "";
        const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
        heading.id = id;
      }
    });

    // Set up Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%", threshold: 0 }
    );

    domHeadings.forEach((heading) => {
      if (heading.id) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsOpen(false)
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <>
      {/* Mobile TOC Toggle */}
      <div className="lg:hidden mb-6">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between">
          <span className="flex items-center">
            <List className="h-4 w-4 mr-2" />
            Table of Contents
          </span>
          <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </Button>

        {isOpen && (
          <Card className="mt-2">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`block w-full text-left text-sm hover:text-pink-600 transition-colors ${
                      activeId === item.id ? "text-pink-600 font-medium" : "text-gray-600"
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                  >
                    {item.numberedText}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop TOC - Sticky */}
      <div className="hidden lg:block">
        <Card className="sticky top-8 rounded-[0px] bg-gray-100 border-gray-400">
          <CardHeader className="pb-3 rounded">
            <CardTitle className="text-sm font-semibold text-gray-900 flex items-center">
              <List className="h-4 w-4 mr-2" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <nav className="space-y-2">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left text-sm hover:text-pink-600 transition-colors ${
                    activeId === item.id
                      ? "text-pink-600 font-medium border-l-2 border-pink-600"
                      : "text-gray-600 hover:pl-3 transfrom"
                  } transition-all duration-200`}
                  style={{ paddingLeft: `${(item.level - 1) * 12 + (activeId === item.id ? 3 : 0)}px` }}
                >
                  {item.numberedText}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </>
  )
}