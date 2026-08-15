function calculateTotal(items: number[]): number {
    return items.reduce((total, item) => total + item, 0);
}

const prices = [120, 250, 80, 150];

const total = calculateTotal(prices);

console.log("Total:", total);
