import {TodoItem} from "./types";

export const deepClone: (objectToClone: any) => any = (objectToClone) => JSON.parse(JSON.stringify(objectToClone));
export const getItemsFromCache: () => TodoItem[] | null = () => {
    const localStorageItem: string | null = localStorage.getItem('items');

    return localStorageItem && JSON.parse(localStorageItem)
}
