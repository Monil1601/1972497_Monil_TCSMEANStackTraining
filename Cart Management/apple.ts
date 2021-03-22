class Gadgets {
    name: string;
    cost: number;
    quantity: number;
    total: string;
}


function initializeCart():void{
    let cart_final: number = 0;
    for(let i =0;i<sessionStorage.length; i++){
        let key = sessionStorage.key(i);
        let value: Gadgets = JSON.parse(sessionStorage.getItem(key));
        cart_final+=eval(value.total);
        insertNewRecord(value);
    }
    document.getElementById("total").innerHTML = `Total Price: $${cart_final}`;
}

function storeInSession(item: Gadgets): void{
    let key = item.name;
    if(!sessionStorage[key]){
        sessionStorage.setItem(key, JSON.stringify(item));
    }
    else{
        let obj: Gadgets = JSON.parse(sessionStorage.getItem(key));
        obj.quantity += item.quantity;
        obj.total = (obj.quantity*obj.cost).toFixed(2);
        sessionStorage.setItem(key, JSON.stringify(obj));
    }
}

function addToCart(): void{
    let item: Gadgets = info();
    storeInSession(item);
    Cartupdate();
}

function remove(): void{
    let item: Gadgets = info();
    if(sessionStorage[item.name]){
        sessionStorage.removeItem(item.name);
    }
    Cartupdate();
}

function info():Gadgets{
    let obj = new Gadgets();
    let ele = event.target as Element;
    let closeCard = ele.closest('div');
    obj.name = closeCard.getElementsByTagName('h4')[0].innerHTML;
    let selected = closeCard.getElementsByClassName('qty')[0] as HTMLInputElement;
    obj.quantity = eval(selected.value);
    let price = closeCard.getElementsByClassName('cost')[0].innerHTML;
    obj.cost = eval(price.replace("$","").replace(",",""));
    obj.total = (obj.cost*obj.quantity).toFixed(2);
    return obj;
}

function Cartupdate(): void{
    let carttotal: number = 0;
    for(let i = 0; i<sessionStorage.length;i++){
        let key = sessionStorage.key(i);
        let value: Gadgets = JSON.parse(sessionStorage.getItem(key));
        carttotal+= value.quantity;
    }
    document.getElementById("size").innerHTML = `Cart: ${carttotal}`;
}

function insertNewRecord(data: Gadgets): void{
    let table = document.getElementById("cart");
    let body = table.getElementsByTagName("tbody")[0];
    let newRow = body.insertRow();

    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = `$${Number(data.cost)}`;

    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.quantity.toString();

    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = `$${Number(data.total)}`;
}
