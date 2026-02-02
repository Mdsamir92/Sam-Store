// import { create } from "zustand";

// interface SearchState {
//   query: string;
//   setQuery: (q: string) => void;
//   clearQuery: () => void;
// }

// export const useSearchStore =
//   create <
//   SearchState >
//   ((set) => ({
//     query: "",
//     setQuery: (q) => set({ query: q }),
//     clearQuery: () => set({ query: "" }),
//   }));


import { create } from "zustand";

interface SearchStore {
  query: string;
  results: any[];
  setQuery: (q: string) => void;
  setResults: (r: any[]) => void;
  clear: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  results: [],
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  clear: () => set({ query: "", results: [] }),
}));
