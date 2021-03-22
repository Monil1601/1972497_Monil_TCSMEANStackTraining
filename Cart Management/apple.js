var Gadgets = /** @class */ (function () {
    function Gadgets() {
    }
    return Gadgets;
}());
function initializeCart() {
    var cart_final = 0;
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        var value = JSON.parse(sessionStorage.getItem(key));
        cart_final += eval(value.total);
        insertNewRecord(value);
    }
    document.getElementById("total").innerHTML = "Total Price: $" + cart_final;
}
function storeInSession(item) {
    var key = item.name;
    if (!sessionStorage[key]) {
        sessionStorage.setItem(key, JSON.stringify(item));
    }
    else {
        var obj = JSON.parse(sessionStorage.getItem(key));
        obj.quantity += item.quantity;
        obj.total = (obj.quantity * obj.cost).toFixed(2);
        sessionStorage.setItem(key, JSON.stringify(obj));
    }
}
function addToCart() {
    var item = info();
    storeInSession(item);
    Cartupdate();
}
function remove() {
    var item = info();
    if (sessionStorage[item.name]) {
        sessionStorage.removeItem(item.name);
    }
    Cartupdate();
}
function info() {
    var obj = new Gadgets();
    var ele = event.target;
    var closeCard = ele.closest('div');
    obj.name = closeCard.getElementsByTagName('h4')[0].innerHTML;
    var selected = closeCard.getElementsByClassName('qty')[0];
    obj.quantity = eval(selected.value);
    var price = closeCard.getElementsByClassName('cost')[0].innerHTML;
    obj.cost = eval(price.replace("$", "").replace(",", ""));
    obj.total = (obj.cost * obj.quantity).toFixed(2);
    return obj;
}
function Cartupdate() {
    var carttotal = 0;
    for (var i = 0; i < sessionStorage.length; i++) {
        var key = sessionStorage.key(i);
        var value = JSON.parse(sessionStorage.getItem(key));
        carttotal += value.quantity;
    }
    document.getElementById("size").innerHTML = "Cart: " + carttotal;
}
function insertNewRecord(data) {
    var table = document.getElementById("cart");
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow();
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = "$" + Number(data.cost);
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.quantity.toString();
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = "$" + Number(data.total);
}
