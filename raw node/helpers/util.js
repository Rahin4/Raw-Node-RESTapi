const util={};
const crypto=require('crypto')

util.validJSON=(string)=>{
    let output;
    try{
        output=JSON.parse(string)
    }
    catch{
        output={}
    }
    return output;
}




module.exports=util;