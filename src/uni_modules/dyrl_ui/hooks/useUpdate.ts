import { onMounted,onUnmounted } from "vue";

const useUpdate = (
  key: string,
  service: (data?: any) => Promise<any> | void,
) => {
  const update = async (data?: any) => {
    await service(data);
  };

  onMounted(async () => {
    if (key) uni.$on(key, update);
  });

  onUnmounted(() => {
    if (key) uni.$off(key, update);
  });
};

export default useUpdate;
