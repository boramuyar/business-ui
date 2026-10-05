import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerEmpty() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Loading primitives</EmptyTitle>
        <EmptyDescription>Fetching the registry index...</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
