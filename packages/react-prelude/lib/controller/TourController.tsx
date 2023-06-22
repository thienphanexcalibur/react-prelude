import { useSignalEffect } from "@preact/signals-react";
import { currentStepIndex, currentTourTarget, _start, steps } from "../state";
import { setTourStep } from "../actions";
import Overlay from "./Overlay";
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";

export default function TourController() {
  useSignalEffect(() => {
    if (currentStepIndex.value < 0) {
      setTourStep(0);
    }
    if (currentStepIndex.value > steps.value?.length - 1) {
      setTourStep(steps.value?.length - 1);
    }
  });
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {_start.value && currentTourTarget.value ? <Overlay /> : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
