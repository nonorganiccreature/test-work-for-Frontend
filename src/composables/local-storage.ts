import { onMounted, ref, watch } from "vue";

export const useLocalStorage = <T>(key: string, data: T) => {
  const state = ref<T>(data);

  watch(
    state,
    () => {
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(state.value));
    },
    { deep: true },
  );

  onMounted(() => {
    state.value = JSON.parse(localStorage.getItem(key) || "") as T;
  });

  return state;
};
