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
  shift,
  type Placement,
} from "@floating-ui/react";
import { currentStepIndex, steps, _start } from "../state";
import autoPlaceOverflow from '../middleware/autoPlaceOverflow'

interface TourStepProps {
  order: number;
  children: ReactElement;
  tourContent?: ReactNode;
  placement?: Placement
}

export default function TourStep({
  order,
  children,
  tourContent,
  placement,
}: TourStepProps) {
  const tourRef = useRef(null);
  const id = useMemo(() => window.crypto["randomUUID"](), []);
  const currentStepId = steps.value[currentStepIndex.value]?.id;
  const canShow = currentStepId === id && _start.value;

  const { refs, floatingStyles } = useFloating({
    open: canShow,
    middleware: [offset(10), shift({ padding: 5 }), autoPlaceOverflow()],
    whileElementsMounted: autoUpdate,
    placement,
  });

  useLayoutEffect(() => {
    addTourStep({ ref: tourRef, order, id });
  }, [order, id]);

  return (
    <>
      <div className="tour-step" style={{ width: 'fit-content' }} ref={tourRef}>
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
