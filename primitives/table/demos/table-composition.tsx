import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableComposition() {
  return (
    <Table>
      <TableCaption>Invoices for the current quarter.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono">INV-001</TableCell>
          <TableCell>
            <Badge size="sm" variant="success">
              Paid
            </Badge>
          </TableCell>
          <TableCell>Credit card</TableCell>
          <TableCell className="text-right tabular-nums">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">INV-002</TableCell>
          <TableCell>
            <Badge size="sm" variant="warning">
              Pending
            </Badge>
          </TableCell>
          <TableCell>Bank transfer</TableCell>
          <TableCell className="text-right tabular-nums">$1,480.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">INV-003</TableCell>
          <TableCell>
            <Badge size="sm" variant="destructive">
              Overdue
            </Badge>
          </TableCell>
          <TableCell>Credit card</TableCell>
          <TableCell className="text-right tabular-nums">$320.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right tabular-nums">$2,050.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
