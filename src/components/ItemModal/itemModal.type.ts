export interface ItemModalType {
    visible: boolean,
    itemId: number | undefined,
    closeModal: () => void,
    categories: string[],
    warehouses: string[],
}