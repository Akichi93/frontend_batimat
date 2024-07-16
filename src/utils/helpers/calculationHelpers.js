export function calculateAmount(unitPrice, quantity) {
    return unitPrice * quantity;
}

export function calculateTotal(products) {
    return products.reduce((sum, product) => sum + product.amount, 0);
}