interface Product {
    id: number;
    name: string;
    price: number;
    available: boolean;
    category?: string;
}

const storageKey = "catalog-products";
let products: Product[] = [];

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isProduct(value: unknown): value is Product {
    if (!isRecord(value)) return false;

    const validId = typeof value.id === "number" && Number.isInteger(value.id) && value.id > 0;
    const validName = typeof value.name === "string" && value.name.trim().length > 0;
    const validPrice = typeof value.price === "number" && Number.isFinite(value.price) && value.price >= 0;
    const validAvailable = typeof value.available === "boolean";
    const validCategory =
        !("category" in value) || value.category === undefined || typeof value.category === "string";

    return validId && validName && validPrice && validAvailable && validCategory;
}

function isProductArray(value: unknown): value is Product[] {
    if (!Array.isArray(value)) return false;
    const items: unknown[] = value;
    return items.every(isProduct);
}

function setStatus(message: string, isError = false): void {
    const statusElement = document.querySelector("#status");
    if (!(statusElement instanceof HTMLElement)) return;

    statusElement.textContent = message;
    statusElement.style.color = isError ? "crimson" : "green";
}

function renderProducts(list: Product[]): void {
    const listElement = document.querySelector("#list");
    if (listElement === null) return;

    listElement.textContent = "";

    if (list.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "Каталог пуст";
        listElement.appendChild(emptyItem);
        return;
    }

    for (const item of list) {
        const li = document.createElement("li");
        const categoryText = item.category ?? "без категории";
        const stockText = item.available ? "в наличии" : "нет в наличии";
        li.textContent = `#${item.id} ${item.name.trim()} — ${item.price} руб. (${categoryText}, ${stockText})`;
        listElement.appendChild(li);
    }
}

function saveProducts(list: Product[]): boolean {
    try {
        localStorage.setItem(storageKey, JSON.stringify(list));
        return true;
    } catch (error: unknown) {
        const reason = error instanceof Error ? error.message : "ошибка сохранения";
        setStatus(`Не удалось сохранить: ${reason}`, true);
        return false;
    }
}

function loadProducts(): Product[] {
    try {
        const savedText = localStorage.getItem(storageKey);
        if (savedText === null) return [];

        const parsed: unknown = JSON.parse(savedText);
        if (!isProductArray(parsed)) {
            setStatus("В localStorage лежат некорректные данные, загружен пустой список.", true);
            return [];
        }

        return parsed;
    } catch (error: unknown) {
        const reason = error instanceof Error ? error.message : "ошибка чтения";
        setStatus(`Ошибка загрузки из localStorage: ${reason}`, true);
        return [];
    }
}

function handleImport(): void {
    const textarea = document.querySelector("#json-input");
    if (!(textarea instanceof HTMLTextAreaElement)) return;

    const rawText = textarea.value.trim();
    if (rawText === "") {
        setStatus("Введите JSON перед импортом.", true);
        return;
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(rawText);
    } catch (error: unknown) {
        const reason = error instanceof Error ? error.message : "некорректный JSON";
        setStatus(`Ошибка синтаксиса JSON: ${reason}`, true);
        return;
    }

    if (!isProductArray(parsed)) {
        setStatus("Данные не подходят под формат списка товаров.", true);
        return;
    }

    products = parsed;
    renderProducts(products);

    if (saveProducts(products)) {
        setStatus(`Импортировано товаров: ${products.length}`);
    }
}

function handleClear(): void {
    localStorage.removeItem(storageKey);
    products = [];
    renderProducts(products);
    setStatus("Хранилище очищено.");
}

const importButton = document.querySelector("#import-btn");
const clearButton = document.querySelector("#clear-btn");

importButton?.addEventListener("click", handleImport);
clearButton?.addEventListener("click", handleClear);

products = loadProducts();
renderProducts(products);