"use client"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useState } from "react"

export default function MenubarPage() {
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [showFullUrls, setShowFullUrls] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState("benoit")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Menubar</h1>
        <p className="text-lg text-muted-foreground">
          A visually persistent menu common in desktop applications that
          provides quick access to a consistent set of commands.
        </p>
      </div>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarShortcut,
} from "@/components/ui/menubar"`}</code>
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <div className="p-6 border rounded-lg bg-card">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Zoom In</MenubarItem>
                <MenubarItem>Zoom Out</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab</MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Undo</MenubarItem>
      <MenubarItem>Redo</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}</code>
        </pre>
      </section>

      {/* With Shortcuts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Shortcuts</h2>
        <div className="p-6 border rounded-lg bg-card">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Print <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<MenubarItem>
  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
</MenubarItem>`}</code>
        </pre>
      </section>

      {/* With Submenu */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Submenu</h2>
        <div className="p-6 border rounded-lg bg-card">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<MenubarSub>
  <MenubarSubTrigger>Share</MenubarSubTrigger>
  <MenubarSubContent>
    <MenubarItem>Email link</MenubarItem>
    <MenubarItem>Messages</MenubarItem>
    <MenubarItem>Notes</MenubarItem>
  </MenubarSubContent>
</MenubarSub>`}</code>
        </pre>
      </section>

      {/* With Checkbox Items */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Checkbox Items</h2>
        <div className="p-6 border rounded-lg bg-card">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem
                  checked={showBookmarks}
                  onCheckedChange={setShowBookmarks}
                >
                  Always Show Bookmarks Bar
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                  checked={showFullUrls}
                  onCheckedChange={setShowFullUrls}
                >
                  Always Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Reload <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [checked, setChecked] = useState(false)

<MenubarCheckboxItem
  checked={checked}
  onCheckedChange={setChecked}
>
  Always Show Bookmarks Bar
</MenubarCheckboxItem>`}</code>
        </pre>
      </section>

      {/* With Radio Group */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Radio Group</h2>
        <div className="p-6 border rounded-lg bg-card">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup
                  value={selectedProfile}
                  onValueChange={setSelectedProfile}
                >
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarItem inset>Add Profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`const [value, setValue] = useState("benoit")

<MenubarRadioGroup value={value} onValueChange={setValue}>
  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
  <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
</MenubarRadioGroup>`}</code>
        </pre>
      </section>

      {/* With Disabled Items */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Disabled Items</h2>
        <div className="p-6 border rounded-lg bg-card">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`<MenubarItem disabled>New Incognito Window</MenubarItem>`}</code>
        </pre>
      </section>

      {/* Complete Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Complete Example</h2>
        <p className="text-muted-foreground">
          A comprehensive example showing all features combined.
        </p>
        <div className="p-6 border rounded-lg bg-card">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Find</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Search the web</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Find...</MenubarItem>
                    <MenubarItem>Find Next</MenubarItem>
                    <MenubarItem>Find Previous</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem
                  checked={showBookmarks}
                  onCheckedChange={setShowBookmarks}
                >
                  Always Show Bookmarks Bar
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                  checked={showFullUrls}
                  onCheckedChange={setShowFullUrls}
                >
                  Always Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Reload <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled inset>
                  Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Hide Sidebar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup
                  value={selectedProfile}
                  onValueChange={setSelectedProfile}
                >
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Props</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Component</th>
                <th className="text-left p-3 font-semibold">Prop</th>
                <th className="text-left p-3 font-semibold">Type</th>
                <th className="text-left p-3 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3 font-mono text-sm">MenubarItem</td>
                <td className="p-3 font-mono text-sm">inset</td>
                <td className="p-3 font-mono text-sm">boolean</td>
                <td className="p-3 font-mono text-sm">false</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sm">MenubarItem</td>
                <td className="p-3 font-mono text-sm">disabled</td>
                <td className="p-3 font-mono text-sm">boolean</td>
                <td className="p-3 font-mono text-sm">false</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sm">MenubarCheckboxItem</td>
                <td className="p-3 font-mono text-sm">checked</td>
                <td className="p-3 font-mono text-sm">boolean</td>
                <td className="p-3 font-mono text-sm">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sm">MenubarCheckboxItem</td>
                <td className="p-3 font-mono text-sm">onCheckedChange</td>
                <td className="p-3 font-mono text-sm">(checked: boolean) =&gt; void</td>
                <td className="p-3 font-mono text-sm">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sm">MenubarRadioGroup</td>
                <td className="p-3 font-mono text-sm">value</td>
                <td className="p-3 font-mono text-sm">string</td>
                <td className="p-3 font-mono text-sm">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sm">MenubarRadioGroup</td>
                <td className="p-3 font-mono text-sm">onValueChange</td>
                <td className="p-3 font-mono text-sm">(value: string) =&gt; void</td>
                <td className="p-3 font-mono text-sm">-</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sm">MenubarSubTrigger</td>
                <td className="p-3 font-mono text-sm">inset</td>
                <td className="p-3 font-mono text-sm">boolean</td>
                <td className="p-3 font-mono text-sm">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The Menubar component follows the WAI-ARIA design pattern for menu
            bars.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Keyboard Navigation:</strong> Use{" "}
              <kbd className="px-2 py-1 bg-muted rounded">←</kbd>{" "}
              <kbd className="px-2 py-1 bg-muted rounded">→</kbd> to navigate
              between menu triggers
            </li>
            <li>
              <strong>Menu Opening:</strong> Press{" "}
              <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd>,{" "}
              <kbd className="px-2 py-1 bg-muted rounded">Space</kbd>, or{" "}
              <kbd className="px-2 py-1 bg-muted rounded">↓</kbd> to open a menu
            </li>
            <li>
              <strong>Menu Navigation:</strong> Use{" "}
              <kbd className="px-2 py-1 bg-muted rounded">↑</kbd>{" "}
              <kbd className="px-2 py-1 bg-muted rounded">↓</kbd> to navigate
              menu items
            </li>
            <li>
              <strong>Submenu Navigation:</strong> Press{" "}
              <kbd className="px-2 py-1 bg-muted rounded">→</kbd> to open a
              submenu,{" "}
              <kbd className="px-2 py-1 bg-muted rounded">←</kbd> to close
            </li>
            <li>
              <strong>Selection:</strong> Press{" "}
              <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> to select
              an item
            </li>
            <li>
              <strong>Close Menu:</strong> Press{" "}
              <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd> to close the
              open menu
            </li>
            <li>
              <strong>ARIA Attributes:</strong> Proper roles, states, and
              properties are automatically managed
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
