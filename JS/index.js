// import array 
import { mainSecPicArray } from '../Array/mainSection.js'
import { dealwatches } from '../Array/dealwatchs.js';
import { dealArmBand } from '../Array/dealArmBand.js';
import { dealRings } from '../Array/dealRings.js';
import { bestSeller } from '../Array/bestseller.js';
import { products } from '../Array/products.js';



/// showing witch link is active
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
  });
});


 // main section pic
 const mainSecPic = document.querySelector('.img');
 let currentImage = 0;

 setInterval(() => {
   currentImage++;
   if (currentImage >= mainSecPicArray.length) {
     currentImage = 0;
   }
   mainSecPic.src = mainSecPicArray[currentImage].image;
   mainSecPic.alt = mainSecPicArray[currentImage].alt;
 }, 1000);



 //// side slide menuuu 
 const menuIcon = document.querySelector('.bx-menu')
 const sideMenu = document.querySelector('.side-menu')

 menuIcon.addEventListener('click', () => {
   sideMenu.classList.toggle('active')
   menuIcon.classList.toggle('bx-x')
 })


/// countDown 
const countDounFunction = () => {
const monthEl = document.querySelector('.month');
const dayEl = document.querySelector('.day');
const hourEl = document.querySelector('.hour');
const minutesEl = document.querySelector('.minutes');
const secondEl = document.querySelector('.second');

const dealEnd = new Date('Dec 30, 2025 20:50:00').getTime();

const countDown = () => {
  const now = new Date().getTime();
  const distance = dealEnd - now;
  
  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  const month = day * 30.44; 

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const mo = Math.floor(distance / month);
  const d = Math.floor((distance % month) / day);
  const h = Math.floor((distance % day) / hour);
  const m = Math.floor((distance % hour) / min);
  const s = Math.floor((distance % min) / sec);
  
  const currentMonth = new Date().getMonth();
  const targetMonthIndex = (currentMonth + mo) % 12;
  const targetMonth = months[targetMonthIndex];

  monthEl.innerHTML = targetMonth;
  dayEl.innerHTML = d > 9 ? d : `${d}`;
  hourEl.innerHTML = h > 9 ? h : `${h}`;
  minutesEl.innerHTML = m > 9 ? m : `${m}`;
  secondEl.innerHTML = s > 9 ? s : `${s}`;

  setTimeout(countDown, 1000);
};
countDown();




/// year under count down 
const year =  document.querySelector('.year')
year.innerHTML = new Date().getFullYear()

//// main section slide pictures 
const img = document.querySelector('.img')
const percent = document.querySelector('.percent')

let currentImage = 0;

setInterval(() => {
  currentImage++;
  if (currentImage >= mainSecPicArray.length) {
    currentImage = 0;
  }
  img.src = mainSecPicArray[currentImage].image;
  percent.innerHTML = mainSecPicArray[currentImage].percent
}, 3000)
}
countDounFunction()




//// counter document
const cartCounter = document.querySelector('.counter');


//// search engin 
const searchBarFunction = () => {
const allproducts = [...dealwatches, ...dealArmBand, ...dealRings, ...bestSeller, ...products];
const searchInput = document.getElementById('searchInput');
const searchresultsWrapper = document.querySelector('.searchResoultWraper');
const searchResultContainer = document.querySelector('.searchResoultConteiner');
const mainSectionContainer = document.querySelector('.mainSectionContainer');
const dealOfWeekIntro = document.querySelector('.dealOfWeekIntro');
const WatchesContainer = document.querySelector('.Watches-container');
const armbindContainer = document.querySelector('.armbind-container');
const ringContainer = document.querySelector('.ring-container');
const bestsellerContainer = document.querySelector('.bestseller-container');
const ourproductContainer = document.querySelector('.ourproduct-container');
const dropDownResoultContainer = document.querySelector('.dropDownResoultContainer');
const aboutContainer = document.querySelector('.aboutContainer');
const blogContainer = document.querySelector('.blogContainer');
const ourservicess = document.querySelector('.ourservicess');
const contactContainer = document.querySelector('.contactContainer');
const footerContainer = document.querySelector('.footerContainer');


searchInput.addEventListener('keyup', (e) => {
    const searchValue = searchInput.value.toLowerCase();

    if(searchValue === '') {
      searchresultsWrapper.innerHTML = '';
      mainSectionContainer.style.display = 'flex';
      dealOfWeekIntro.style.display = 'flex';
      WatchesContainer.style.display = 'flex';
      armbindContainer.style.display = 'flex';
      ringContainer.style.display = 'flex';
      bestsellerContainer.style.display = 'flex';
      ourproductContainer.style.display = 'flex';
      searchResultContainer.style.display = 'none';
      aboutContainer.style.display = 'flex';
      blogContainer.style.display = 'flex';
      ourservicess.style.display = 'flex';
      contactContainer.style.display = 'flex';
      footerContainer.style.display = 'flex';
      return;
    } else {
      searchResultContainer.style.display = 'flex';
      mainSectionContainer.style.display = 'none';
      dealOfWeekIntro.style.display = 'none';
      WatchesContainer.style.display = 'none';
      armbindContainer.style.display = 'none';
      ringContainer.style.display = 'none';
      bestsellerContainer.style.display = 'none';
      ourproductContainer.style.display = 'none';
      dropDownResoultContainer.style.display = 'none';
      aboutContainer.style.display = 'none';
      blogContainer.style.display = 'none';
      ourservicess.style.display = 'none';
      contactContainer.style.display = 'none';
      footerContainer.style.display = 'none';
      
      
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
const mainSectionContainer = document.querySelector('.mainSectionContainer');
const dealOfWeekIntro = document.querySelector('.dealOfWeekIntro');
const WatchesContainer = document.querySelector('.Watches-container');
const armbindContainer = document.querySelector('.armbind-container');
const ringContainer = document.querySelector('.ring-container');
const bestsellerContainer = document.querySelector('.bestseller-container');
const ourproductContainer = document.querySelector('.ourproduct-container');
const dropDownresultsWrapper = document.querySelector('.dropDownResoultWraper');
const dropDownResoultContainer = document.querySelector('.dropDownResoultContainer');
const searchResultContainer = document.querySelector('.searchResoultConteiner');
const aboutContainer = document.querySelector('.aboutContainer');
const blogContainer = document.querySelector('.blogContainer');
const ourservicess = document.querySelector('.ourservicess');
const contactContainer = document.querySelector('.contactContainer');
const footerContainer = document.querySelector('.footerContainer');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const category = e.target.dataset.id.toLowerCase();

    
    if ( category === '' ) {
      dropDownresultsWrapper.innerHTML = '';
      mainSectionContainer.style.display = 'flex';
      dealOfWeekIntro.style.display = 'flex';
      WatchesContainer.style.display = 'flex';
      armbindContainer.style.display = 'flex';
      ringContainer.style.display = 'flex';
      bestsellerContainer.style.display = 'flex';
      ourproductContainer.style.display = 'flex';
      aboutContainer.style.display = 'flex'; 
      blogContainer.style.display = 'flex';
      ourservicess.style.display = 'flex';
      contactContainer.style.display = 'flex';
      footerContainer.style.display = 'flex';
      dropDownResoultContainer.style.display = 'none';
      return;
      
    } else {
      mainSectionContainer.style.display = 'none';
      dealOfWeekIntro.style.display = 'none';
      WatchesContainer.style.display = 'none';
      armbindContainer.style.display = 'none';
      ringContainer.style.display = 'none';
      bestsellerContainer.style.display = 'none';
      ourproductContainer.style.display = 'none';
      dropDownResoultContainer.style.display = 'flex';
      searchResultContainer.style.display = 'none';
      aboutContainer.style.display = 'none';
      blogContainer.style.display = 'none';
      ourservicess.style.display = 'none';
      contactContainer.style.display = 'none';
      footerContainer.style.display = 'none';

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





//// displaying bestseller 
const bestsellerFunction = () => {
  const bestsellerWraper = document.querySelector('.bestseller-wraper')
  const displayBestSeller = () => {
    let displayBestselers = bestSeller.map((best) => {
      return `
      <div class="bestseller-item">
          <a href="/html/detail.html?id=${best.id}">
            <img src="${best.image}" alt="${best.name}">
          </a>
            <h3>${best.name}</h3>
            <p>${best.price}</p>
            <button type="button" data-id="${best.id}" class="addBestsellerBtn">Add to Cart</button>
          </div>
      `
    }).join("")
    bestsellerWraper.innerHTML = displayBestselers;
  }

  displayBestSeller();

  //// adding event lister to btns
  cartCounter.innerHTML = 0;
  bestsellerWraper.addEventListener('click', (e) => {
    if (e.target.classList.contains('addBestsellerBtn')) {
      const bestSellerId = parseInt(e.target.dataset.id)
      const bestSellerProduct = bestSeller.find((best) => best.id === bestSellerId)
      cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
      localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML))
      addBestSellerToCart(bestSellerProduct);
      counterFunction();
    }
  })
  
  
  //// add bestseller to cart
  const addBestSellerToCart = (bestSellerProduct) => {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    const existingProduct = carts.find((item) => item.id === bestSellerProduct.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      carts.push({...bestSellerProduct, quantity: 1 });
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    counterFunction();
  }
}
bestsellerFunction();





//// displaying ourproducts 
const ourProductsFunction = () =>  {

  const ourproductWraper = document.querySelector('.ourproduct-wraper')
  const displayproduct = () => {
  let displayProducts = products.map((product) => {
    return `
    <div class="ourproduct-item">
          <a href="/html/detail.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}">
          </a>
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button type="button" data-id="${product.id}" class="addOurproductBtn">Add to Cart</button>
          </div>
    `
  }).join("")
  ourproductWraper.innerHTML = displayProducts;
}

displayproduct();

// adding event lidtner to btns 
cartCounter.innerHTML = 0;
ourproductWraper.addEventListener('click', (e) => {
  if (e.target.classList.contains('addOurproductBtn')) {
    const productId = parseInt(e.target.dataset.id)
    const product = products.find((product) => product.id === productId)
    cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + 1;
    localStorage.setItem('totalQuantity', JSON.stringify(cartCounter.innerHTML))
    addProductToCart(product);
    counterFunction();
  }
})


//// add product to cart
const addProductToCart = (product) => {
  const carts = JSON.parse(localStorage.getItem('carts')) || [];
  const existingProduct = carts.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    carts.push({...product, quantity: 1 });
  }
  localStorage.setItem('carts', JSON.stringify(carts));
  counterFunction();
}
}
ourProductsFunction();





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








/// for the about section slide 
const aboutItem1 = document.querySelector('.aboutItem1');
const aboutItem2 = document.querySelector('.aboutItem2');
const aboutNavLink = document.querySelector('#About');

const slideIn = () => {
  const aboutItem1Top = aboutItem1.getBoundingClientRect().top;
  const aboutItem2Top = aboutItem2.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (aboutItem1Top - screenHeight <= 0) {
    aboutItem1.classList.add('active');
  } else {
    aboutItem1.classList.remove('active');
  }

  if (aboutItem2Top - screenHeight <= 0) {
    aboutItem2.classList.add('active');
  } else {
    aboutItem2.classList.remove('active');
  }
}

window.addEventListener('scroll', slideIn);

slideIn();

///// also happen when the navbar clicked 
aboutNavLink.addEventListener('click', () => {
  aboutItem1.classList.add('active');
  aboutItem2.classList.add('active');
});


//// for scroll to top 
const scrollUpArrow = document.querySelector('.bx-up-arrow-alt');

scrollUpArrow.style.display = 'none'; 

window.addEventListener('scroll', () => {
  if (window.scrollY >= 300) {
    scrollUpArrow.style.display = 'block';
  } else {
    scrollUpArrow.style.display = 'none';
  }
});

scrollUpArrow.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

