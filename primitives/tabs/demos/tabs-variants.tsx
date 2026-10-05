import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsVariants() {
  return (
    <>
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="registry">Registry</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-3" value="preview">
          The rendered component.
        </TabsContent>
        <TabsContent className="pt-3" value="code">
          The source behind it.
        </TabsContent>
        <TabsContent className="pt-3" value="registry">
          The registry item JSON.
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="colors">
        <TabsList variant="line">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-3" value="colors">
          Line-variant triggers.
        </TabsContent>
        <TabsContent className="pt-3" value="tokens">
          Minimal underline styling.
        </TabsContent>
      </Tabs>
    </>
  )
}
