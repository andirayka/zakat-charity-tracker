import { create } from "zustand";

type ZakatEntry = {
  id: string;
  amount: number;
  date: string;
  notes?: string;
};

type ZakatStore = {
  entries: ZakatEntry[];
  totalAmount: number;
  // Actions
  addEntry: (entry: Omit<ZakatEntry, "id">) => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, entry: Partial<ZakatEntry>) => void;
};

export const useZakatStore = create<ZakatStore>((set) => ({
  entries: [],
  totalAmount: 0,

  addEntry: (entry) =>
    set((state) => {
      const newEntry = {
        ...entry,
        id: crypto.randomUUID(),
      };
      const newEntries = [...state.entries, newEntry];
      return {
        entries: newEntries,
        totalAmount: newEntries.reduce((sum, e) => sum + e.amount, 0),
      };
    }),

  removeEntry: (id) =>
    set((state) => {
      const newEntries = state.entries.filter((e) => e.id !== id);
      return {
        entries: newEntries,
        totalAmount: newEntries.reduce((sum, e) => sum + e.amount, 0),
      };
    }),

  updateEntry: (id, updatedEntry) =>
    set((state) => {
      const newEntries = state.entries.map((e) =>
        e.id === id ? { ...e, ...updatedEntry } : e
      );
      return {
        entries: newEntries,
        totalAmount: newEntries.reduce((sum, e) => sum + e.amount, 0),
      };
    }),
}));
