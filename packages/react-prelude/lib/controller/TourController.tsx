import { useSignalEffect } from "@preact/signals-react";
import { currentStepIndex, _start, steps } from "../state";
import { setTourStep } from "../actions";
import Overlay from "./Overlay";

export default function TourController() {
  useSignalEffect(() => {
    if (currentStepIndex.value < 0) {
      setTourStep(0);
    }
    if (currentStepIndex.value > steps.value?.length - 1) {
      setTourStep(steps.value?.length - 1);
    }
  });
  return <Overlay />;
}
