interface Product {
    id: number;
    title: string;
    price: number;
}

type State =
    | { status: "ready" }
    | { status: "loading"; start: number }
    | { status: "success"; items: Product[]; time: number }
    | { status: "empty"; time: number }
    | { status: "error"; msg: string; retry: boolean };

const assertNever = (val: never): never => {
    throw new Error(`Неизвестное состояние: ${val}`);
};

const getMessage = (state: State): string => {
    switch (state.status) {
        case "ready":
            return "Ожидание загрузки.";
        case "loading":
            return `Загрузка началась в ${new Date(state.start).toLocaleTimeString()}.`;
        case "success": {
            const sum = state.items.reduce((acc, p) => acc + p.price, 0);
            return `Загружено товаров: ${state.items.length}. Сумма: ${sum} руб.`;
        }
        case "empty":
            return "Каталог пуст.";
        case "error":
            return `Ошибка: ${state.msg} (Повтор: ${state.retry ? "Да" : "Нет"})`;
        default:
            return assertNever(state);
    }
};

const states: State[] = [
    { status: "ready" },
    { status: "loading", start: Date.now() },
    { 
        status: "success", 
        items: [{ id: 1, title: "Мышъ", price: 1500 }], 
        time: Date.now() 
    },
    { status: "empty", time: Date.now() },
    { status: "error", msg: "Сбой сети", retry: true }
];

console.log("Состояние каталога:");
states.forEach(s => console.log(getMessage(s)));

const format = (val: string | number): string => 
    typeof val === "string" ? val.toUpperCase() : val.toFixed(2);

console.log("\nПример typeof:", format(123.456));