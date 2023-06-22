import {
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  cloneElement,
  ReactElement,
} from "react";
import { addTourStep } from "../actions";
import { nanoid } from "nanoid";

import {
  FloatingPortal,
  offset,
  useFloating,
  autoUpdate,
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
  const id = useMemo(() => nanoid(4), []);
  const currentStepId = steps.value[currentStepIndex.value]?.id;
  const canShow = currentStepId === id && _start.value;

  const { refs, floatingStyles } = useFloating({
    open: canShow,
    middleware: [offset(10)],
    whileElementsMounted: autoUpdate,
  });

  useLayoutEffect(() => {
    addTourStep({ ref: tourRef, order, id });
  }, [order, id]);

  return (
    <>
      <div className="tour-step" ref={tourRef}>
        {cloneElement(children, {
          ref: refs.setReference,
        })}
      </div>

      {canShow && tourContent && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: 99999999 }}
          >
            {tourContent}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
