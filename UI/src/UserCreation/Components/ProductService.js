
export class ProductService {

    getProductsSmall() {
        return fetch('../Components/products-small.json').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('../Components/products.json').then(res => res.json()).then(d => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('../Components/products-orders-small.json').then(res => res.json()).then(d => d.data);
    }
}
     