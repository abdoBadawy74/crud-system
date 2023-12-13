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

let mood = "create";

let tmp;
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
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // check data
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood === "create") {
      // count
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          // add product to array
          dataPros.push(newpro);
        }
      } else {
        dataPros.push(newpro);
      }
    } else {
      dataPros[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }

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
  getTotal();

  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < dataPros.length; i++) {
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
        <td><button id="update" onclick="updateData(${i})">Update</button></td>
        <td><button id="delete" onclick="deletePro(${i})">Delete</button></td>
        </tr>
  `;
  }

  let deleteAllBtn = document.getElementById("deleteAll");

  if (dataPros.length > 0) {
    deleteAllBtn.innerHTML = `
    <button onclick="deleteAll()">Delete All (${dataPros.length})</button>
    `;
  } else {
    deleteAllBtn.innerHTML = "";
  }
}

submit.addEventListener("click", display);
display();

// delete product

function deletePro(i) {
  dataPros.splice(i, 1);
  localStorage.product = JSON.stringify(dataPros);
  display();
}

// delete all products

function deleteAll() {
  localStorage.clear();
  dataPros.splice(0);
  display();
}

// update

function updateData(i) {
  tmp = i;
  title.value = dataPros[i].title;
  price.value = dataPros[i].price;
  taxes.value = dataPros[i].taxes;
  ads.value = dataPros[i].ads;
  discount.value = dataPros[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPros[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search

let moodSearch = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    moodSearch = "title";
  } else {
    moodSearch = "category";
  }
  search.placeholder = "Search By " + moodSearch;
  search.focus();
  search.value = "";
  display();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPros.length; i++) {
    if (moodSearch == "title") {
      if (dataPros[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${dataPros[i].title}</td>
          <td>${dataPros[i].price}</td>
          <td>${dataPros[i].taxes}</td>
          <td>${dataPros[i].ads}</td>
          <td>${dataPros[i].discount}</td>
          <td>${dataPros[i].total}</td>
          <td>${dataPros[i].category}</td>
          <td><button id="update" onclick="updateData(${i})">Update</button></td>
          <td><button id="delete" onclick="deletePro(${i})">Delete</button></td>
        </tr>
`;
      }
    } else {
      if (dataPros[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${dataPros[i].title}</td>
          <td>${dataPros[i].price}</td>
          <td>${dataPros[i].taxes}</td>
          <td>${dataPros[i].ads}</td>
          <td>${dataPros[i].discount}</td>
          <td>${dataPros[i].total}</td>
          <td>${dataPros[i].category}</td>
          <td><button id="update" onclick="updateData(${i})">Update</button></td>
          <td><button id="delete" onclick="deletePro(${i})">Delete</button></td>
        </tr>
`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean data
