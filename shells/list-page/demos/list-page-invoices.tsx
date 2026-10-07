import { SearchIcon } from "lucide-react"
import { ListPage } from "@/components/shells/list-page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const invoices = [
  {
    id: "INV-1042",
    customer: "Northwind Traders",
    amount: "€4,200.00",
    status: "Paid",
  },
  {
    id: "INV-1043",
    customer: "Fabrikam AB",
    amount: "€1,180.50",
    status: "Overdue",
  },
  {
    id: "INV-1044",
    customer: "Contoso Ltd",
    amount: "€9,760.00",
    status: "Sent",
  },
  {
    id: "INV-1045",
    customer: "Tailspin Toys",
    amount: "€640.00",
    status: "Draft",
  },
] as const

const statusVariant = {
  Paid: "success",
  Overdue: "destructive",
  Sent: "info",
  Draft: "secondary",
} as const

export function ListPageInvoices() {
  return (
    <ListPage
      actions={
        <>
          <Button variant="outline">Import</Button>
          <Button>New invoice</Button>
        </>
      }
      className="py-0 md:py-0"
      description="Every invoice sent from this workspace."
      filters={
        <InputGroup className="max-w-xs">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search invoices..." />
        </InputGroup>
      }
      title="Invoices"
      view={
        <ToggleGroup defaultValue="table" type="single" variant="outline">
          <ToggleGroupItem value="table">Table</ToggleGroupItem>
          <ToggleGroupItem value="board">Board</ToggleGroupItem>
        </ToggleGroup>
      }
      width="full"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[invoice.status]}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {invoice.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ListPage>
  )
}
