import { menuArray } from "./data.js";
const menu = document.querySelector(".menu");
const main = document.querySelector(".main");
let selectedMenuItems = [];

// EVENT LISTENERS
document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    const targetMenuObj = menuArray.filter(function (item) {
      return item.id === parseInt(e.target.dataset.id);
    });
    selectedMenuItems.push(targetMenuObj[0]);
    orderHtmlRender();
  } else if (e.target.classList.contains("hide-payment-btn")) {
    e.preventDefault();
    hidePayment();
  } else if (e.target.classList.contains("payment-btn")) {
    e.preventDefault();
    if (document.querySelector(".card-input").value) {
      hidePayment();
      showOrderCompletedText();
    }
  } else if (e.target && e.target.matches('button[id^="remove-btn-"]')) {
    const id = parseInt(e.target.id.split("-")[2]);
    removeItem(id);
  } else if (e.target.classList.contains("complete-order-btn")) {
    if (selectedMenuItems[0]) {
      showPayment();
    }
  }
});

// FUNCTIONS

//MENU RENDER
function menuHtmlRender() {
  menuArray.forEach((item) => {
    const { name, ingredients, price, img, id } = item;
    const html = `<div class="menu-item"><div class="image-container">
            <img src="${img}" alt="${name}" class="menu-item-img">
            </div>
            <div class="menu-item-info">
                <h3 class="menu-item-name">${name}</h3>
                <p class="menu-item-ingredients">${ingredients}</p>
                <p class="menu-item-price">$${price}</p>
            </div>
                <button class="menu-item-btn" data-id="${id}">+</button>
            
        </div>`;
    menu.innerHTML += html;
  });
}
menuHtmlRender();

//PAYMENT RENDER
function showPayment() {
  const payment = document.querySelector(".payment");
  payment.classList.add("show-payment");
  main.classList.add("pointer-events-none");
}

function hidePayment() {
  const payment = document.querySelector(".payment");
  payment.classList.remove("show-payment");
  main.classList.remove("pointer-events-none");
}

//ORDER COMPLETED RENDER
function showOrderCompletedText() {
  const orderCompleted = document.querySelector(".order-completed");
  const cardHolderName = document.getElementById("card-holder-name").value;
  orderCompleted.innerHTML = `<p>Thank you ${cardHolderName} for your order!</p><p>Order details: ${selectedMenuItems.map(
    (item) => item.name
  )}</p><p>Total price: ${calculateTotalPrice()}</p>`;
  orderCompleted.classList.add("show-order-completed");
  setTimeout(function () {
    selectedMenuItems = [];
    orderHtmlRender();
  }, 1000);
}

//ORDER RENDER
function orderHtmlRender() {
  const order = document.querySelector(".order");
  order.innerHTML = "";
  selectedMenuItems.forEach(function (item) {
    const { name, price, id } = item;
    const html = `<div class="order-item">
                    <p>${name}
                        <button id="remove-btn-${id}">remove</button>
                    </p>
                    <p>${price}</p>
                  </div>`;
    order.innerHTML += html;
  });
  const orderTotal = document.querySelector(".order-total");
  orderTotal.innerHTML = `<p>Total price:</p><p>${calculateTotalPrice()}</p><button class="complete-order-btn">Complete order</button>`;
}

//CALCULATE TOTAL PRICE
function calculateTotalPrice() {
  let totalPrice = 0;
  selectedMenuItems.forEach(function (item) {
    totalPrice += item.price;
  });
  return totalPrice;
}

//REMOVE ITEM
function removeItem(id) {
  const index = selectedMenuItems.findIndex(function (item) {
    return item.id === id;
  });
  if (index !== -1) {
    selectedMenuItems.splice(index, 1);
  }
  orderHtmlRender();
}
