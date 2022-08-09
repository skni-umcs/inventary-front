export default interface ItemType {
    id: number;
    name: string;
    category: string;
    value: string;
    warehouse: string;
    description: string;
    keywords: string[];
    [key: string]: any;
}