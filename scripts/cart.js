// const allProducts = async () =>{
//     try {
//         const response = await fetch(url);
//         products = await response.json();
//         categoryByProducts = products;
//         console.log(categoryByProducts);
//     } catch (error) {
//         console.log(error);
//     }
// };

// document.addEventListener('click', ({target})=>{
//     if(target.classList.contains('btnfavorite')){
//         let saved = products.find(item => item.id===parseInt(target.getAttribute('name')));
//         const productSaved = favoritesList.some(item => item.id===saved.id);
//         if(productSaved==false){
//             favoritesList.push(saved);
//             localStorage.setItem('wishlist', JSON.stringify(favoritesList))
//         }
//         console.log(favorites);
//     }
// });