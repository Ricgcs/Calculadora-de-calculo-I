import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors"
let app = express();

class Expressoes{
    constructor(constante,variavel,potencia){
        this.constante = constante
        this.variavel = variavel
        this.potencia = potencia
    }
}

const prompt = require('prompt-sync')()
console.log("!!!AVISO!!! - As expressões e operadores devem estar separados por espaço")
console.log("Exemplo: 3x^2 + 2x^7 - 6 + 3/2x^4")
const expresssao = prompt("Digite a expressão:")
console.log("Escolha qual método você quer fazer:")
console.log("1- Derivada")
console.log("2 - Integral")
console.log("3 - Substituir o valor de X")
console.log("4 - Ponto Critico")
console.log("5 - Bissecção")
console.log("0 - Para sair da calculadora")
let separacao = expresssao.split(" ")
let operadores = ['+','-']
const metodo = prompt()
switch(Number(metodo)){
    case 1:
        tombo()
    case 2:
        integralTombo()
    case 3:
        substituirX()
    case 4:
        pontoCritico()
    case 5:
        console.log("Digite o inicio")
        console.log("Digite o fim")
        bisseccao()
    default:
        console.log("Saindo da Calculadora")
        break
}


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
    function substituirX(obj,x){
        obj.variavel = x
        if(obj.coeficiente != null){
            if(obj.potencia != null){
                return obj.coeficiente*(obj.variavel**obj.potencia)
            }
            else{
                return obj.coeficiente*obj.variavel
            }
        }
        else{
            if(obj.potencia != null){
                return obj.variavel**obj.potencia
            }
            else{
                return obj.variavel
            }
        }
    }
    function descobrirX(obj){
        
    }
    function pontoCritico(funcao){

    }
    //Ainda não sei como colocar a função, se coloco como parametro ou dentro da função
    function bisseccao(inicio,fim,obj){
        var meio
        if(substituirX(obj,inicio) >= 0 || substituirX(obj,fim) <= 0){
            console.log("Intervalo Invalido")
            return 
        }
        while(inicio != fim){
            meio = inicio+fim/2
            if(substituirX(obj,meio) < 0)inicio = meio           
            if(substituirX(obj,meio) > 0) fim = meio
            if(substituirX(obj,meio) <= 0.0001){
                return meio
            }
        }
        console.log(`X não tem raiz no intervalo {${inicio},${fim}}`)
    }
    
})

app.listen(3000,()=>{
    console.log("servidor funcionando")
})


