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
  shift,
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
    strategy: "fixed",
    open: canShow,
    middleware: [
      offset(10),
      autoPlacement({
        alignment: "end",
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
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
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 9999999 }}
            >
              <div
                // ref={refs.setFloating}
                style={styles}
              >
                {tourContent}
              </div>
            </div>
          </FloatingPortal>
        </>
      )}
    </>
  );
}
