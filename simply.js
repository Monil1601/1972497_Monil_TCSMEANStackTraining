function append(){
    if(!sessionStorage["counter"]){
        sessionStorage.setItem("counter",1);
    }

    var data = readFormData();
    if(data.title == "" || data.article == ""){
        return;
    }
    storeInSession(data);
    var i = eval(sessionStorage.getItem("counter"))-1;
    resetData();
}

function readFormData(){
    var obj = {};
    obj.title = document.getElementById("title").value;
    obj.article = document.getElementById("article").value;
    if (typeof (document.getElementById("image").files[0]) != 'undefined') {
        obj.image = document.getElementById("image").files[0].name;
    } else {
        obj.image = "none";
    }
    return obj;
}

function storeInSession(data){
    var i = sessionStorage.getItem("counter");
    sessionStorage.setItem("Blog " + i, JSON.stringify(data));
    i++;
    sessionStorage.setItem("counter", i);
}

function addNewBlog(blog, i){
    var allBlogs = document.getElementById("allBlogs");
    var cell = document.createElement('div');
    cell.className = 'row';
    cell.id = 'Blog '+ i;

    var titleSec = document.createElement('h2');
    titleSec.className = "blogTitle";
    titleSec.innerHTML = blog.title;
    cell.appendChild(titleSec);

    var artSec = document.createElement('p');
    artSec.className = "blogArt";
    artSec.innerHTML = blog.article;
    cell.appendChild(artSec);

    if(blog.image !="none"){
        cell.style.backgroundImage = 'url('+blog.image+')';
    }

    allBlogs.insertBefore(cell, allBlogs.firstChild);
}

function resetData(){
    document.getElementById('title').value = "";
    document.getElementById("article").value = "";
    document.getElementById("image").value = "";
}

function blog(){
    for(var j =1; j<sessionStorage.length; j++){
        var data = retrieveFromSession(j);
        var datajson = JSON.parse(data);
        console.log(datajson);
        addNewBlog(datajson, j);
    }
}

function retrieveFromSession(j){
    var obj = sessionStorage.getItem("Blog "+j);
    return obj;
}



