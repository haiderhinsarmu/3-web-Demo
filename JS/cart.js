let carts = JSON.parse(localStorage.getItem('carts')) || [];
let totalQuantity = JSON.parse(localStorage.getItem('totalQuantity')) || 0;
document.querySelector('.counter').innerHTML = totalQuantity;

// Display items in cart
const cartWrapper = document.querySelector('.cart-wraper');
if (typeof carts !== 'undefined' && cartWrapper !== null) {

  const displayCart = () => {
    cartWrapper.innerHTML = '';

    if (carts.length > 0) {
      carts.forEach((cart) => {
        const newCart = document.createElement('div');
        newCart.classList.add('cart-item');
        newCart.innerHTML = `
          <a href="/html/detail.html?id=${cart.id}">
            <div class="images">
              <img src="${cart.image}" alt="${cart.name}">
            </div>
          </a>
          <div class="name">
            <h3>${cart.name}</h3>
          </div>
          <div class="remove" data-id="${cart.id}">
            <i data-id="${cart.id}" class='bx bx-trash'></i>
          </div>
          <div class="price">
            <span>${cart.price}</span>
          </div>
          <div class="quantity-icons">
            <button data-id="${cart.id}" class="btn-minus">-</button>
            <p class="amount">${cart.quantity}</p>
            <button data-id="${cart.id}" class="btn-plus">+</button>
          </div>
        `;
        cartWrapper.appendChild(newCart);
      });
    } else {
      cartWrapper.innerHTML = `
      <div class="empty">
      <p>
      <i class='bx bxs-shopping-bag'></i>
      No items in your cart
      </p>
      </div>
      `;
    }
  };
  displayCart();

  //// revove from cart 
  cartWrapper.addEventListener('click', (e) => {
    if(e.target.classList.contains('bx-trash') ) {
      const itemId = parseInt(e.target.dataset.id);
      const cartItem = carts.find((item) => item.id === itemId)

      carts.forEach((item) => {

        if (item.id === itemId) {
          carts = carts.filter((item) => item.id!== itemId);
          totalQuantity -= cartItem.quantity;
        }

      })

      localStorage.setItem('carts', JSON.stringify(carts));
      localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
      document.querySelector('.counter').innerHTML = totalQuantity;
      displayCart();
      totalPrice();
    }
  })

  //// quantity ---
  cartWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-minus')) {
        const itemId = parseInt(e.target.dataset.id);
        const cartItem = carts.find((item) => item.id === itemId);

        carts.forEach((item) => {

          if (item.id === itemId && item.quantity > 1) {
            cartItem.quantity--;
            totalQuantity--;
            totalPrice();
          
          } else if (item.id === itemId && item.quantity === 1) {
            carts = carts.filter((item) => item.id !== itemId);
            totalQuantity--;
          }

        })
          
        localStorage.setItem('carts', JSON.stringify(carts));
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
        document.querySelector('.counter').innerHTML = totalQuantity;
        displayCart();
        totalPrice();
    }
});



 //// quantity++ 
 cartWrapper.addEventListener('click', (e) => {
  if(e.target.classList.contains('btn-plus')) {
    const itemId = parseInt(e.target.dataset.id)
    const cartItem = carts.find((item) => item.id === itemId)

    carts.forEach((item) => {

      if(item.id === itemId  && item.quantity > 0) {
        cartItem.quantity++;
        totalQuantity++;
      }

    })

    localStorage.setItem('carts', JSON.stringify(carts))
    localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
    document.querySelector('.counter').innerHTML = totalQuantity;
    displayCart();
    totalPrice();
  }
 })
}


///// calculate total price 
const totalPrice = () => {
  const total = document.querySelector('.total-price');
  let totalPrice = 0;
  carts.forEach((item) => {
    const price = parseFloat(item.price.replace('$', '').replace(/,/g, ''));
    if (!isNaN(price) && typeof item.quantity === 'number') {
      totalPrice += price * item.quantity;
    }
  });
  totalPrice = totalPrice.toFixed(2);
  total.innerHTML = `Total price: $${parseFloat(totalPrice).toLocaleString()}`;
  localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}
totalPrice()

//// creal all
const clearAll = () => {
  carts = [];
  totalQuantity = 0;
  localStorage.removeItem('carts');
  localStorage.removeItem('totalQuantity');
  localStorage.removeItem('totalPrice');
  document.querySelector('.counter').innerHTML = totalQuantity;
  const cartWrapper = document.querySelector('.cart-wraper');
  cartWrapper.innerHTML = `
    <div class="empty">
      <p>
      <i class='bx bxs-shopping-bag'></i>
      No items in your cart
      </p>
    </div>
  `;
  totalPrice();
}

const clear = document.querySelector('.clear-all-btn').addEventListener('click', clearAll)
