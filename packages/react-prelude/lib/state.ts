import { computed, signal } from "@preact/signals-react";
import { RefObject } from "react";

export const currentStepIndex = signal(0);

export const _start = signal(false);

interface Step {
  target: RefObject<HTMLElement>;
  order: number;
  id: string;
}
export const rawSteps = signal<Step[]>([]);

export const steps = computed(() =>
  rawSteps.value.slice().sort((a, b) => (a.order > b.order ? 1 : -1))
);

export const currentTourTarget = computed(() => {
  if (
    currentStepIndex.value > steps.value.length - 1 ||
    currentStepIndex.value < 0
  )
    return null;
  return steps.value[currentStepIndex.value].target.current;
});

export const currentTourBoundingRect = computed(() => {
  if (currentTourTarget.value)
    return currentTourTarget.value.getBoundingClientRect();
  return null;
});
