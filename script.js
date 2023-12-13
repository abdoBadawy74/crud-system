// get total price
// create product
// save in local storage
// make inputs empty
// display product in table
// make count enable
// delete product
// update product
// search
// clean data

let title = document.getElementById("title");

let price = document.getElementById("price");

let taxes = document.getElementById("taxes");

let ads = document.getElementById("ads");

let discount = document.getElementById("discount");

let total = document.getElementById("total");

let count = document.getElementById("count");

let category = document.getElementById("category");

let submit = document.getElementById("submit");

// get total function

function getTotal() {
  if (price.value != "" && taxes.value != "" && ads.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// create product

let dataPros;

// check localStorage is empty or not
if (localStorage.product != null) {
  dataPros = JSON.parse(localStorage.product);
} else {
  dataPros = [];
}
// this step to remain data in localStorage after reload

submit.onclick = function () {
  // creating object to save all data of product.
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // add product to array
  dataPros.push(newpro);

  //   add array to local storage
  localStorage.setItem("product", JSON.stringify(dataPros));
};

// clear data in inputs

function clear() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

submit.addEventListener("click", clear);

// display product in table

function display() {
  let table = "";

  for (let i = 0; i < dataPros.length; i++) {
    table = dataPros[i];

    document.getElementById("tbody").innerHTML += `
  
        <tr>
        <td>${i}</td>
        <td>${dataPros[i].title}</td>
        <td>${dataPros[i].price}</td>
        <td>${dataPros[i].taxes}</td>
        <td>${dataPros[i].ads}</td>
        <td>${dataPros[i].discount}</td>
        <td>${dataPros[i].total}</td>
        <td>${dataPros[i].category}</td>
        <td><button id="update">Update</button></td>
        <td><button id="delete">Delete</button></td>
        </tr>
  `;
  }
}

submit.addEventListener("click", display);
display()