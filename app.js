// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

//Create list of products
var addProductDescription = (product, listElement) => {
    var spanProduct = document.createElement("span");
    var description = product.description + " - " + product.price + "€/ud."
    spanProduct.innerText = description;
    spanProduct.setAttribute("class", "productName");
    listElement.appendChild(spanProduct);
}

// Parte extra de la práctica
//Activar el botón si hay más de una unidad seleccionada y desactivar en caso contrario
var changeButtonStatus = () => {
    var totalUnits = 0;
    for (var product of products){
        totalUnits += product.units;
    }
    if (totalUnits > 0){
        document.getElementById("button-calculate").disabled = false;
    }
    else {
        document.getElementById("button-calculate").disabled = true; 
    }
}

var addInputUnits = (product, listElement) => {
    var inputUnits = document.createElement("input");
    inputUnits.setAttribute("type", "number");
    inputUnits.setAttribute("class", "inputUnits");
    inputUnits.setAttribute("width", "5");
    inputUnits.setAttribute("value", product.units);
    inputUnits.setAttribute("min", "0");
    inputUnits.setAttribute("max", product.stock);
    inputUnits.addEventListener("change", event => {
        product.units = parseInt(event.target.value);
        changeButtonStatus();
    });
    listElement.appendChild(inputUnits);
}


var addProduct = (product, productList) => {
    var listElement = document.createElement("li");
    addProductDescription(product, listElement);
    addInputUnits(product, listElement);
    productList.appendChild(listElement);
}

var displayProductList = () => {
    var productList = document.createElement("ol");
    productList.setAttribute("id", "productList");
    document.getElementById("product-list-container").appendChild(productList);
    for (var product of products){
        addProduct(product, document.getElementById("productList"));
    }
    changeButtonStatus();
}

//Calculate totals
var calculatePrice = () => {
    var subtotal = 0;
    var iva = 0;
    var total = 0;
    for (var product of products){
        subtotal += product.price * product.units;
        iva += product.price * product.units * product.tax / 100;
    }
    total = subtotal + iva;
    document.getElementById("subtotal").innerText = Number(subtotal.toFixed(3)) + " €";
    document.getElementById("iva").innerText = Number(iva.toFixed(3)) + " €";
    document.getElementById("total").innerText = Number(total.toFixed(2)) + " €";
}

//Main process
displayProductList();
document.getElementById("button-calculate").addEventListener("click", calculatePrice);
