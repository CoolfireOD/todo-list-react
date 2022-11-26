export const get = async <T>(url: string) => {
  const response = await fetch(url);

  return {
    data: (await response.json()) as T,
  };
};
