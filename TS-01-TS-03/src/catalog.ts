const productsNames: string[] = ["Беспроводная мышь", "Клавиатура", "Монитор", "Флешка", "Коврик для мыши"];
const prices: number[] = [2500, 7500, 18500, 1200, 450];
const flags: boolean[] = [true, true, false, true, true];

const rows: [string, number, boolean][] = [
    ["Беспроводная мышь", 2500, true],
    ["Клавиатура", 7500, true],
    ["Монитор", 18500, false],
    ["Флешка", 1200, true],
    ["Коврик для мыши", 450, true]
];

console.log("Все товары");
console.log(rows);

const active = rows.filter(r => r[2] === true);
console.log("Доступные товары", active);

const labels: string[] = active.map(r => {
    const n: string = r[0];
    const p: number = r[1];
    return `${n} — ${p} руб.`;
});
console.log("Ярлыки доступных товаров", labels);

const total: number = active.reduce((sum, r) => {
    const p: number = r[1];
    return sum + p;
}, 0);
console.log(`Общая стоимость доступных товаров: ${total} руб.`);

function showStats(count: number, sum: number): void {
    console.log(`[Статистика]: Всего доступно: ${count}, на сумму: ${sum} руб.`);
}
showStats(active.length, total);

// дополнительное

function throwError(msg: string): never {
    throw new Error(`Ошибка: ${msg}`);
}

function parsePrice(str: string): number {
    const num = Number(str);

    if (!Number.isFinite(num)) {
        throwError(`Некорректный формат: "${str}"`);
    }

    if (num < 0) {
        console.warn("Цена не может быть отрицательной.");
        return 0;
    }

    return num;
}

const raw = "1450.50";
const parsed = parsePrice(raw);
console.log(`Обработанная цена: ${parsed}`);