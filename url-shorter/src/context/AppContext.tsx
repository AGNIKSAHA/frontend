import {
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
  import type{ReactNode} from "react";

import { api } from "../api/urls";



const PAGE_SIZE = 10;



export interface ShortUrl {
  id: string;
  original_url: string;
  short_code: string;
  click_count: number;
  expires_at: string;
}

interface AppContextType {
  urls: ShortUrl[];
  loading: boolean;
  hasMore: boolean;

  fetchUrls: () => Promise<void>;
  initFetch: () => Promise<void>;
  resetUrls: () => void;
  deleteUrl: (id: string) => Promise<void>;
}


const AppContext = createContext<AppContextType | null>(null);

//  PROVIDER 

export function AppProvider({ children }: { children: ReactNode }) {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

 
  const initialized = useRef(false);


    //  FETCH URLS (PAGINATION + DEDUPLICATION)
  const fetchUrls = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${api.urls}?offset=${page * PAGE_SIZE}&limit=${PAGE_SIZE}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch URLs");
      }

      const data: ShortUrl[] = await res.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }


      setUrls((prev) => {
        const map = new Map<string, ShortUrl>();

        // existing data
        prev.forEach((u) => map.set(u.id, u));

        // new data overwrites old
        data.forEach((u) => map.set(u.id, u));

        return Array.from(map.values());
      });

      setPage((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };


  const initFetch = async () => {
    if (initialized.current) return;
    initialized.current = true;
    await fetchUrls();
  };

  const resetUrls = () => {
    setUrls([]);
    setPage(0);
    setHasMore(true);
    initialized.current = false;
  };

  const deleteUrl = async (id: string) => {
    const res = await fetch(api.deleteUrl(id), {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete URL");
    }

    setUrls((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        urls,
        loading,
        hasMore,
        fetchUrls,
        initFetch,
        resetUrls,
        deleteUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}



export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}
