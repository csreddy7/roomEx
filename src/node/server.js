const express=require("express");
const server=express();
const bodyParser=require("body-parser");
const mongoClient=require("mongodb").MongoClient;
const urlParser=require("url");
let url="mongodb://10.19.73.69:7676";
let dbInstance=null;
let webSocket=require("ws");
const wsServer= new webSocket.Server({port:7777});

let clients={};


wsServer.on("connection",(ws,req)=>{
    let obj=urlParser.parse(req.url,true);
    const userId=obj.query.userId;
    clients[userId]=ws;
    ws.on("message",(data)=>{
        console.log("data received",data);
        data=JSON.parse(data);
        if(data.message){
            let user=data.message.userId;
            let client=clients[user];
            if(client && client.readyState==ws.OPEN){
                let obj={message:{userId:userId,data:data.message.data}}
                client.send(JSON.stringify(obj));
            }
        }
    });
    ws.on("close",()=>{
         delete clients[userId];
    });
});


mongoClient.connect(url,(err,client)=>{
    dbInstance=client.db("RoomEx");
    if(err){
        console.log("erroe while creating database",err);
    } 
});

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

server.use(bodyParser.json());

server.get("/users",(req,res)=>{
    dbInstance.collection("users").find().toArray((errs,users)=>{
        res.send(users);
    });
});

server.get("/years",(req,res)=>{
    dbInstance.collection("expenditures").find().toArray((errs,expenditures)=>{
        let arr=[];
        expenditures.forEach((element)=>{
            let date=new Date(element.date);
            let year=date.getFullYear();
            if(!arr.includes(year)){
                arr.push(year);
            }
        });
        arr=arr.map((element)=>{
            element={name:element,value:element};
            return element;
        })
        arr.sort(function(obj1,obj2){
            if(obj1.value>obj2.value){return 1}
            else if(obj1.value<obj2.value){return -1}
            else return 0;
           });
        res.send(arr);
    });
});


server.get("/userSummary",(req,res)=>{
    let month=req.query.month;
    let year=req.query.year;
 let startDate=year+"-"+(month<10?"0"+month:month)+"-"+"01";
 let endDate=year+"-"+(month<10?"0"+month:month)+"-"+"31";
    let cond=[
        {$match:{
            date:{
                    $gte:startDate,
                    $lt:endDate,
                }
            }
        },
        {$group:{_id:"$sponsor",total:{$sum:"$amount"}}}
    ];
    
    dbInstance.collection("expenditures").aggregate(cond).toArray((errs,summary)=>{
        res.send(summary);
    });
});



server.get("/expenditures/monthandyear",(req,res)=>{
    let month=req.query.month;
    let year=req.query.year;
    dbInstance.collection("expenditures").find().toArray((errs,expenditures)=>{
        expenditures= expenditures.filter((expenditure)=>{
            let date=new Date(expenditure.date);
            if(date.getMonth()==month-1 && date.getFullYear()==year){
                return true;
            }else{
                return false;
            }
        });
        res.send(expenditures);
    });
});

server.get("/users",(req,res)=>{
    dbInstance.collection("users").find().toArray((errs,users)=>{
        res.send(users);
    });
});


server.post("/users/create",(req,res)=>{
    dbInstance.collection("users").insert(req.body);
    res.json({message:"user created succesfully"});
    pushNotications("chandra created new user! check out");
});

server.get("/expenditures",(req,res)=>{
    dbInstance.collection("expenditures").find().toArray((errs,expenditures)=>{
        res.send(expenditures);
    });
});

server.get("/notifications",(req,res)=>{
    dbInstance.collection("notifications").find().toArray((errs,notifications)=>{
        res.send(notifications);
    });
});

server.post("/user/validate",(req,res)=>{
    dbInstance.collection("users").find({userId:req.body.userId}).toArray((errs,users)=>{
        if(users.length>0){
            res.send({valid:true});
        }else{
            res.send({valid:false});
        }
    });
});

server.post("/expenditures/create",(req,res)=>{
    dbInstance.collection("expenditures").insert(req.body);
    res.json({message:"expenditures created succesfully"});
    pushNotications("chandra created new expenditure! take a look.");
});

function pushNotications(msg){
    dbInstance.collection("notifications").insert({message:msg});
    wsServer.clients.forEach((client)=>{
        // console.log("client--->",client);
        if(client.readyState===webSocket.OPEN){
            let obj={};
            obj.notification=msg;
            client.send(JSON.stringify(obj));
        }
    });
}

server.listen(7474,()=>{
    console.log("server listening at 7474");
});


