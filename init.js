const mongoose = require('mongoose');

const chat = require("./Models/chat.js");

main().then(()=>{
    console.log("connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let chats=[
    {
        from:"yash",
        to:"Arsath",
        msg:"tension ethatha",
        Date:new Date()
    },{
        from:"Hari",
        to:"Gourav",
        msg:"soppunnu adichuden ",
        Date:new Date()
    },{
    from:"Gourav",
    to:"Hari",
    msg:"Nan ennada panne ",
    Date:new Date()
    },{
    from:"Jeya",
    to:"Arsath",
    msg:"Kallu eduthu mandaiya odachuduven",
    Date:new Date()
    },{
        from:"Reshmika",
        to:"Keethi",
        msg:"Onakku onnu Theriyuma ",
        Date:new Date() 
    },{
    from:"Mani",
    to:"Abdul",
    msg:"3am thoughts(Motivation) ",
    Date:new Date()
    },{
    from:"Abdul",
    to:"mani",
    msg:"Ramanukku seetha ... ",
    Date:new Date()
    }
];
chat.insertMany(chats);
const chat1 = new chat({
    from:"Gowtham",
    to:"Abdul",
    msg:"Enna Soldra ... ",
    Date:new Date()
})

chat1.save().then((re)=>{
    console.log(re);
});
