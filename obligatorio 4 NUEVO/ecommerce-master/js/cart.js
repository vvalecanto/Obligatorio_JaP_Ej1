let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

let productCost = 0;
let productCount = 0;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let SUCCESS_MSG = "¡Se ha realizado la compra con éxito! :)";

let creditCardPaymentRadio = document.getElementById('creditCardPaymentRadio')
let bankingRadio = document.getElementById('bankingRadio')
let numTarjeta = document.getElementById('creditCardNumber')
let numSeguridad = document.getElementById('creditCardSecurityCode')
let dueDate = document.getElementById('dueDate')
let bankAccountBranch = document.getElementById('bankAccountBranch')
let bankAccountNumber = document.getElementById('bankAccountNumber')


//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts() {
    let unitProductCostHTML = document.getElementById("productCostText");
    let shippingCostHTML = document.getElementById("shippingText");
    let totalCostHTML = document.getElementById("totalCostText");

    let unitCostToShow = MONEY_SYMBOL + subtotal;
    let shippingToShow = Math.round(shippingPercentage * subtotal);
    let totalCostToShow = MONEY_SYMBOL + (Math.round(subtotal + shippingToShow));

    unitProductCostHTML.innerHTML = unitCostToShow;
    shippingCostHTML.innerHTML = shippingToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

function updateSubtotal() {
    let prodCountElement = document.getElementById("prodCount");
    let prodCountNumber = parseInt(prodCountElement.value);
    subtotal = productUnitCost * prodCountNumber;

    document.getElementById("productCostText").innerHTML = subtotal;
}

document.addEventListener("DOMContentLoaded", function () {
    let paymentForm = document.getElementById("payment-form")

    paymentForm.addEventListener("submit", function (evento) {
        evento.preventDefault()
        $("#contidionsModal").modal("hide")
    })
})

function paymentChoice() {
    if (creditCardPaymentRadio.checked) {
        numTarjeta.disabled = false;
        numSeguridad.disabled = false;
        dueDate.disabled = false;
        bankAccountBranch.disabled = true;
        bankAccountNumber.disabled = true;
    } else {
        numTarjeta.disabled = true;
        numSeguridad.disabled = true;
        dueDate.disabled = true;
        bankAccountBranch.disabled = false;
        bankAccountNumber.disabled = false;
    }
}

creditCardPaymentRadio.addEventListener('change', paymentChoice)
bankingRadio.addEventListener('change', paymentChoice)


function showArticles(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item-action">
            <div class="row">
                <div class="col-2">
                    <img src="${product.src}" class="img-thumbnail" />
                </div>
                <div class="col">
                    <p class="lead">${product.name}</p>
                    <p> Costo Unitario: ${product.unitCost} ${product.currency}</p>
                </div>
                <div class="col-2">
                    <input class="form-control" type="number" id="prodCount" placeholder="" value="${product.count}">
                </div>
                <div class="col">
                    <p class="pt-2">articulos</p>
                </div>
            </div>
        </div>`
        productUnitCost = product.unitCost;
    }

    document.getElementById("cart-info").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            showArticles(resultObj.data.articles);

            updateSubtotal()
            updateTotalCosts()

            document.getElementById("prodCount").addEventListener("change", function () {
                updateSubtotal();
                updateTotalCosts();
            })
        }
    });
});


document.getElementById("productCostText").addEventListener("change", function () {
    productCost = this.value;
    updateTotalCosts();
    updateSubtotal();
});

document.getElementById("premiumradio").addEventListener("change", function () {
    shippingPercentage = 0.15;
    updateTotalCosts();
    updateSubtotal();
});

document.getElementById("expressradio").addEventListener("change", function () {
    shippingPercentage = 0.07;
    updateTotalCosts();
    updateSubtotal();
});

document.getElementById("standardradio").addEventListener("change", function () {
    shippingPercentage = 0.05;
    updateTotalCosts();
    updateSubtotal();
});