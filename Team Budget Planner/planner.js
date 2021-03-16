var empObj =[];
function storeInSession() {
    sessionStorage.setItem("empInfo",empObj)
}
function retrieveFromSession() {
    var obj = sessionStorage.getItem("empInfo");
    console.log(obj);
}
function onFormSubmit(){
    //alert("Event generated...")
    var data = readFormData();
    insertNewRecord(data);
    empObj.push(data);      //in empObj
    storeInSession(data);
    resetData();
}

function readFormData() {
    var obj = {}    // empty object
    obj.name = document.getElementById("name").value;
    obj.pname = document.getElementById("pname").value;
    obj.budget = document.getElementById("budget").value;
    console.log(obj);
    return obj; 
}
function insertNewRecord(data){
 var table = document.getElementById("employeeList");
 var body = table.getElementsByTagName("tbody")[0];
 var newRow = body.insertRow(body.length);  // row created 

 var cell1 = newRow.insertCell(0);          // cell created 
 cell1.innerHTML=data.name;                 // value placed 

 var cell2 = newRow.insertCell(1);          // cell created 
 cell2.innerHTML=data.pname;                 // value placed

 var cell3 = newRow.insertCell(2);
 cell3.innerHTML=data.budget;
}

function resetData() {
document.getElementById("name").value="";
document.getElementById("pname").value="";
document.getElementById("budget").value="";
}

function updateTable() {
    for(var i=1; i<sessionStorage.length;i++){
        var item = retrieveFromSession();
        var converted = JSON.parse(item);
        insertNewRecord(converted);
    }
}
