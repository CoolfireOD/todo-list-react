import { useParams } from "react-router-dom";

export const useIdParam = () => {
  const { id } = useParams<{ id: string }>();

  if (typeof id === "undefined") {
    throw new Error("id is undefined");
  }

  return id;
};
