interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    featured: boolean;
}

let products: Product[] = [];
let nextId = 1;

const form = document.querySelector<HTMLFormElement>("#product-form");
const productNameInput = document.querySelector<HTMLInputElement>("#product-name");
const categorySelect = document.querySelector<HTMLSelectElement>("#product-category");
const priceInput = document.querySelector<HTMLInputElement>("#product-price");
const quantityInput = document.querySelector<HTMLInputElement>("#product-quantity");
const featuredInput = document.querySelector<HTMLInputElement>("#product-featured");
const productList = document.querySelector<HTMLUListElement>("#product-list");
const totalText = document.querySelector<HTMLElement>("#total-price");
const messageText = document.querySelector<HTMLElement>("#status-message");

function showMessage(text: string, isError = false): void {
    if (!messageText) return;
    messageText.textContent = text;
    messageText.style.color = isError ? "crimson" : "green";
}

function updateTotal(): void {
    if (!totalText) return;
    let total = 0;
    for (const item of products) {
        total += item.price * item.quantity;
    }
    totalText.textContent = `Общая стоимость: ${total.toFixed(2)} руб.`;
}

function renderList(): void {
    if (!productList) return;
    productList.textContent = "";

    for (const item of products) {
        const listItem = document.createElement("li");
        listItem.dataset.productId = String(item.id);

        const label = document.createElement("span");
        const mark = item.featured ? " [Рекомендуемый]" : "";
        const sum = item.price * item.quantity;
        label.textContent = `${item.name} (${item.category}) — ${item.price} руб. × ${item.quantity} = ${sum} руб.${mark} `;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Удалить";

        listItem.appendChild(label);
        listItem.appendChild(deleteButton);
        productList.appendChild(listItem);
    }

    updateTotal();
}

function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (!productNameInput || !categorySelect || !priceInput || !quantityInput || !featuredInput) return;

    const name = productNameInput.value.trim();
    const category = categorySelect.value;
    const price = priceInput.valueAsNumber;
    const quantity = quantityInput.valueAsNumber;
    const featured = featuredInput.checked;

    if (name === "" || !Number.isFinite(price) || price <= 0 || !Number.isInteger(quantity) || quantity <= 0) {
        showMessage("Введите название, цену больше 0 и целое количество больше 0.", true);
        return;
    }

    products.push({
        id: nextId,
        name,
        category,
        price,
        quantity,
        featured
    });
    nextId += 1;

    renderList();
    showMessage(`Добавлен товар: ${name}`);
    form?.reset();
    quantityInput.value = "1";
    productNameInput.focus();
}

function handleListClick(event: MouseEvent): void {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest("button");
    if (!button) return;

    const listItem = button.closest("li");
    const productId = Number(listItem?.dataset.productId);
    if (!Number.isInteger(productId) || productId <= 0) return;

    products = products.filter(item => item.id !== productId);
    renderList();
    showMessage("Товар удалён.");
}

form?.addEventListener("submit", handleSubmit);
productList?.addEventListener("click", handleListClick);
renderList();