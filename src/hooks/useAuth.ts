import { create } from "zustand";

interface Props {
  token?: string;
  setToken: (data: string) => void;
}

export const useAuth = create<Props>((set) => ({
  token: undefined,
  setToken: (data: string) => set((_state) => ({ token: data })),
}));
