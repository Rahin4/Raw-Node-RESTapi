const libdata=require('./../data/libdata')
const handler={};
const {validJSON}=require('./../helpers/util')

handler.home=(reqpros,cb)=>{
    console.log('this is home route');
    cb(200,'hello from home');
    

}



module.exports=handler;