import {
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  cloneElement,
  ReactElement,
} from "react";
import { addTourStep } from "../actions";

import {
  FloatingPortal,
  offset,
  useFloating,
  autoUpdate,
  autoPlacement,
  useTransitionStyles,
  FloatingOverlay,
} from "@floating-ui/react";
import { currentStepIndex, steps, _start } from "../state";

interface TourStepProps {
  order: number;
  children: ReactElement;
  tourContent?: ReactNode;
}

export default function TourStep({
  order,
  children,
  tourContent,
}: TourStepProps) {
  const tourRef = useRef(null);
  const id = useMemo(() => window.crypto["randomUUID"](), []);
  const currentStepId = steps.value[currentStepIndex.value]?.id;
  const canShow = currentStepId === id && _start.value;

  const { refs, floatingStyles, context } = useFloating({
    open: canShow,
    middleware: [offset(10), autoPlacement()],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      zIndex: 99999999,
    },
    close: {
      opacity: 0,
    },
  });

  useLayoutEffect(() => {
    addTourStep({ ref: tourRef, order, id });
  }, [order, id]);

  return (
    <>
      <div className="tour-step" style={{ width: "fit-content" }} ref={tourRef}>
        {cloneElement(children, {
          ref: refs.setReference,
        })}
      </div>

      {isMounted && (
        <>
          <FloatingPortal>
            <FloatingOverlay />
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, ...styles }}
            >
              {tourContent}
            </div>
          </FloatingPortal>
        </>
      )}
    </>
  );
}
