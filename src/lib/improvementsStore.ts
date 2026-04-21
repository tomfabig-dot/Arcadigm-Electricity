import { useSyncExternalStore } from "react";
import {
  improvements as seedImprovements,
  Improvement,
  ImprovementStatus,
} from "./data";

let items: Improvement[] = seedImprovements.map((i) => ({ ...i }));
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return items;
}

export function useImprovements(): Improvement[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function setImprovementStatus(id: string, status: ImprovementStatus) {
  items = items.map((i) => (i.id === id ? { ...i, status } : i));
  emit();
}
