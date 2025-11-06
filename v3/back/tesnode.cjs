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
console.log("5 - Derivada 2ºOrdem")
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
    if(divs[0] == '') divs[0] = "1/1"
    divs[0] = divs[0].split(/(\/)/)
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
        copia = separacao
        separacao = substituirX(copia,x)
        break
    case 4:
        pontoCritico()
        break
    case 5:
        const i = Number(prompt("Digite o inicio: "))
        const f = Number(prompt("Digite o fim: "))
        separacao = bisseccao(i,f,separacao)
        break
    case 6:
        tombo(separacao)
        tombo(separacao)
        break
    default:
        console.log("Saindo da Calculadora")
        break
}

function printExpr(e){
    for(let i = 0;i<e.length;i++){
        e[i].coeficiente = n.join("")
    }
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
                    obj[i].coeficiente[0] *= obj[i].potencia
                    obj[i].potencia -= 1    
            }
        }
    }''
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
            if(obj[i] == "+" || obj[i] == "-") continue
            if(obj[i] == null){
                console.log("INPUT vazio")
            }
            if(obj[i].variavel == null) obj[i].variavel = "x"
            else if(obj[i].potencia == -1){
                console.log("INPUT inválido")
                return
            }
            else{
                obj[i].potencia = Number(obj[i].potencia) + 1    
                obj[i].coeficiente *= obj[i].potencia
            }
        }
    }

    function substituirX(expressao,x){
        obj = structuredClone(expressao)
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
        let j = 1
        while(j<obj.length){
            if(obj[j] == "+"){
                obj[0] = obj[j-1] + obj[j+1]
                obj.splice(1,2)
                continue
            }
            if(obj[j] == "-"){
                obj[0] = obj[j-1] - obj[j+1]
                obj.splice(1,2)
                continue
            }
        }
        return obj[0]
    }

    function bisseccao(inicio,fim,obj){
        var meio
        if(substituirX(obj,inicio) * substituirX(obj,fim) >= 0 || inicio >= fim){
            console.log("Intervalo Invalido")
            return 
        }
        while(true){
            meio = (inicio+fim)/2
            fMeio = substituirX(obj,meio)
            fInicio = substituirX(obj,inicio)
            if(Math.abs(fMeio) >= 0.0001) break
            if(Math.sign(fMeio)  == Math.sign(fInicio)){
                inicio = meio      
            }
            else fim = meio            
        }
        return Math.floor(meio)
    }