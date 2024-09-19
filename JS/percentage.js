///Import array 
import { dealwatches } from "../Array/dealwatchs.js";
import { dealArmBand } from "../Array/dealArmBand.js";
import { dealRings } from "../Array/dealRings.js"


//// counter document
const cartCounter = document.querySelector('.counter');


//// search engin 
const searchBarFunction = () => {
const allproducts = [...dealwatches, ...dealArmBand, ...dealRings];
const searchInput = document.getElementById('searchInput');
const searchresultsWrapper = document.querySelector('.searchResoultWraper');
const searchResultContainer = document.querySelector('.searchResoultConteiner');
const dealOfWeekIntro = document.querySelector('.dealOfWeekIntro');
const WatchesContainer = document.querySelector('.Watches-container');
const armbindContainer = document.querySelector('.armbind-container');
const ringContainer = document.querySelector('.ring-container');
const dropDownResoultContainer = document.querySelector('.dropDownResoultContainer');


searchInput.addEventListener('keyup', (e) => {
    const searchValue = searchInput.value.toLowerCase();

    if(searchValue === '') {
      searchresultsWrapper.innerHTML = '';
      dealOfWeekIntro.style.display = 'flex';
      WatchesContainer.style.display = 'flex';
      armbindContainer.style.display = 'flex';
      ringContainer.style.display = 'flex';
      searchResultContainer.style.display = 'none';
      return;
    } else {
      searchResultContainer.style.display = 'flex';
      dealOfWeekIntro.style.display = 'none';
      WatchesContainer.style.display = 'none';
      armbindContainer.style.display = 'none';
      ringContainer.style.display = 'none';
      dropDownResoultContainer.style.display = 'none';
      
      
      const searchedProducts = allproducts.filter((product) => 
        product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue));
    
      searchresultsWrapper.innerHTML = searchedProducts.map((product) => {
      return `
      <div class="searchResoultItem">
      <a href="/html/detail.html?id=${product.id}">
      <img src="${product.image}" alt="${product.name}">
      </a>
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <span class="discount">${product.percent}</span>
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
const allproducts = [...dealwatches, ...dealArmBand, ...dealRings];
const dealOfWeekIntro = document.querySelector('.dealOfWeekIntro');
const WatchesContainer = document.querySelector('.Watches-container');
const armbindContainer = document.querySelector('.armbind-container');
const ringContainer = document.querySelector('.ring-container');
const dropDownresultsWrapper = document.querySelector('.dropDownResoultWraper');
const dropDownResoultContainer = document.querySelector('.dropDownResoultContainer');
const searchResultContainer = document.querySelector('.searchResoultConteiner');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const category = e.target.dataset.id.toLowerCase();

    
    if ( category === '' ) {
      dropDownresultsWrapper.innerHTML = '';
      dealOfWeekIntro.style.display = 'flex';
      WatchesContainer.style.display = 'flex';
      armbindContainer.style.display = 'flex';
      ringContainer.style.display = 'flex';
      dropDownResoultContainer.style.display = 'none';
      return;
      
    } else {
      dealOfWeekIntro.style.display = 'none';
      WatchesContainer.style.display = 'none';
      armbindContainer.style.display = 'none';
      ringContainer.style.display = 'none';
      dropDownResoultContainer.style.display = 'flex';
      searchResultContainer.style.display = 'none';
      
      const filteredProducts = allproducts.filter((product) => 
      product.category.toLowerCase() === category);
      
      dropDownresultsWrapper.innerHTML = filteredProducts.map((item) => {
        return `
        <div class="dropDownResoultItem">
        <a href="/html/detail.html?id=${item.id}">
            <img src="${item.image}" alt="${item.name}">
          </a>
          <h2>${item.name}</h2>
          <p>${item.price}</p>
          <span class="discount">${item.percent}</span>
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





// displaying and add watchs to cart 
const watchesFunction = () => {
  const watchesWraper = document.querySelector('.Watches-wraper');
  const displayWatches = () => {
    watchesWraper.innerHTML = '';
    let diplaywatch = dealwatches.map((watch) => {
      return `
       <div class="Watch-item">
          <a href="/html/detail.html?id=${watch.id}">
            <img src="${watch.image}" alt="${watch.name}">
          </a>
            <h3>${watch.name}</h3>
            <p>${watch.price}</p>
            <span>${watch.percent}</span>
            <button type="button" data-id="${watch.id}" class="addWatchBtn">Add to Cart</button>
          </div>
      `
    }).join("")
    watchesWraper.innerHTML = diplaywatch;
  }

  displayWatches();

  ///// ading event listner to btns 
  cartCounter.innerHTML = 0;
  watchesWraper.addEventListener('click', (e) => {
    if (e.target.classList.contains('addWatchBtn')) {
      const watchId = parseInt(e.target.dataset.id);
      const watch = dealwatches.find((watch) => watch.id === watchId);
        cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
        localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML));
        addWatchToCart(watch);
        counterFunction();
        
      }
  })
  
  
  //// add watches to cart  
  const addWatchToCart = (watch) => {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    const existingProduct = carts.find((item) => item.id === watch.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      carts.push({...watch, quantity: 1 });
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    counterFunction();
  }
}
watchesFunction()





// display armband 
const armbandFunction = () => {
  const armbandWraper = document.querySelector('.armBinde-wraper') 
  const displayArmBand = () => {
    armbandWraper.innerHTML = ''; 
   let displayArmband = dealArmBand.map((armBand) => {
    return `
      <div class="armbind-item">
        <a href="/html/detail.html?id=${armBand.id}">
          <img src=${armBand.image} alt=${armBand.name}>
        </a>
        <h3>${armBand.name}</h3>
        <p>${armBand.price}</p>
        <span>${armBand.percent}</span>
        <button type="button" data-id=${armBand.id} class="addArmBandBtn">Add to Cart</button>
      </div>
    `
   }).join("")
   armbandWraper.innerHTML = displayArmband;
  }

  displayArmBand();

  /// adding event listner to btns 
  cartCounter.innerHTML = 0;
  armbandWraper.addEventListener('click', (e) => {
    if (e.target.classList.contains('addArmBandBtn')) {
      const armBandId = parseInt(e.target.dataset.id)
      const armBand = dealArmBand.find((armBand) => armBand.id === armBandId)
      cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
      localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML));
      addArmBandToCart(armBand);
      counterFunction();
    }
  })
  
  
  /// add armband to cart  
  const addArmBandToCart = (armBand) => {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    const existingProduct = carts.find((item) => item.id === armBand.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      carts.push({...armBand, quantity: 1 });
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    counterFunction();
  }
}
armbandFunction();





///// display rings 
const ringFunction = () => { 
  const ringWraper = document.querySelector('.ring-wraper')
  const displayRings = () => {
    ringWraper.innerHTML = '';
    let displayRing = dealRings.map((ring) => {
      return `
      <div class="ring-item">
      <a href="/html/detail.html?id=${ring.id}">
        <img src="${ring.image}" alt="${ring.name}">
         </a>
            <h3>${ring.name}</h3>
            <p>${ring.price}</p>
            <span>${ring.percent}</span>
            <button type="button" data-id="${ring.id}" class="addRingBtn">Add to Cart</button>
            </div>
      `;
    }).join("")
    ringWraper.innerHTML = displayRing;
  }

  displayRings();

  //// adding eventlister to btns 
  cartCounter.innerHTML = 0;
  ringWraper.addEventListener('click', (e) => {
    if (e.target.classList.contains('addRingBtn')) {
      const ringId = parseInt(e.target.dataset.id);
      const ring = dealRings.find((ring) => ring.id === ringId);
        cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
        localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML));
        addRingToCart(ring);
        counterFunction();
    }
  })
  

  /// add rings to cart
  const addRingToCart = (ring) => {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const existingProduct = carts.find((item) => item.id === ring.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    carts.push({...ring, quantity: 1 });
  }
  localStorage.setItem('carts', JSON.stringify(carts));
  counterFunction();
}
}
ringFunction()





//// update cartCounter 
const counterFunction = () => {
 const updateCounter = () => {
   const cartCounter = document.querySelector('.counter');
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