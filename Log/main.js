let log = require("./logs");

let fs = require("fs");
let read = require("readline-sync");

let emp = new Array();
let details = fs.readFileSync("employee.json").toString();
if(details!=""){
    emp = JSON.parse(details);
}

debugger;
//User input for number of records

let n = read.questionInt("Enter number of records ");

debugger;

//push records to array by taking inputs from user

for(let i=0;i<n;i++){
    let fname = read.question(`[${i+1}] Enter first name `);
    let lname = read.question(`[${i+1}] Enter last name `);
    let gender = read.question(`[${i+1}] Enter gender `);
    let email = read.question(`[${i+1}] Enter email address `);
    let date_obj = new Date();
    emp.push({"fname": fname, "lname": lname, "gender":gender, "email":email,"date":date_obj.toLocaleString()});
}
debugger;

log.logger(emp, "employee.json");