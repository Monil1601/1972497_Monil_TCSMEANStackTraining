let fs = require("fs");
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

//let server = http.createServer((req,res)=>{
    let data = fs.readFileSync("call_data.json").toString();
    let records = new Array();
    if(data!=null){
        records = JSON.parse(data);
    }
   // console.log(records);

   mongoClient.connect(url, {useUnifiedTopology:true},(err1,client)=>{
       if(!err1){
           let db = client.db("call_record");
           for(var i =0;i<records.length;i++){
               db.collection("record").insertOne(
                   {_id:records[i]._id,
                    source:records[i].source,
                    destination:records[i].destination,
                    sourceLocation:records[i].sourceLocation,
                    destinationLocation: records[i].destinationLocation,
                    callDuration: records[i].callDuration,
                    roaming:records[i].roaming,
                    callCharge:records[i].callCharge
                })
           }
       }
   })
    
//});

//server.listen(27017, ()=>console.log(`Server running on port ${port}`));
