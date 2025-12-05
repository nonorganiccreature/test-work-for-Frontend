import type { Timer } from "@/types";
import type { Ref } from "vue";

import { onMounted, onUnmounted, ref } from "vue";

export const useTimers = <T extends Timer>() => {
  const timers = ref<T[]>([]) as Ref<T[]>;
  const rAFId = ref<number>(-1);
  const lastTimeStamp = ref<DOMHighResTimeStamp>(-1);

  const addTimer = (timer: T) => {
    timers.value.push(timer);
  };

  const removeTimer = (id: T["id"]) => {
    timers.value = timers.value.filter((t) => t.id !== id);
  };

  const tickTimers: FrameRequestCallback = (
    rAFTimeStamp: DOMHighResTimeStamp,
  ) => {
    if (lastTimeStamp.value === -1) {
      lastTimeStamp.value = rAFTimeStamp;
    }

    for (const timer of timers.value) {
      timer.timeLeft -= rAFTimeStamp - lastTimeStamp.value;

      if (timer.timeLeft <= 0) {
        timer.expireCallback();
        timers.value = timers.value.filter((t) => t.id !== timer.id);
      }
    }

    lastTimeStamp.value = rAFTimeStamp;
    rAFId.value = requestAnimationFrame(tickTimers);
  };

  onMounted(() => {
    rAFId.value = requestAnimationFrame(tickTimers);
  });

  onUnmounted(() => {
    cancelAnimationFrame(rAFId.value);
  });

  return {
    addTimer,
    removeTimer,
    timers,
  };
};
