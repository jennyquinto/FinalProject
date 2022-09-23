let favorites = JSON.parse(localStorage.getItem('wishlist')); cardSection = document.getElementById('containerProducts');
let saved;
let idDeleted;
let reloadFavorites;
console.log(favorites);
const printCards = () => {
    cardSection.innerHTML = '';
    favorites.forEach(element => {
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


document.addEventListener('click', ({ target }) => {
    console.log('hola');
    if (target.classList.contains('btnfavorite')) {
        saved = favorites.find(item => item.id === parseInt(target.getAttribute('name')));
        console.log(favorites.indexOf(saved));
        favorites.indexOf(saved)
        const deleted = confirm('¿Desea eliminar producto de favoritos?');
        if (deleted == false) {
            console.log('no borrado');
            return favorites;
        }
        else {
            idDeleted = favorites.indexOf(saved);
            let reloadFavorites = favorites.splice(idDeleted, 1);
            console.log(favorites);
            localStorage.setItem('wishlist', JSON.stringify(favorites))
            printCards();
            return favorites;
        }
    }
});
printCards();