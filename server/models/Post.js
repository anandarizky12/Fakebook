import mongoose from 'mongoose';

const post = mongoose.Schema({
    username:{
        type:String, 
    },
    image:{
        type:String, 
    },
    profile:{
        type:String, 
    },
    email:{
        type: String
    },
    caption:{
        type:String,
    }, 
    timestamp: { 
        type: Date, 
        default: new Date(),
      
    }

})

var PostMessage =mongoose.model('post', post);

export default PostMessage;