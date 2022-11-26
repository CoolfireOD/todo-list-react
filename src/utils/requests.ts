export const get = async <T>(url: string) => {
  const response = await fetch(url);

  return {
    data: (await response.json()) as T,
  };
};

export const post = async <T>(url: string, data: unknown) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return {
    data: (await response.json()) as T,
  };
};

export const put = async <T>(url: string, data: unknown) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return {
    data: (await response.json()) as T,
  };
};

export const remove = async (url: string) => {
  await fetch(url, {
    method: "DELETE",
  });
};
