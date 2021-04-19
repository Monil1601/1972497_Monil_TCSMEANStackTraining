let express = require("express")
let app = express()
let http = require("http").Server(app);
let io = require('socket.io')(http);
let bodyParser= require("body-parser")
let port = 9090;
app.use(bodyParser.urlencoded({extended:true})) //enable any format body data
app.use(bodyParser.json()); // enable json data
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});


    io.on("connection",(socket)=>{
        console.log("Client connected");
           
        socket.on('chat',(msg)=>{
            /*
            app.post("/store",(req,res)=>{
            let Name = req.body.name;
            let Message = req.body.message;
            name = this.Name;
            message = this.Message;
            */
            mongoClient.connect(url,{useUnifiedTopology:true},(err1,client)=>{
                if(!err1){
                    let db = client.db('meanstack');
                    db.collection('ChatLog').insertOne({name: msg.name, message: msg.msg},(err2,result)=>{
                        if(!err2){
                            if(result.insertedCount > 0){
                                console.log("Record Inserted Successfully")
                            }else{
                                console.log("Record did not insert");
                            }
                            client.close();
                        }
                    })
                }
            })
            
        });
       
    });

http.listen(port,()=>console.log(`Server running on port number 9090`));

