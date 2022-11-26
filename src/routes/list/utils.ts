export const getTodosQueryKey = (searchParams: Record<string, unknown>) => [
  "items",
  searchParams,
];
