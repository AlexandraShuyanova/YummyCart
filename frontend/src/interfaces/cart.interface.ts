export interface Cart {
    userId: number;
    items: {
        productId: number;
        count: number
    };
}