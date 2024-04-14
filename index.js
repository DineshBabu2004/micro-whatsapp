const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require("path");
const chat = require("./Models/chat.js");
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride('_method'));
app.use(express.json());

app.listen("8080",()=>{
    console.log("app is listening");
})



main().then(()=>{
    console.log("connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//Display Users msg

app.get("/display",async (req,res)=>{
let chats = await chat.find();
// console.log(chats);
res.render("render.ejs",{chats});

});

//add new chat 

app.get('/display/new',(req,res)=>{
    res.render("new.ejs");
})

app.post('/display/new/update',(req,res)=>{
    let {from:sender,msg:message,to:receiver} = req.body;

    let chat1 = new chat({
        from:sender,
        to:receiver,
        msg:message,
        Date:new Date()
    })
    chat1.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/display");

})

//edit route

app.get('/display/:id',async(req,res)=>{
let {id} = req.params;
let chatInfo = await chat.findById(id);
console.log(chatInfo._id);
res.render("edit.ejs",{chatInfo});
});

//update Route

app.patch('/display/:id/update',async(req,res)=>{
    let{id} = req.params;
    let{msg:newmsg} = req.body;
    chat.findByIdAndUpdate(id,{msg:newmsg},{new:true}).then((res)=>{
        console.log(res);
    })
    res.redirect('/display');
});

//delete route

app.delete('/display/:id',(req,res)=>{
    let{id}=req.params;
    console.log(id);
    chat.findByIdAndDelete(id).then((val=>{
        console.log(val);
    })).catch((err)=>{
        console.log(err);
    })
    res.redirect("/display");
});