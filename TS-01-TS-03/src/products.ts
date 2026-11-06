type ProductId = number;

interface Supplier {
    name: string;
    country: string;
    email?: string;
}

interface Product {
    readonly id: ProductId;
    name: string;
    price: number;
    isAvailable: boolean;
    supplier: Supplier;
    description?: string;
}

const goods: Product[] = [
    {
        id: 1,
        name: "Мышъка",
        price: 1400,
        isAvailable: true,
        supplier: { name: "Logitech", country: "Швейцария", email: "logitech@gmail.com" },
        description: "Крутая беспроводная мышь"
    },
    {
        id: 2,
        name: "Клавиатура",
        price: 5000,
        isAvailable: true,
        supplier: { name: "IO by Red Square Type 84", country: "Китай" },
        description: "Какая-то крутая клавиатура"
    },
    {
        id: 3,
        name: "Мониторъ",
        price: 16600,
        isAvailable: false,
        supplier: { name: "ARDOR GAMING INFINITY PRO AQ27H1", country: "Китай", email: "ardorgaming@gmail.com" }
    }
];

const available = goods.filter(p => p.isAvailable);
const names: string[] = goods.map(p => p.name);
const found = goods.find(p => p.id === 1);

console.log("Доступно товаров:", available.length);
console.log("Список названий:", names);
console.log("Найден по ID:", found?.name);

goods.forEach(p => {
    if (p.description !== undefined) {
        console.log(`- ${p.name}: ${p.description}`);
    }
});