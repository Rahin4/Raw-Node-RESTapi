
const {handlereqres}=require('./helpers/handlereqres')
const http=require('http');

const app={};

app.config={
    port:3000,
};

app.handlereqres=handlereqres;

app.createserver=()=>{
    const server=http.createServer(app.handlereqres);
    server.listen(app.config.port,()=>{
        console.log(`server is running on ${app.config.port}...`)
    })
}

app.createserver();
