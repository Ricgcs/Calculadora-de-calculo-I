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
        if(obj.variavel == null) obj = 0
        else{
            obj.coeficiente *= obj.potencia
            obj.potencia -= 1
        }
    }
    function integralTombo(obj){
        if(obj == null){
            console.log("INPUT vazio")
        }
        if(obj.variavel == null) obj.variavel = "x"
        if(obj.potencia == -1) obj = "Ln(x)"
        else{
            obj.potencia += 1
            //Falta a implementeção do tipo de coeficiente
            if(obj.coeficiente == null){
                obj.coeficiente[0] = 1
            }    
                obj.coeficiente[2] *= potencia
        }
    }
    function basckara(a,b,c){
        var delta = b**2 - (4*a*c)
        if(delta < 0){ 
            console.log("Não Existe") 
            return
        }
        var res
        if(delta == 0){
            res = -b/(2*a)
        }
        else{
            var x1 = -b+delta/(2*a)
            var x2 = -b-delta/(2*a)
            res = [x1,x2]
        }
        return res
    }
    function pontoCritico(funcao){
        if()
    }
    //Ainda não sei como colocar a função, se coloco como parametro ou dentro da função
    function bisseccao(inicio,fim,obj){
        var meio
        if(valordeX(inicio) >= 0 || valordeX(fim) <= 0){
            console.log("Intervalo Invalido")
            return 
        }
        while(inicio != fim){
            meio = inicio+fim/2
            if(valordeX(meio) < 0)inicio = meio           
            if(valordeX(meio) > 0) fim = meio
            if(valordeX(meio) <= 0.0001){
                return meio
            }
        }
        console.log(`X não tem raiz no intervalo {${inicio},${fim}}`)
    }
    
})

app.listen(3000,()=>{
    console.log("servidor funcionando")
})


