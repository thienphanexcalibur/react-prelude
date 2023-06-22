import { RefObject } from "react";
import { currentStepIndex, _start, steps, rawSteps } from "./state";

export function startTour() {
  _start.value = true;
}

export function stopTour() {
  _start.value = false;
}

export function setTourStep(index: number) {
  currentStepIndex.value = index;
}

export function addTourStep({
  ref,
  order,
  id
}: {
  ref: RefObject<HTMLDivElement>;
  order: number;
  id: string;
}) {
  rawSteps.value = [
    ...steps.value,
    {
      target: ref,
      order,
      id
    }
  ];
}

export function getCurrentStep() {
  return steps[currentStepIndex.value];
}
