import { currentTourTarget } from "../state";

import { stopTour } from "../actions";
import {
  autoUpdate,
  FloatingOverlay,
  FloatingPortal,
  offset,
  size,
  shift,
  useTransitionStyles,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { _start } from "../state";
import { useFloating } from "@floating-ui/react";
import { useEffect, useState } from "react";

export default function TourOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
    open: isOpen,
    strategy: 'fixed',
    // onOpenChange: setIsOpen,
    elements: {
      reference: currentTourTarget.value,
    },
    middleware: [
      // Assumes placement is 'bottom' (the default)
      offset(({ rects }) => {
        return -rects.reference.height / 2 - rects.floating.height / 2;
      }),
      shift(),
      size({
        apply({ elements }) {
          // Do things with the data, e.g.
          const { width, height } = elements.reference.getBoundingClientRect();
          Object.assign(elements.floating.style, {
            width: `${width}px`,
            height: `${height}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    setIsOpen(_start.value);
  }, [_start.value]);

  const { isMounted, styles } = useTransitionStyles(context, {
    common: {
      transitionProperty: "transform",
    },
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      borderRadius: "4px",
      boxShadow: "0px 0px 0px 5000px rgba(33, 33, 33, 0.5)",
      // zIndex: 999998,
    },
    close: {
      opacity: 0,
    },
  });

  return (
    <>
      {isMounted && (
        <FloatingPortal>
          <>
            <FloatingOverlay onClick={stopTour} />
            <div
              ref={refs.setFloating}
              className="overlay-step"
              style={{
                ...styles,
                ...floatingStyles,
              }}
            />
          </>
        </FloatingPortal>
      )}
    </>
  );
}
