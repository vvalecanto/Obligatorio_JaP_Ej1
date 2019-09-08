var currentProductsArray = [];


function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        htmlContentToAppend += `
            <a href= "product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <p class="mb-1">` + product.currency + product.cost + ` </p>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">` + product.description + ` </p>
                    <small class="mb-1"> ` + product.soldCount + ` artículos vendidos </small>
                   </div>
                </div>
            </div>
        </a>
            `
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            showProductsList(currentProductsArray);
        }
    });
});
