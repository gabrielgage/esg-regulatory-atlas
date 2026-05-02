import { FilterState } from "@/types/regulation";
import { initialFilters } from "./filters";

const filterKeys = Object.keys(initialFilters) as Array<keyof FilterState>;

export function filtersFromSearchParams(params: URLSearchParams) {
  return filterKeys.reduce<FilterState>((next, key) => {
    next[key] = params.get(key) || "";
    return next;
  }, { ...initialFilters });
}

export function filtersToSearchParams(filters: FilterState, view?: string) {
  const params = new URLSearchParams();

  filterKeys.forEach((key) => {
    const value = filters[key];
    if (value) params.set(key, value);
  });

  if (view && view !== "overview") params.set("view", view);

  return params;
}

export function viewFromSearchParams(params: URLSearchParams) {
  return params.get("view") || "overview";
}
