import { currentTourTarget } from "../state";

import { stopTour } from "../actions";
import { m } from "framer-motion";
import {
  autoUpdate,
  FloatingOverlay,
  FloatingPortal,
  offset,
  size
} from "@floating-ui/react";
import { useFloating } from "@floating-ui/react";

export default function TourOverlay() {
  const { refs, floatingStyles } = useFloating({
    strategy: "absolute",
    elements: {
      reference: currentTourTarget.value
    },
    middleware: [
      // Assumes placement is 'bottom' (the default)
      offset(({ rects }) => {
        return -rects.reference.height / 2 - rects.floating.height / 2;
      }),
      size({
        apply({ elements }) {
          // Do things with the data, e.g.
          const { width, height } = elements.reference.getBoundingClientRect();
          Object.assign(elements.floating.style, {
            width: `${width}px`,
            height: `${height}px`
          });
        }
      })
    ],
    whileElementsMounted: autoUpdate
  });

  return (
    <FloatingPortal>
      <FloatingOverlay onClick={stopTour}>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={refs.setFloating}
          className="overlay-step"
          style={{
            ...floatingStyles,
            borderRadius: "4px",
            boxShadow: "0px 0px 0px 5000px rgba(33, 33, 33, 0.5)",
            zIndex: 999998
          }}
        />
      </FloatingOverlay>
    </FloatingPortal>
  );
}
