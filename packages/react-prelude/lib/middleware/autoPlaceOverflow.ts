
import {
  autoPlacement,
  detectOverflow,
  type SideObject,
  type AutoPlacementOptions
} from "@floating-ui/react";

const isOverflow = (overflow: SideObject) => overflow?.left > 0 || overflow?.right > 0 || overflow?.top > 0 || overflow?.bottom > 0

const autoPlaceOverflow = (options?: AutoPlacementOptions) => ({
  name: 'autoPlaceOverflow',
  async fn(state) {
    const overflow = await detectOverflow(state);
    return isOverflow(overflow) ? autoPlacement(options).fn(state) : {}
  },
})

export default autoPlaceOverflow