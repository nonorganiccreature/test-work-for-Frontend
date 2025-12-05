import { onUnmounted, ref } from "vue";

export const useEventListener = () => {
  const listeners = ref<
    Map<
      keyof WindowEventMap,
      Array<Parameters<typeof window.addEventListener>["1"]>
    >
  >(new Map());

  const create = (
    eventName: keyof WindowEventMap,
    listener: Parameters<typeof window.addEventListener>["1"],
  ) => {
    window.addEventListener(eventName, listener);
  };

  onUnmounted(() => {
    for (const [currentEventName, currentEventListeners] of listeners.value) {
      for (const currentListener of currentEventListeners) {
        window.removeEventListener(currentEventName, currentListener);
      }
    }
  });

  return {
    create,
  };
};
