var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCat");
var productDesc = document.getElementById("description");
var productImage = document.getElementById("productImg");
var row = document.getElementById("row");
var searchProducts = document.getElementById("searchProducts");
var searchCategory = document.getElementById("searchCategory");
var addBotn = document.getElementById("botn-a");
var updateBotn = document.getElementById("botn-u");
var validNameError = document.getElementById("validNameError");
var validPriceError = document.getElementById("validPriceError");
var validCatError = document.getElementById("validCatError");
var validDesError = document.getElementById("validDesError");
var validDescError = document.getElementById("validDescError");
var emptyNameError = document.getElementById("emptyNameError");
var emptyPriceError = document.getElementById("emptyPriceError");
var emptyCatError = document.getElementById("emptyCatError");
var emptyDesError = document.getElementById("emptyDesError");

var catTerm;
var productTerm;
var globalIndex;
var productList;
if (localStorage.getItem("productList") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
  display(productList);
}

function addProduct() {
  if (
    handleEmptyNameError() &&
    handleEmptyPriceError() &&
    handleEmptyCatError() &&
    handleEmptyDesError()
  ) {
    if (
      validProductName() &&
      validProductPrice() &&
      validProductCat() &&
      validProductDes()
    ) {
      var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDesc.value,
        image: productImage.files[0].name,
      };
      productList.push(product);
      display(productList);
      clearInputs();
      saveToLocalStorage();
      productName.classList.remove("is-valid");
      productPrice.classList.remove("is-valid");
      productCategory.classList.remove("is-valid");
      productDesc.classList.remove("is-valid");
    } else {
      console.log("Validation Error");
    }
  } else {
    console.log("Validation Error");
  }
}

function display(productList) {
  if (productList.length) {
    var cartoona = "";
    for (var i = 0; i < productList.length; i++) {
      cartoona += `<div class="col-md-3 my-3 overflow-hidden">
            <img src="./images/${
              productList[i].image
            }" alt="" class="w-100 mb-3" />
            <p>Name : ${
              productTerm
                ? productList[i].name
                    .toLowerCase()
                    .replace(
                      productTerm,
                      `<span class="bg-warning fw-bold">${productTerm}</span>`
                    )
                : productList[i].name
            }</p>
            <p>Price : ${productList[i].price}</p>
            <p>Category : ${
              catTerm
                ? productList[i].category
                    .toLowerCase()
                    .replace(
                      catTerm,
                      `<span class="bg-warning fw-bold">${catTerm}</span>`
                    )
                : productList[i].category
            }</p>
            <p>Description : ${productList[i].description}</p>
            <button onclick="updateForm(${i})"  class="btn btn-outline-success w-100 mb-2">Update</button>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100">Delete</button>
          </div>`;
    }
    row.innerHTML = cartoona;
  } else {
    row.innerHTML = `<div
          id="not-match"
          class="alert alert-warning text-center text-capitalize fw-bold"
        >
          Not Match found
        </div>`;
  }
}

function clearInputs() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDesc.value = null;
  productImage.value = null;
}

function deleteProduct(i) {
  productList.splice(i, 1);
  display(productList);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("productList", JSON.stringify(productList));
}

function updateForm(i) {
  globalIndex = i;
  productName.value = productList[globalIndex].name;
  productPrice.value = productList[globalIndex].price;
  productCategory.value = productList[globalIndex].category;
  productDesc.value = productList[globalIndex].description;

  addBotn.classList.add("d-none");
  updateBotn.classList.remove("d-none");
  // remove valid and invalid classes
  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-invalid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-invalid");
  productCategory.classList.remove("is-valid");
  productDesc.classList.remove("is-invalid");
  productDesc.classList.remove("is-valid");

  // remove error messages
  validNameError.classList.add("d-none");
  validPriceError.classList.add("d-none");
  validCatError.classList.add("d-none");
  validDesError.classList.add("d-none");

  // remove empty error messages
  emptyNameError.classList.add("d-none");
  emptyPriceError.classList.add("d-none");
  emptyCatError.classList.add("d-none");
  emptyDesError.classList.add("d-none");
}

function setUpdate() {
  productList[globalIndex].name = productName.value;
  productList[globalIndex].price = productPrice.value;
  productList[globalIndex].category = productCategory.value;
  productList[globalIndex].description = productDesc.value;
  addBotn.classList.remove("d-none");
  updateBotn.classList.add("d-none");
  // remove valid and invalid classes
  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-invalid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-invalid");
  productCategory.classList.remove("is-valid");
  productDesc.classList.remove("is-invalid");
  productDesc.classList.remove("is-valid");

  // remove error messages
  validNameError.classList.add("d-none");
  validPriceError.classList.add("d-none");
  validCatError.classList.add("d-none");
  validDesError.classList.add("d-none");

  // remove empty error messages
  emptyNameError.classList.add("d-none");
  emptyPriceError.classList.add("d-none");
  emptyCatError.classList.add("d-none");
  emptyDesError.classList.add("d-none");
  saveToLocalStorage();
  display(productList);
  clearInputs();
}

function searchProduct() {
  var searchList = [];
  productTerm = searchProducts.value;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(productTerm.toLowerCase())) {
      searchList.push(productList[i]);
    } else {
    }
  }
  display(searchList);
}

function searchCat() {
  var searchList = [];
  catTerm = searchCategory.value;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].category.toLowerCase().includes(catTerm.toLowerCase())) {
      searchList.push(productList[i]);
    } else {
    }
  }
  display(searchList);
}

// Validation functions

function validProductName() {
  var regex = /^[A-Z][a-z]{3,9}$/;
  if (regex.test(productName.value)) {
    console.log("match");
    validNameError.classList.add("d-none");
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    emptyNameError.classList.add("d-none");

    return true;
  } else {
    console.log("NOt Match");
    validNameError.classList.remove("d-none");
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    emptyNameError.classList.add("d-none");
    return false;
  }
}

function validProductPrice() {
  var regex = /^([1-7][0-9]{4}|80000)$/;
  if (regex.test(productPrice.value)) {
    console.log("match");
    validPriceError.classList.add("d-none");
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    emptyPriceError.classList.add("d-none");
    return true;
  } else {
    console.log("NOt Match");
    validPriceError.classList.remove("d-none");
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    emptyPriceError.classList.add("d-none");
    return false;
  }
}

function validProductCat() {
  var regex = /^electronics|tv|phone|tablet$/;
  if (regex.test(productCategory.value.toLowerCase())) {
    console.log("match");
    validCatError.classList.add("d-none");
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid");
    emptyCatError.classList.add("d-none");

    return true;
  } else {
    console.log("NOt Match");
    validCatError.classList.remove("d-none");
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    emptyCatError.classList.add("d-none");
    return false;
  }
}
function validProductDes() {
  var regex = /^.{10,100}$/;
  if (regex.test(productDesc.value)) {
    console.log("match");
    validDesError.classList.add("d-none");
    validDescError.classList.add("d-none");
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");
    emptyDesError.classList.add("d-none");

    return true;
  } else {
    if (productDesc.value.length < 10) {
      console.log("NOt Match");
      validDesError.classList.remove("d-none");
      validDescError.classList.add("d-none");
      productDesc.classList.add("is-invalid");
      productDesc.classList.remove("is-valid");
      emptyDesError.classList.add("d-none");
    } else if (productDesc.value.length > 100) {
      console.log("NOt Match");
      validDescError.classList.remove("d-none");
      validDesError.classList.add("d-none");
      productDesc.classList.add("is-invalid");
      productDesc.classList.remove("is-valid");
      emptyDesError.classList.add("d-none");
    }
    return false;
  }
}

// Empty Functions

function handleEmptyNameError() {
  if (productName.value === "") {
    emptyNameError.classList.replace("d-none", "d-block");
    validNameError.classList.add("d-none");
    return false;
  } else {
    emptyNameError.classList.add("d-none");
    return true;
  }
}
function handleEmptyPriceError() {
  if (productPrice.value === "") {
    emptyPriceError.classList.replace("d-none", "d-block");
    validPriceError.classList.add("d-none");
    return false;
  } else {
    emptyPriceError.classList.add("d-none");
    return true;
  }
}
function handleEmptyCatError() {
  if (productCategory.value === "") {
    emptyCatError.classList.replace("d-none", "d-block");
    validCatError.classList.add("d-none");
    return false;
  } else {
    emptyCatError.classList.add("d-none");
    return true;
  }
}
function handleEmptyDesError() {
  if (productDesc.value === "") {
    emptyDesError.classList.replace("d-none", "d-block");
    validDesError.classList.add("d-none");
    validDescError.classList.add("d-none");
    return false;
  } else {
    emptyDesError.classList.add("d-none");
    return true;
  }
}
