import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsStates() {
  return (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger disabled value="disabled">
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent className="pt-3" value="active">
        The disabled trigger cannot be selected.
      </TabsContent>
    </Tabs>
  )
}
