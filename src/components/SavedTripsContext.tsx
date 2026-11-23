'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface SavedTripsContextValue {
  savedSlugs: string[];
  toggleSaved: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  clearSaved: () => void;
}

const STORAGE_KEY = 'lokanusa_saved_trips_v1';

const SavedTripsContext = createContext<SavedTripsContextValue>({
  savedSlugs: [],
  toggleSaved: () => {},
  isSaved: () => false,
  clearSaved: () => {},
});

export function SavedTripsProvider({ children }: { children: React.ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedSlugs(parsed.filter((item): item is string => typeof item === 'string'));
        }
      }
    } catch {
      // Ignore malformed storage entries
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSlugs));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedSlugs, hydrated]);

  const toggleSaved = (slug: string) => {
    setSavedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  };

  const isSaved = (slug: string) => savedSlugs.includes(slug);
  const clearSaved = () => setSavedSlugs([]);

  return (
    <SavedTripsContext.Provider value={{ savedSlugs, toggleSaved, isSaved, clearSaved }}>
      {children}
    </SavedTripsContext.Provider>
  );
}

export function useSavedTrips() {
  return useContext(SavedTripsContext);
}
