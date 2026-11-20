interface Product {
    readonly id: number;
    name: string;
    price: number;
    stock: number;
    category?: string;
}

interface CatalogContract {
    getAll(): Product[];
    getById(id: number): Product | undefined;
    add(product: Product): boolean;
    updatePrice(id: number, price: number): boolean;
    remove(id: number): boolean;
}

class ProductCatalog implements CatalogContract {
    private products: Product[];

    constructor(initialProducts: Product[] = []) {
        this.products = initialProducts.map(product => ({ ...product }));
    }

    static isValidPrice(price: number): boolean {
        return Number.isFinite(price) && price >= 0;
    }

    getAll(): Product[] {
        return this.products.map(product => ({ ...product }));
    }

    getById(id: number): Product | undefined {
        const foundProduct = this.products.find(product => product.id === id);
        return foundProduct ? { ...foundProduct } : undefined;
    }

    add(product: Product): boolean {
        const hasSameId = this.products.some(existingProduct => existingProduct.id === product.id);
        if (hasSameId || !ProductCatalog.isValidPrice(product.price)) {
            return false;
        }
        this.products.push({ ...product });
        return true;
    }

    updatePrice(id: number, price: number): boolean {
        if (!ProductCatalog.isValidPrice(price)) {
            return false;
        }
        const foundProduct = this.products.find(product => product.id === id);
        if (!foundProduct) {
            return false;
        }
        foundProduct.price = price;
        return true;
    }

    remove(id: number): boolean {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            return false;
        }
        this.products.splice(productIndex, 1);
        return true;
    }

    getDisplayPrice(id: number): number | undefined {
        const foundProduct = this.products.find(product => product.id === id);
        return foundProduct ? foundProduct.price : undefined;
    }
}

class DiscountedCatalog extends ProductCatalog {
    private discountPercent: number;

    constructor(initialProducts: Product[] = [], discountPercent: number = 0) {
        super(initialProducts);
        this.discountPercent = discountPercent;
    }

    override getDisplayPrice(id: number): number | undefined {
        const basePrice = super.getDisplayPrice(id);
        if (basePrice === undefined) return undefined;
        return basePrice * (1 - this.discountPercent / 100);
    }
}

const initialProducts: Product[] = [
    { id: 1, name: "Мышь", price: 1200, stock: 10, category: "Периферия" },
    { id: 2, name: "Клавиатура", price: 4500, stock: 5 }
];

const catalog = new ProductCatalog(initialProducts);

console.log("Добавить новый товар:", catalog.add({ id: 3, name: "Монитор", price: 15000, stock: 2 }));
console.log("Повторный ID 1:", catalog.add({ id: 1, name: "Дубль", price: 500, stock: 1 }));
console.log("Поиск ID 2:", catalog.getById(2));
console.log("Поиск несуществующего ID 99:", catalog.getById(99));
console.log("Смена цены ID 1 на 1400:", catalog.updatePrice(1, 1400));
console.log("Некорректная цена -100:", catalog.updatePrice(1, -100));
console.log("Удаление ID 2:", catalog.remove(2));
console.log("Итоговый список:", catalog.getAll());

const discountedCatalog = new DiscountedCatalog(initialProducts, 20);
console.log("Цена со скидкой 20% для ID 2:", discountedCatalog.getDisplayPrice(2));