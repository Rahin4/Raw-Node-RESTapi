const{ home}=require('./../handlers/home');

const{userreqhandler}=require('./userreqhand')

const { notfound } = require("./../handlers/notfound");

const routes={

    'notfound':notfound,
    'home':home,
    'users':userreqhandler,
};

module.exports=routes;

