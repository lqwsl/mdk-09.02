// Типы и интерфейсы
interface Item {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

interface Order {
    id: number;
    client: string;
    items: Item[];
    discription?: number;
}

type Formatter = (val: number) => string;

const orders: Order[] = [
    {
        id: 1,
        client: "Анна",
        items: [
            { id: 101, title: "Мышь", price: 1500, quantity: 2 },
            { id: 102, title: "Коврик", price: 500, quantity: 1 }
        ],
        discription: 10
    },
    {
        id: 2,
        client: "Иван",
        items: [
            { id: 201, title: "Клавиатура", price: 6500, quantity: 1 },
            { id: 202, title: "Подставка", price: 1200, quantity: 2 }
        ],
        discription: 15
    },
    {
        id: 3,
        client: "Елена",
        items: [
            { id: 301, title: "Монитор", price: 24000, quantity: 1 },
            { id: 302, title: "Кабель", price: 800, quantity: 3 }
        ]
    }
];

const calcItem = (item: Item): number => item.price * item.quantity;

const calcSub = (items: Item[]): number => items.reduce((sum, item) => sum + calcItem(item), 0);

const applyDisc = (sub: number, percent: number = 0): number => {
    if (percent < 0 || percent > 100) throw new Error("Неверная скидка");
    return sub - (sub * percent) / 100;
};

const formatPrice: Formatter = (val, cur = "RUB") => `${val.toFixed(2)} ${cur}`;

const formatOrder = (order: Order, fmt: Formatter = formatPrice): string => {
    const sub = calcSub(order.items);
    const total = applyDisc(sub, order.discription ?? 0);
    return `Заказ #${order.id} | Клиент: ${order.client} | Итого: ${fmt(total)}`;
};

const selectItems = (items: Item[], fn: (i: Item) => boolean): Item[] => items.filter(fn);

const titles: string[] = orders[0].items.map(i => i.title);
console.log("Названия позиций 1-го заказа:", titles);

const searchId = 202;
const found = orders.flatMap(o => o.items).find(i => i.id === searchId);

if (found !== undefined) {
    console.log(`Найдена позиция: ${found.title}, кол-во: ${found.quantity}`);
} else {
    console.log("Позиция не найдена.");
}

console.log("Отчет");
orders.forEach(o => console.log(formatOrder(o)));

const bulk = selectItems(orders[1].items, i => i.quantity > 1);
console.log("Позиции с кол-вом > 1 во 2-м заказе:", bulk);

const sumAll = (...nums: number[]): number => nums.reduce((a, b) => a + b, 0);
console.log("Сумма чисел (rest):", sumAll(10, 20, 30));