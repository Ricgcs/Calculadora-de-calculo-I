import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors"
import { sep } from 'path';
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
const expressao = prompt("Digite a expressão:")
console.log("Escolha qual método você quer fazer:")
console.log("1- Derivada")
console.log("2 - Integral")
console.log("3 - Substituir o valor de X")
console.log("4 - Ponto Critico")
console.log("5 - Bissecção")
console.log("0 - Para sair da calculadora")
let separacao = expressao.split(" ")
let operadores = ['+','-']
for(let i = 0;i<separacao.length;i++){
    if(separacao[i].includes(operadores)){
        continue
    }
    if(separacao[i].includes("^")) divs = separacao[i].split(/(x^)/)
    else divs = separacao[i].split(/(x)/)
    separacao[i] = new Expressoes(divs[0].divs[1],divs[2])
}

const metodo = prompt("")
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
        for(let i = 0;i<obj.length;i++){
            // if(obj[i].variavel == "sen(x)"){
            //     obj[i].variavel = "cos(x)"
            //     continue
            // }
            // if(obj[i].variavel == "cos(x)"){
            //     obj[i].variavel = "-sen(x)"
            //     continue
            // }
            // if(obj[i].variavel == "ln(x)"){
            //     obj[i].variavel= "1/x" 
            //     continue
            // }
            // if(obj.variavel == "e^x"){
            //     continue
            // }
            if(obj[i] == null){
            console.log("INPUT vazio")
            }
            if(obj[i].potencia == 1) obj[i] = obj[i].coeficiente
            if(obj[i].variavel == null) obj[i] = 0
            else{
                obj[i].coeficiente[0] *= obj[i].potencia
                obj[i].potencia -= 1
            }
        }
    }
    function integralTombo(obj){
        for(let i = 0;i<obj.length;i++){
            // if(obj[i].variavel == "sen(x)"){
            //     obj[i].variavel = "-cos(x)"
            //     continue
            // }
            // if(obj[i].variavel == "cos(x)"){
            //     obj[i].variavel = "sen(x)"
            //     continue
            // }
            // if(obj[i].variavel == "1/x"){
            //     obj[i].variavel= "ln(x)" 
            //     continue
            // }
            // if(obj.variavel == "e^x"){
            //     continue
            // }
            if(obj[i] == null){
                console.log("INPUT vazio")
            }
            if(obj[i].variavel == null) obj[i].variavel = "x"
            if(obj[i].potencia == -1) obj[i] = "Ln(x)"
            else{
                obj[i].potencia += 1
                //Falta a implementeção do tipo de coeficiente
                if(obj[i].coeficiente == null){
                    obj[i].coeficiente[0] = 1
                }    
                    obj[i].coeficiente[2] *= potencia
            }
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
        for(let i =0;i<obj.length;i++){
            obj[i].variavel = x
            if(obj[i].coeficiente != null){
                if(obj[i].potencia != null){
                    obj[i] = obj[i].coeficiente[0]*(obj[i].variavel**obj[i].potencia)
                }
                else{
                    obj[i] = obj[i].coeficiente*obj[i].variavel
                }
            }
            else{
                if(obj[i].potencia != null){
                    obj[i] = obj[i].variavel**obj[i].potencia
                }
                else{
                    obj[i] = obj[i].variavel
                }
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


