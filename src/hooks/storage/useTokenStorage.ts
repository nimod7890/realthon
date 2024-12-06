import STORAGE_KEYS from "@constants/storage";
import useStorage from "src/hooks/storage/index.ts";

const useTokenStorage = () => useStorage<string | null>(STORAGE_KEYS.TOKEN, null);

export default useTokenStorage;
