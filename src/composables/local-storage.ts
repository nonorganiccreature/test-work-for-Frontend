import {
  onBeforeMount,
  ref,
  toValue,
  watchEffect,
  type MaybeRefOrGetter,
} from "vue";

export interface LocalStorageOptions<T> {
  transformFunction: (e: T) => void;
}

export const useLocalStorage = <T>(
  key: MaybeRefOrGetter<string>,
  data: MaybeRefOrGetter<T>,
  options?: LocalStorageOptions<T>,
) => {
  const state = ref<T>(toValue(data));

  onBeforeMount(() => {
    watchEffect(() => {
      const initialLocalStorageValue = localStorage.getItem(toValue(key));
      if (initialLocalStorageValue === null) {
        return;
      }

      if (options) {
        state.value = options.transformFunction(
          JSON.parse(localStorage.getItem(toValue(key)) ?? "null"),
        );

        return;
      }

      state.value = JSON.parse(localStorage.getItem(toValue(key)) ?? "null");
    });

    watchEffect(() => {
      localStorage.setItem(toValue(key), JSON.stringify(state.value));
    });
  });

  return state;
};
