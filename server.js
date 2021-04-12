let app = require("express")();
let http = require("http").Server(app); //to load the library we have run port number
let io = require("socket.io")(http);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket)=>{
    console.log("Client connected to application....")

    socket.on('chat',(name,message)=>{
        console.log("Hello "+name);
        console.log("Your Message: "+message);
    });
});
http.listen(9090,()=>console.log(`Server running on port number 9090`));