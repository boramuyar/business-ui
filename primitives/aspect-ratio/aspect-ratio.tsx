/**
 * @component Aspect Ratio
 * @level layout
 * @summary Keeps media at a fixed width-to-height ratio as it resizes.
 * @use Images, video, maps and previews that must not distort or jump while
 *      loading.
 * @avoid Text containers: let content set the height.
 * @related card, skeleton
 */
import { AspectRatio as AspectRatioPrimitive } from "radix-ui"

function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
