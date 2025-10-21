import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors"
let app = express();
app.use(cors());
app.use(express.json())
app.post("/envio/string",(req,res)=>{
    let teste = req.body.dado
    res.json({res:'vambora'})
    console.log(teste)
    
})

app.listen(3000,()=>{
    console.log("servidor funcionando")
})