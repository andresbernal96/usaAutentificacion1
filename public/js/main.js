
$(document).ready(function () {
    
    products ={};
    datos = {};
    readData();
    arregloCarrito=[];
    totalventa=0.0;
    
    $('body').on('click', '.agregarAlCarro', function(){   
        var agregarItem =$(this).attr('agregarid');
        addtoCart(agregarItem);          
    });
     $('body').on('click', '.borrarItem', function(){   
        var producto =$(this).attr('productoID');     
        var posicion =$(this).attr('productoPosicion');  
        $(this).closest( ".itemCart" ).remove(); 
        removetoCart(producto,posicion);                    
    });
});

function readData() {
    $.getJSON("dataParcial.json", function (data) {
        products = data.products;
        categorias = data.categories;
        mostrarProductos(products);
        datos = data;
    });
}
function buscarProducto() {
    var buscador, ul, li, a;
    buscador = document.getElementById('buscador');
    buscador = buscador.value.toUpperCase();
    ul = document.getElementById("products");
    li = ul.getElementsByClassName("card hoverable");
    for (var i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("card-title")[0];

        if (a.innerHTML.toUpperCase().indexOf(buscador) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

function categoriaDrink() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("drink");
    filter = input.innerHTML.toUpperCase();

    ul = document.getElementById("products");
    li = ul.getElementsByClassName("card hoverable");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("list-group-category")[0];

        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
function categoriaFood() {
    var x, y, ul, li, a, i;
    x = document.getElementById("food");
    y = x.innerHTML.toUpperCase();

    ul = document.getElementById("products");
    li = ul.getElementsByClassName("card hoverable");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("list-group-category")[0];

        if (a.innerHTML.toUpperCase().indexOf(y) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
function categoriaLunch() {
    var x, y, ul, li, a, i;
    x = document.getElementById("lunch");
    y = x.innerHTML.toUpperCase();
    ul = document.getElementById("products");
    li = ul.getElementsByClassName("card hoverable");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("list-group-category")[0];

        if (a.innerHTML.toUpperCase().indexOf(y) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
function categoriaSea() {
    var x, y, ul, li, a, i;
    x = document.getElementById("sea");
    y = x.innerHTML.toUpperCase();
    ul = document.getElementById("products");
    li = ul.getElementsByClassName("card hoverable");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("list-group-category")[0];

        if (a.innerHTML.toUpperCase().indexOf(y) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
function mayorA30() {
    var ul, li, a, i;

    ul = document.getElementById("products");
    li = ul.getElementsByClassName("card hoverable");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("precioProducto")[0];

        if (a.innerHTML > 30.000) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function menorA10() {
    var ul, li, a, i;

    ul = document.getElementById("products");
    li = ul.getElementsByClassName("card hoverable");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("precioProducto")[0];

        if (a.innerHTML < 10.000) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function todos() {
    readData();
}
function Disponible() {
        var prod2= datos.products;
    for(var i =0;  i < prod2.length; i++) {
       if(!prod2[i].available ){
           prod2.splice(i,1);
        }
    }
    mostrarProductos(prod2);
}

function NoDisponible() {
        var prod  = datos.products;
    for(var i =0;  i < prod.length; i++) {
       if(prod[i].available ){
           prod.splice(i,1);
        }
    }
    mostrarProductos(prod);
}
function BestSeller(){
     var prod1= datos.products;
    for(var i =0;  i < prod1.length; i++) {
       if(!prod1[i].best_seller ){
           prod1.splice(i,1);
        }
    }
    mostrarProductos(prod1);
}
function desactivar(name1,name2){	
    document.getElementById(name1).classList.add(disabled);
document.getElementById(name2).classList.add(disabled);
}
function activar(name1,name2,name3){	
document.getElementById(name1).disabled=true;
document.getElementById(name2).disabled=false;
document.getElementById(name3).disabled=false;
}
function OrdenarNombreAsc() {
    var prod = {};
    prod = datos.products;
    prod = sortByName(prod, 0);
    mostrarProductos(prod);
    console.log(prod.length);

}

function OrdenarNombreDesc() {
    var productos1 = {};
    productos1 = datos.products;
    productos1 = sortByName(productos1, 1);
    mostrarProductos(productos1);

    console.log(prod.length);
}

function OrdenarPrecioAsc() {
    var productos1 = {};
    productos1 = datos.products;
    productos1 = sortByPrice(productos1, 0);
    mostrarProductos(productos1);

}
function OrdenarPrecioDesc() {
    
    var productos1 = {};
    productos1 = datos.products;
    productos1 = sortByPrice(productos1, 1);
    mostrarProductos(productos1);
    console.log(productos1.length);

}
function sortByName(array, tipo) {
    return array.sort(function (a, b) {
        if (tipo == 0) {
            return ((a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : 0));
        } else if (tipo == 1) {
            return ((a.name.toUpperCase() > b.name.toUpperCase()) ? -1 : (a.name.toUpperCase() < b.name.toUpperCase() ? 1 : 0));

        }
    });
}
function sortByPrice(array, tipo) {
     return array.sort(function (a, b) {
        if (tipo == 0) {
            return ((parseInt(a.price.replace('.','')) < parseInt(b.price.replace('.','')) ) ? - 1 : ((parseInt(a.price.replace('.','')) > parseInt(b.price.replace('.','')) ) ? 1 : 0));
        } else if (tipo == 1) {
            return ((parseInt(a.price.replace('.','')) > parseInt(b.price.replace('.','')) ) ? - 1 : ((parseInt(a.price.replace('.','')) < parseInt(b.price.replace('.','')) ) ? 1 : 0));

        }
    });
}


function mostrarProductos(productos) {
     $('.item').remove();
       $.each(productos, function (indexProduct, product) {
        var newCard = "";
        newCard += '<div class="item col-sm-8 col-xs-12 col-lg-4 col-md-6">';
        newCard += '<div class="card hoverable">';
        newCard += '<div class="card-image">';
        newCard += '<img src=' + product.img + '>';
        newCard += '<span class="card-title"><h3>' + product.name;
        if (product.best_seller) {
            newCard += '&nbsp;<span class=" badge-Blue "><h6>Best Seller</h6></span></h3></span>';
        } else {
            newCard += '<span class="badge-Blue"></span>';
        }
        newCard += ' </div>';
        newCard += '<div class="card-content"><p>';
        newCard += product.description;


        newCard += '</p><br>';
        newCard += '<ul class="list-group">';
        if (product.available) {
            newCard += '<li><p class="alert alert-success">Disponibles</p></li>';
        } else {
            newCard += '<li><p class="alert alert-danger" >No Disponible</p></li>';
        }
        newCard += '<li  class="list-group-item-text alert alert-info"><p class="precioProducto">' + product.price + '</p></li>';
        newCard += '</ul>';
        newCard += '</div>';
        newCard += '<div class="card-action">';
        newCard += '<ul class="list-group-category">';

        $.each(product.categories, function (posProductCategory, productCategory) {

            $.each(categorias, function (posCategory, category) {
                if (category.categori_id == productCategory) {

                    newCard += '<li class="list-group-item">' + category.name + '</li>';

                }
            });
        });
        newCard += '</ul>';
        newCard += '</div>';
        newCard += '<div class="card-action">';
        if (product.available) {
            newCard += '<a class="btn btn-success agregarAlCarro" agregarid="'+product.id+'" href="#">Agregar</a>';
        } else {
            newCard += '<a class="addCart_btn btn btn-success" href="#" disabled>Agregar</a>';  
        }
        newCard += '</div>';
        newCard += '</div>';
        $("#products").append(newCard);
    });
}

function addtoCart(productId){
 
    console.log('hola');
    for(var i =0;  i < products.length; i++){
         if(productId == products[i].id ){                        
            arregloCarrito.push(products[i]);
             var nuevaFila = "";
                        nuevaFila += '<tr class="itemCart">';            
                        nuevaFila += '<td>'+products[i].name+'</td>';
                        nuevaFila += '<td>$'+products[i].price+'</td>';
                        nuevaFila += '<td><button class="btn btn-danger borrarItem" productoID="'+products[i].id+'" productoPosicion="'+(arregloCarrito.length-1)+'"  >eliminar</button></td>';
                        nuevaFila += '</tr>';  
                         $( ".carritolist" ).append(nuevaFila );

                           totalventa += parseFloat(products[i].price.replace(".", ""));
                           $( "#total" ).html("Total: $"+totalventa);
        } 
    }


}
function removetoCart(productId,productPos){
    arregloCarrito.splice(productPos, 1);
    for(var i =0;  i < products.length; i++){
         if(productId == products[i].id ){
            totalventa -= parseFloat(products[i].price.replace(".", ""));
            $( "#total" ).html("Total: $"+totalventa);
        } 
    }


}


