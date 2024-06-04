const fs=require('fs');
const path=require('node:path');

const lib={};


 lib.create = async (dir,file,data,callback)=>{
    try{
        const filepath=path.join(dir,'userinfo',`${file}.json`)
        let  filedesc= await fs.promises.open(filepath,'wx');
        const stringdata=JSON.stringify(data);
        await filedesc.write(stringdata);
        await filedesc.close();
    }
    catch(err){
        if(err){
            if(err.code==='EEXIST'){
                callback('file exsits,chnage the file name')
            }
        }
        else{
            callback('something wrong',err.message)
        }
    }
 };

 lib.read= async (dir,file,callback)=>{
    try{
        const filepath=path.join(dir,'userinfo',`${file}.json`);
        const readfile= await fs.promises.readFile(filepath,'utf8');
        callback(null, readfile)
        // await readfile.close()
    }
    catch(err){
        console.log(err)
        callback(err, null);
    }
 }

 lib.update= async (dir,file,data,callback)=>{
    const filepath=path.join(dir,'userinfo',`${file}.json`);
    let filecontent=fs.promises.readFile(filepath);
    const strdata=JSON.stringify(data);
    await fs.promises.writeFile(filepath,strdata,'utf8');
    callback(null,filecontent)
 }

 lib.delete=async(dir,file,callback)=>{
    const filepath=path.join(__dirname ,'userinfo',`${file}.json`);
    let dltfile= await fs.promises.unlink(filepath);
    callback(`file delted`)
 }


// lib.create(__dirname,'rahin',{'name':'rahin'},(err)=>{
//     if(err){
//         console.log(err.message)
//     }
// })










module.exports=lib;