let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem('data')) || [];
items=shopItemsData;

let generateShop = () => {
  return (shop.innerHTML = items
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img width="226" src=${img} alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>
            ${desc}
          </p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-file-minus"></i>
              <div id=${id} class="quntity">${
        search.item === undefined ? 0 : search.item
      }</div>
              <i onclick="increment(${id})" class="bi bi-file-plus"></i>
            </div>
          </div>
        </div>
      </div>
  
    `;
    })
    .join(''));
};
generateShop();

/**
 * ! increment
 **/

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem.id);

  localStorage.setItem('data', JSON.stringify(basket));
};

/**
 * ! decrement
 **/
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);

  basket = basket.filter((x) => x.tiem !== 0);

  // console.log(basket);

  localStorage.setItem('data', JSON.stringify(basket));
};

/**
 * ! update
 **/
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/**
 * ! calculation cartQuantity
 **/

let calculation = () => {
  let cartIcon = document.getElementById('cartQuantity');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let search = (keyword) => {
  if(keyword){
      keyword = keyword.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(keyword));
    }else{
      items=shopItemsData;
    }
    generateShop();
}