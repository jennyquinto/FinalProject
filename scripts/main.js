let categoryByProducts = [];
let quantity = 0;
let products = [];
let favoritesList = JSON.parse(localStorage.getItem('wishlist')) || [];
let listCart = JSON.parse(localStorage.getItem('cartList')) || [];
let total = 0;
let totalProduct = 0;
const url = 'http://localhost:3000/products';
//Filtrar por categoría. obtener el nombre dela categoria
const vegetableCategory = document.getElementById('liVegetables');
const fruitCategory = document.getElementById('liFruits');
const beverageCategory = document.getElementById('liBeverages');
const bakeryCategory = document.getElementById('liSnacks');
const snackCategory = document.getElementById('liBakery');
const legumeCategory = document.getElementById('liLegumes');
const breakfastCategory = document.getElementById('liBreakfast');
const personalCategory = document.getElementById('liPersonal');
const groceryCategory = document.getElementById('liGrocery');
const houseCategory = document.getElementById('liHouse');
//Función para consultar los productos del archivo json y filtraslos por su categorìa
const allProducts = async () => {
    try {
        const response = await fetch(url);
        products = await response.json();
        categoryByProducts = products;
        printCards();
        console.log(categoryByProducts);
    } catch (error) {
        console.log(error);
    }
};
allProducts();
//Función para consultar los productos del archivo json y filtraslos por su categorìa
const getProducts = async (category) => {
    try {
        const response = await fetch(url);
        products = await response.json();
        printCards();
        categoryByProducts = filterCategory(products, category)
        console.log(categoryByProducts);
    } catch (error) {
        console.log(error);
    }
}
//Filtrar por categoría. Función de filtrado
const filterCategory = (ArrayProducts, category) => {
    categoryByProducts = ArrayProducts.filter(element => element.category === parseInt(category.getAttribute('value')))
    printCards();
    return categoryByProducts;
}
//Se escucha el evento para cada catgoría y Ejecutar la función para ver los resultados
vegetableCategory.addEventListener('click', () => { getProducts(vegetableCategory) });
fruitCategory.addEventListener('click', () => { getProducts(fruitCategory) });
beverageCategory.addEventListener('click', () => { getProducts(beverageCategory) });
bakeryCategory.addEventListener('click', () => { getProducts(bakeryCategory) });
snackCategory.addEventListener('click', () => { getProducts(snackCategory) });
legumeCategory.addEventListener('click', () => { getProducts(legumeCategory) });
breakfastCategory.addEventListener('click', () => { getProducts(breakfastCategory) });
personalCategory.addEventListener('click', () => { getProducts(personalCategory) });
groceryCategory.addEventListener('click', () => { getProducts(groceryCategory) });
houseCategory.addEventListener('click', () => { getProducts(houseCategory) });
console.log(categoryByProducts);
//Mostrar los elementos por categorias
const cardSection = document.getElementById('containerProducts');

const printCards = () => {
    cardSection.innerHTML = '';
    categoryByProducts.forEach(element => {
        cardSection.innerHTML += `
        <div class="cart">
            <img src="${element.image}" alt="Heart icon" class="img-cart">
            <div class="actions-cart">
                <img src="/img/eye.svg" alt="Eye icon" class="img-action">
                <img src="/img/sync.svg" alt="Arrows around icon" class="img-action">
                <img src="/img/heart.png" alt="Heart icon" class="btnfavorite" name ="${element.id}">
            </div>
            <div>
                <h4 class="product-name">${element.name}</h4>
                <span class="price-cart">
                    <h3 class="product-price">$${element.price}</h3>
                    <h4 class="product-discont">28.56</h4>
                </span>
                <div class="rating-cart">
                    <button><img src="/img/star (2).png" alt="Rating star" class="img-rating"></button>
                    <p class="product-price">In Stock</p>
                </div>
                <div>
                    <div class="quantity-product">
                        <button class="Minus" name="${element.id}">-</button>
                        <span class="quantity" id="${element.id}">0</span>
                        <button class="Plus" name ="${element.id}">+</button>
                    </div>
                </div>
            </div>
        </div>
        `
    });
};
//btnFavorites
document.addEventListener('click', ({ target }) => {
    if (target.classList.contains('btnfavorite')) {
        let saved = products.find(item => item.id === parseInt(target.getAttribute('name')));
        const productSaved = favoritesList.some(item => item.id === saved.id);
        if (productSaved == false) {
            favoritesList.push(saved);
            localStorage.setItem('wishlist', JSON.stringify(favoritesList))
        }
        console.log(favoritesList);
    }
});
//btnPlus & btnMinus
document.addEventListener('click', ({ target }) => {
    // let produtToBuy = document.getElementById('btnAdd');
    if (target.classList.contains('Plus')) {
        const idItem = target.getAttribute('name');
        console.log(idItem);
        const quantity = document.getElementById(idItem)
        console.log(quantity.innerHTML);
        quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
        const productCart = products.find(product => product.id === parseInt(target.getAttribute('name')));
        productCart.quantity = quantity.innerHTML;
        const productAdded = listCart.some(item => item.id === productCart.id);
        if (productAdded == false) {
            listCart.push(productCart);

            localStorage.setItem('cartList', JSON.stringify(listCart));
        }
        else {
            listCart.quantity = quantity.innerHTML;
            localStorage.setItem('cartList', JSON.stringify(listCart));

        }
        console.log(listCart);
        console.log(productCart);
    }
    else if (target.classList.contains('Minus')) {
        const idItem = target.getAttribute('name');
        // console.log(idItem);
        const quantity = document.getElementById(idItem);
        // console.log(quantity.innerHTML);
        if (quantity.innerHTML >0) {
            quantity.innerHTML = parseInt(quantity.innerHTML) - 1;
            const productCart = products.find(product => product.id === parseInt(target.getAttribute('name')));
            const productIndex = listCart.indexOf(productCart);
            console.log(productIndex);
            const productAdded = listCart.find(item => item.id === productCart.id);
            if(productAdded){
                productAdded.quantity = quantity.innerHTML;
                localStorage.setItem('cartList', JSON.stringify(listCart));

            }
            if(quantity.innerHTML==0){
                listCart.splice(productIndex,1)
                localStorage.setItem('cartList', JSON.stringify(listCart));
            }
            console.log(listCart);
        }

    }
});
