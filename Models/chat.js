const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:50
    },Date:{
       type:Date ,
       required:true
    }
});
const chats = mongoose.model("Chat",chatSchema);
module.exports = chats;