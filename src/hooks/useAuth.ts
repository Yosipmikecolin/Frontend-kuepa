import { create } from "zustand";

interface Props {
  token: string | null;
  name: string | null;
  setToken: (data: string | null) => void;
  setName: (data: string | null) => void;
}

export const useAuth = create<Props>((set) => ({
  token: null,
  name: null,
  setToken: (data: string | null) => set((_state) => ({ token: data })),
  setName: (name: string | null) => set((_state) => ({ name })),
}));
