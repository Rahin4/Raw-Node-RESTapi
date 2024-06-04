const handler={};
handler.notfound=(reqpros,cb)=>{
    console.log('no routes found')
    cb(500,'server error')
}

module.exports=handler;