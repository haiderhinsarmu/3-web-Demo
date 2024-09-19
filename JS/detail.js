/// importing arays 
import { dealwatches } from '../Array/dealwatchs.js';
import { dealArmBand } from '../Array/dealArmBand.js';
import { dealRings } from '../Array/dealRings.js';
import { bestSeller } from '../Array/bestseller.js';
import { products } from '../Array/products.js';


//// counter document
const cartCounter = document.querySelector('.counter');

const productDetailFunction = () => {

 /// gathering all arays to gether 
const allproducts = [...dealwatches, ...dealArmBand, ...dealRings, ...bestSeller, ...products];
const detailsWraper = document.querySelector('.detailsWraper')

const displayDetails = () => {
 let displadetails = allproducts.map((item) => {
  if (item.id === parseInt(window.location.search.split('=')[1])) {
   const percentSpan = item.percent ? `<span>${item.percent}</span>` : '';
    return `
    <div class="details">
      <img src="${item.image}" alt="${item.name}">
      </div>
    <div class="details-ditail">
      <h3>${item.name}</h3>
      <h4>${item.price}</h4>
      ${percentSpan}
      <p>${item.desc}</p>
      <button
      type="button"
      class="addToCart"
      data-id="${item.id}"
      >Add to Cart</button>
     </div>
    `;
  }
 }).join("");
 detailsWraper.innerHTML = displadetails;
}

displayDetails();

//// adding eventlistner to btns 
cartCounter.innerHTML = 0
detailsWraper.addEventListener('click', (e)  => {
 if (e.target.classList.contains('addToCart')) {
  const productId = parseInt(e.target.dataset.id)
  const product = allproducts.find((product) => product.id === productId)
  cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
  localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML));
  addProductToCart(product);
 }
})


//// add product to cart 
const addProductToCart = (product) => {
 const carts = JSON.parse(localStorage.getItem('carts')) || [];
 const existingProduct = carts.find((item) => item.id === product.id)
 
 if (existingProduct) {
  existingProduct.quantity += 1;
 } else {
  carts.push({...product, quantity: 1 });
 }
 
 localStorage.setItem('carts', JSON.stringify(carts));
 counterFunction();
}
}
productDetailFunction();





/// diplaying similar products 
const relatedproduchtsFunction = () => {

 const simlarProductsWraper = document.querySelector('.relatedProductsWraper')
 const allproducts = [...dealwatches, ...dealArmBand, ...products, ...dealRings, ...bestSeller];
const displaySimlarproduct = () => {
 let displaySimilarproducts = allproducts.map((similar) => {
  if (similar.id!== parseInt(window.location.search.split('=')[1])) {
   const percentage = similar.percent ? `<span>${similar.percent}</span>` : '';
   return `
   <div class="relatedProduct">
     <a href="/html/detail.html?id=${similar.id}">
       <img src="${similar.image}" alt="${similar.name}">
     </a>
     <h3>${similar.name}</h3>
     <p>${similar.price}</p>
     ${percentage}
     <button type="button" data-id="${similar.id}" class="addRelatedProductsBtn">Add to Cart</button>
   </div>
   `;
  }
 }).join("");
 simlarProductsWraper.innerHTML = displaySimilarproducts;
}

displaySimlarproduct();

//// ading evetlistnier to btns
simlarProductsWraper.addEventListener('click', (e) => {
 if (e.target.classList.contains('addRelatedProductsBtn')) {
  const productId = parseInt(e.target.dataset.id)
  const product = allproducts.find((product) => product.id === productId)
  cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
  localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML));
  addRelatedProductsToCart(product);
 }
})


//// add it to carts 
const addRelatedProductsToCart = (product) => {
 const carts = JSON.parse(localStorage.getItem('carts')) || [];
 const existingProduct = carts.find((item) => item.id === product.id)
 
 if (existingProduct) {
  existingProduct.quantity += 1;
 } else {
  carts.push({...product, quantity: 1 });
 }
 
 localStorage.setItem('carts', JSON.stringify(carts));
 counterFunction();
}
}
relatedproduchtsFunction();




//// search engin 
const searchBarFunction = () => {
 const allproducts = [...dealwatches, ...dealArmBand, ...dealRings, ...bestSeller, ...products];
 const searchInput = document.getElementById('searchInput');

 const searchresultsWrapper = document.querySelector('.searchResoultWraper');
 const searchResultContainer = document.querySelector('.searchResoultConteiner');
 const dropDownResoultContainer = document.querySelector('.dropDownResoultContainer');
 const detailsContainer = document.querySelector('.details-container');
 const relatedProductsContainer = document.querySelector('.relatedProductsContainer');
 
 
 searchInput.addEventListener('keyup', (e) => {
     const searchValue = searchInput.value.toLowerCase();
 
     if(searchValue === '') {
       searchresultsWrapper.innerHTML = '';
       searchResultContainer.style.display = 'none';
       detailsContainer.style.display = 'flex'
       relatedProductsContainer.style.display = 'flex';
       return;
     } else {
       searchResultContainer.style.display = 'flex';
       dropDownResoultContainer.style.display = 'none';
       detailsContainer.style.display = 'none';
       relatedProductsContainer.style.display = 'none';
       
       
       const searchedProducts = allproducts.filter((product) => 
         product.name.toLowerCase().includes(searchValue) ||
       product.category.toLowerCase().includes(searchValue));
     
       searchresultsWrapper.innerHTML = searchedProducts.map((product) => {
       const percentHTML = product.percent ? `<span class="discount">${product.percent}</span>` : '';
       return `
       <div class="searchResoultItem">
       <a href="/html/detail.html?id=${product.id}">
       <img src="${product.image}" alt="${product.name}">
       </a>
       <h3>${product.name}</h3>
       <p>${product.price}</p>
       ${percentHTML}
       <button type="button" data-id="${product.id}" class="searchresoultbtn">Add to Cart</button>
       </div>
       `
     }).join("")
     searchresultsWrapper.style.display = 'grid';
 
     //// if product or item not in array  not found 
     if(searchedProducts.length === 0) {
       searchresultsWrapper.innerHTML = `
       <div class="emptySearch">
        <p>
        No results found
        </p>
       </div>`;
     }
   
   }
 })
 
 
 // adding event listner to btns
 cartCounter.innerHTML = 0;
 searchresultsWrapper.addEventListener('click', (e) => {
   if (e.target.classList.contains('searchresoultbtn')) {
     const productId = parseInt(e.target.dataset.id);
     const product = allproducts.find((product) => product.id === productId);
     cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
     localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML));
     addSearchResoultToCart(product);
     counterFunction();
   }
 })
 
 
 /// add tocart 
 const addSearchResoultToCart = (product) => {
   const carts = JSON.parse(localStorage.getItem('carts'))
   const existingProduct =  carts.find((item) => item.id === product.id)
   if(existingProduct) {
     existingProduct.quantity += 1;
   } else {
     carts.push({...product, quantity: 1 });
   }
   localStorage.setItem('carts', JSON.stringify(carts))
   counterFunction();
 }
 }
 searchBarFunction()
 
 
 
 
 
 //// dropdown filter btns 
 const dropDownFilterBtnsFunction = () => {
 
 const filterBtns = document.querySelectorAll('.filter-btn')

 const allproducts = [...dealwatches, ...dealArmBand, ...dealRings, ...bestSeller, ...products];

 const dropDownresultsWrapper = document.querySelector('.dropDownResoultWraper');
 const dropDownResoultContainer = document.querySelector('.dropDownResoultContainer');
 const searchResultContainer = document.querySelector('.searchResoultConteiner');
 const detailsContainer = document.querySelector('.details-container');
 const relatedProductsContainer = document.querySelector('.relatedProductsContainer');

 
 filterBtns.forEach((btn) => {
   btn.addEventListener('click', (e) => {
     const category = e.target.dataset.id.toLowerCase();
 
     
     if ( category === '' ) {
       dropDownresultsWrapper.innerHTML = '';
       dropDownResoultContainer.style.display = 'none';
       detailsContainer.style.display = 'flex';
       relatedProductsContainer.style.display = 'flex';
       return;
       
     } else {
       dropDownResoultContainer.style.display = 'flex';
       searchResultContainer.style.display = 'none';
       detailsContainer.style.display = 'none';
       relatedProductsContainer.style.display = 'none';
       
       const filteredProducts = allproducts.filter((product) => 
       product.category.toLowerCase() === category);
       
       dropDownresultsWrapper.innerHTML = filteredProducts.map((item) => {
         const percentHTML = item.percent ? `<span class="discount">${item.percent}</span>` : '';
         return `
         <div class="dropDownResoultItem">
         <a href="/html/detail.html?id=${item.id}">
             <img src="${item.image}" alt="${item.name}">
           </a>
           <h2>${item.name}</h2>
           <p>${item.price}</p>
           ${percentHTML}
           <button type="button" data-id="${item.id}" class="addDropDownItemToCartBtn">Add to Cart</button>
         </div>
         `
       }).join("")
       dropDownresultsWrapper.style.display = 'grid';
     }
   })
 })
 
 
 /// adding entlistner to filter btns 
 cartCounter.innerHTML = 0;
 dropDownresultsWrapper.addEventListener('click', (e) => {
   if (e.target.classList.contains('addDropDownItemToCartBtn')) {
     const dropedproductId = parseInt(e.target.dataset.id)
     const dropedProduct = allproducts.find((product) => product.id === dropedproductId);
     cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
     localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML));
     addDropDownItemToCart(dropedProduct);
     counterFunction();
   }
 })
 
 
 // add it to carts 
 const addDropDownItemToCart = (product) => {
   const carts = JSON.parse(localStorage.getItem('carts'))
   const existingProduct =  carts.find((item) => item.id === product.id)
   if(existingProduct) {
     existingProduct.quantity += 1;
   } else {
     carts.push({...product, quantity: 1 });
   }
   localStorage.setItem('carts', JSON.stringify(carts))
   counterFunction();
 }
 }
 dropDownFilterBtnsFunction()
 



//// update cartCounter 
const counterFunction = () => {
 const cartCounter = document.querySelector('.counter');
 const updateCounter = () => {
   const carts = JSON.parse(localStorage.getItem('carts')) || [];
   let totalQuantity = 0;
   carts.forEach((item) => {
     totalQuantity += item.quantity;
   });
   cartCounter.innerHTML = totalQuantity;
   localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
 }
 updateCounter();
}

counterFunction()