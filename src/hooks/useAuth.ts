import { create } from "zustand";

interface Props {
  token: boolean;
  setToken: (data: boolean) => void;
}

export const useAuth = create<Props>((set) => ({
  token: false,
  setToken: (data: boolean) => set((_state) => ({ token: data })),
}));
