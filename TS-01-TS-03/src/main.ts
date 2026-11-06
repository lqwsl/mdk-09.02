const productName: string = "Беспроводная мышь";
let price: number = 2500;
let quantity: number = 3;
let procent: number = 10;

if (price < 0 || quantity < 1) {
    console.error("Ошибка: некорректная цена или количество товара.");
} else {
    const baseTotal = price * quantity;

    const amount = (baseTotal * procent) / 100;
    const finalTotal = baseTotal - amount;

    const message = `${productName}: ${quantity} шт. по ${price} руб. (Скидка ${procent}%). Итого: ${finalTotal} руб.`;

    const result = document.querySelector("#result");
    if (result !== null) {
        result.textContent = message;
    }

    console.log(message);
}