let express = require("express")
let app = express()
let bodyParser= require("body-parser")
let port = 9090;
app.use(bodyParser.urlencoded({extended:true})) //enable any format body data
app.use(bodyParser.json()); // enable json data
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
//mongoose = require("mongoose");
//mongoose.connect("url", {useNewUrlParser: true});
/*
let schema = new mongoose.Schema({
    courseId: Number,
    courseName: String,
    description: String,
    amount: Number
})
*/

//var courseModel = mongoose.model("courseModel",schema);

/*app.get("/fetchDetails",(req,res)=>{
    res.render
})
*/


//http://localhost:9090
app.get("/",(req,res)=>{ 
    res.sendFile(__dirname+"/home.html");
})

app.get("/add",(req,res)=>{ 
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    res.sendFile(__dirname+"/add.html");
})

app.post("/storeDetails",(req,res)=>{
  //  res.sendFile(__dirname+"/add.html");
    let cid = req.body.cid;
    let cname = req.body.cname;
    let desc = req.body.desc;
    let amount = req.body.amount;
    let courseData = {courseId:cid, courseName:cname, description:desc,amount:amount};
    mongoClient.connect(url, {useUnifiedTopology:true},(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
            db.collection("Courses").insertOne(courseData,(err2,result)=>{
                if(!err2){
                    if(result.insertedCount>0){
                        res.send("Record Inserted Successfully")
                    }else{
                        res.send("Record didn't insert");
                    }
                }
            })
        }
    })
    
})

app.get("/delete",(req,res)=>{
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    res.sendFile(__dirname+"/delete.html");
})

app.post("/deleteDetails",(req,res)=>{
    //  res.sendFile(__dirname+"/add.html");
      let cid = req.body.cid;
      let courseData = {courseId:cid};
      mongoClient.connect(url, {useUnifiedTopology:true},(err1,client)=>{
          if(!err1){
              let db = client.db("meanstack");
              db.collection("Courses").deleteOne(courseData,(err2,result)=>{
                  if(!err2){
                      if(result.deletedCount>0){
                          res.send("Record Deleted Successfully")
                      }else{
                          res.send("Record didn't delete");
                      }
                  }
              })
          }
      })
      
  })

  app.get("/update",(req,res)=>{
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    res.sendFile(__dirname+"/update.html");
})

app.post("/updateDetails",(req,res)=>{
    //  res.sendFile(__dirname+"/add.html");
      let cid = req.body.cid;
      let new_amount = req.body.amount;
     // let courseData = {courseId:cid};
      mongoClient.connect(url, {useUnifiedTopology:true},(err1,client)=>{
          if(!err1){
              let db = client.db("meanstack");
              db.collection("Courses").updateOne({courseId: cid}, {$set:{amount:new_amount}},(err2,result)=>{
                  if(!err2){
                      if(result.modifiedCount>0){
                          res.send("Record Updated Successfully")
                      }else{
                          res.send("Record didn't update");
                      }
                  }
              })
          }
      })
      
  })

  
/*
    
app.get("/fetchDetails",(req,res)=>{
    courseModel.find({},(err, allDetails)=>{
        if(!err){
            res.render("fetch",{ details: allDetails})
        }else{
            res.send(err);
        }
    })
  })
  */

  /*
  async function getData(){
      let db = await mongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology:true
      })
      let _db=await db.db('meanstack');
      
      let Course_collection =  _db.collection('Courses');
      let data = await Course_collection.find().toArray();
      return data;
  }
  */

  app.get("/fetch", async(req,res)=>{
    res.setHeader("content-type", "text/html");
    mongoClient.connect(url, {useUnifiedTopology:true},(err1,client)=>{
        if(!err1){
            let db = client.db("meanstack");
            
            db.collection("Courses").find({}).toArray(function(err,result){
                res.send(result);
            })
        }
    })
});



app.listen(port, ()=>console.log(`Server running on port number ${port}`));
