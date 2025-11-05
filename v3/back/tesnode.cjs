const { sep } = require('path')
const { serialize } = require('v8')

class Expressoes{
    constructor(coeficiente,variavel,potencia){
        this.coeficiente = coeficiente
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
    if(separacao[i] == '+' || separacao[i] == '-'){
        continue 
    }
    if(separacao[i].includes("^")) divs = separacao[i].split(/(x\^)/)
    else divs = separacao[i].split(/(x)/)
    if(divs[2] == '') divs[2] = "1"
    if(divs[0] == '') divs[0] = "1"
    separacao[i] = new Expressoes(divs[0],divs[1],divs[2])
}
const metodo = prompt("método: ")
switch(Number(metodo)){
    case 1:
        tombo(separacao)
        break
    case 2:
        integralTombo(separacao)
        break
    case 3:
        const x = prompt("Digite valor de X: ")
        substituirX(separacao,x)
        break
    case 4:
        pontoCritico()
        break
    case 5:
        console.log("Digite o inicio")
        console.log("Digite o fim")
        bisseccao()
        break
    default:
        console.log("Saindo da Calculadora")
        break
}

console.log(separacao)

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
            if(obj[i] == "+" || obj[i] == "-") continue
            if(obj[i] == null){
            console.log("INPUT vazio")
            }
            if(obj[i].potencia == 1) obj[i] = obj[i].coeficiente
            else if(obj[i].variavel == null) obj[i] = 0
            else{
                if(obj[i].coeficiente.length > 1){
                    obj[i].coeficiente[0] *= obj[i].potencia
                    obj[i].potencia -= 1    
                }
                else{
                    obj[i].coeficiente *= obj[i].potencia
                    obj[i].potencia -= 1
                }
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
    function substituirX(obj,x){
        for(let i =0;i<obj.length;i++){
            if(obj[i] == "+" || obj[i] == "-") continue
            if(obj[i].variavel == null){
                obj[i] = obj[i].coeficiente
            } 
            else{
                obj[i].variavel = x
                obj[i] = obj[i].coeficiente[0]*(obj[i].variavel**obj[i].potencia)
            }
        }
    }