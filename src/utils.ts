import {TodoItem} from "./types";

export const getItemsFromCache: () => TodoItem[] | null = () => {
    const localStorageItem: string | null = localStorage.getItem('items');

    return localStorageItem && JSON.parse(localStorageItem)
}
