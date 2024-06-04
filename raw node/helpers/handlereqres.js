const url=require('url')
const {notfound}=require('./../handlers/notfound');
const routes=require('./../handlers/routes')
const handler={};
const{StringDecoder}= require('string_decoder');
const {validJSON}=require('./../helpers/util')

handler.handlereqres=(req,res)=>{
    const headerObj=req.headers;
    const parsedurl=url.parse(req.url,true);
    const method=req.method.toLowerCase();
    const queryObj=parsedurl.query;
    const pathname=parsedurl.pathname;
    const formatedpath=pathname.replace(/^\/+|\/+$/g,'');
    const decoder= new StringDecoder('utf-8');
    let fulldata;
    
    const reqpros={
        headerObj,
        method,
        queryObj,
        formatedpath,
        parsedurl,
        fulldata,


    }
    const choosenhandler=routes[formatedpath] ? routes[formatedpath] : notfound;

    req.on('data',(chunk)=>{
        fulldata= decoder.write(chunk);
    })
    req.on('end',()=>{
        fulldata+=decoder.end()
        // reqpros.bodydata=validJSON(fulldata);
        reqpros.fulldata=fulldata
        choosenhandler(reqpros,(statuscode,data)=>{
            statuscode= typeof statuscode==='number'? statuscode: 500;
            data=typeof data==='string' ? data:'post data not found';
            res.setHeader('Content-Type','application/json')
            let jsondata=JSON.stringify(data)
            res.writeHead(statuscode);
            res.end(jsondata);
            // console.log(reqpros.fulldata)
        })
        
    });

//   console.log(reqpros.fulldata)
    


}

module.exports=handler