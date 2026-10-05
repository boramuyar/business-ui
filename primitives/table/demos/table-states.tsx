import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableStates() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Primitive</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state="selected">
          <TableCell>button</TableCell>
          <TableCell>stable</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>badge</TableCell>
          <TableCell>stable</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
