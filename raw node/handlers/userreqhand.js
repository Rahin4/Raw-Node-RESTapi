const {validJSON}=require('./../helpers/util')
const handler={};
const libdata=require('./../data/libdata');

handler.userreqhandler=(reqpros,cb)=>{
    const acceptedmethods=['get','delete','post','put'];
    if(acceptedmethods.includes(reqpros.method)){
      handler._user[reqpros.method](reqpros,cb);
    }
    else{
        cb(500,'only post,get,delete,update mehod are valid')
    }
};

// get method/////////////////////////////////////////////////////////////////

 handler._user={};
 //////////////////////////////////////////////////////////////////////////////

 handler._user.get=(reqpros,cb)=>{
  // const body=validJSON(reqpros.fulldata)
  let phone=reqpros.queryObj.phone.trim().length===11 ? reqpros.queryObj.phone:false;

  if(phone){
    libdata.read('data',phone,(err,data)=>{
      const user={...validJSON(data)}
      if(!err && user){
        delete user.passward;
        console.log(user);
        cb(200,user)
      }
      else{
        console.log(err,'at user.get method userreqhand')
        
      }
    })
  }
  else{
    console.log('the phone in get method isnot valid in userreqhand')
  }
  }


///////////////////////////////////////////////////////////////////////////////
///////////post method////////////////////////////////////////////////////////


 handler._user.post=(reqpros,cb)=>{
  // body=validJSON(reqpros.fulldata)
  const body=validJSON(reqpros.fulldata)
  const firstname=typeof body.firstname==='string' && body.firstname.trim().length>=0 ? body.firstname:false;
  const lastname=typeof body.lastname==='string' && body.lastname.trim().length>=0 ? body.lastname:false;
  const phone=typeof body.phone==='string' && body.phone.trim().length===11 ? body.phone:false;
  const passward=body.passward.trim().length>=0 ? body.passward:false;
  if(firstname || lastname || phone || passward){
    // libdata.read('data',phone,(err)=>{
    //   if(err){
        let userobject={
          firstname,
          lastname,
          passward,
          phone,
        }
        
        libdata.create('data',phone,userobject,(err)=>{
          if(err){
            cb(200,'user created scuessfully')
          }
          else{
            cb(500,'failed to create user,try again')
          }
        })
      // }
    //   else{
    //     cb(500,'the user exsists')
    //   }
    // })
  }
  else{
    console.error('err at file cannot created at userreqhand post section')
  }
}


///////////////////////////////////////////////////////////////////////////////
///////////update method////////////////////////////////////////////////////////

 handler._user.put=(reqpros,cb)=>{
  const body=validJSON(reqpros.fulldata);
  const firstname= typeof body.firstname==='string' && body.firstname.trim().length>0?body.firstname:false;
  const lastname= typeof body.lastname==='string' && body.lastname.trim().length>0?body.lastname:false;
  const phone= typeof body.phone==='string' && body.phone.trim().length===11?body.phone:false;
  const passward= body.passward.trim().length>0?body.passward:false;
  if(phone){
    if(firstname||lastname||password){
      libdata.read('data',phone,(err,data)=>{
        const userdata={...validJSON(data)}
        if(!err &&userdata){
          if(firstname){
            userdata.firstname=firstname;
          }
          if(lastname){
            userdata.lastname=lastname;
          }
          if(phone){
            userdata.phone=phone;
          }
          if(passward){
            userdata.passward=passward;
          }
        }
        libdata.update('data',phone,userdata,(err,data)=>{
          if(err){
            console.log('your data isnot updated')
            cb(500,'your data isnot updated')
          }
          else{
            cb(200,'data is updated');
            console.log('data is updated')
          }
        })
        // else{
        //   console.log(err,'in !err &&userdata section')
        // }
      })
    }else{
      console.log('no info found to update from put method')
    }
  }else{
    console.log('phone is not valid from put method ')
  }

 }

///////////delete method////////////////////////////////////////////////////////




 handler._user.delete=(reqpros,cb)=>{
  const phone= reqpros.queryObj.phone.trim().length=== 11 ?reqpros.queryObj.phone:console.log(false,'phone to delete isnot valid');
  if(phone){
    libdata.read('data',phone,(err,userdata)=>{
      if(!err && userdata){
        libdata.delete('data',phone,(err)=>{
          if(!err){
            console.log('data is deleted succesfully');
            cb(200,'data is deleted successfully')
          }else{
            console.log('error while deleting data ');
            cb(500,'error while deleting data ')
          }
        })
      }else{
        console.log('userdata not found to delete');
        cb(500,'userdata not found to delete')
      }
    })
  }else{
    console.log('data not found to read to delete');
    cb(500,'datanot found to read to delete')
  }
 }


module.exports=handler