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
    function tombo(obj)
    {
        if(obj == null){
            console.log("INPUT vazio")
        }
        if(obj.potencia == 1) obj = obj.coeficiente
        if(obj.varivel == null) obj = 0
        else{
            obj.coeficiente *= obj.potencia
            obj.potenca -= 1
        }
    }
})

app.listen(3000,()=>{
    console.log("servidor funcionando")
})


