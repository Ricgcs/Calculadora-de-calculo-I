class Expressoes{
    constructor(coeficiente,variavel,potencia){
        this.coeficiente = coeficiente
        this.variavel = variavel
        this.potencia = potencia
    }
}

const operacoes = {
    "^": (a, b) => a ** b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
}

//Nessa Parte a variavel pega a resposta do usuario, como string, e mostra as opções de cálculo
const prompt = require('prompt-sync')()
const operadores = ["+", "-", "*", "/", "%", "**", "^"];
console.log("!!!AVISO!!! - As expressões e operadores devem estar separados por espaço")
console.log("Exemplo: 3x^2 + 2x^7 - 6 + 3/2x^4")
const expressao = prompt("Digite a expressão:")
console.log("Escolha qual método você quer fazer:")
console.log("1- Derivada")
console.log("2 - Integral Definida")
console.log("3 - Substituir o valor de X")
console.log("4 - Ponto Critico") // Falta
console.log("5 - Bissecção") // 
console.log("6 - Derivada 2ºOrdem")
console.log("7 - Integral Númerica")
console.log("8 - Calculo Normal")
console.log("0 - Para sair da calculadora")

//A resposta do usuario é dividida em expressões e operadores, em um vetor.

let separacao = expressao.split(" ")
for(let i = 0;i<separacao.length;i++){
    //Qunando for operador ele apenas segue para outro elementos.
    if(operadores.includes(separacao[i])){
        continue 
    }
    //Separa a expressão em Coeficiente, Variavel e Potencia sendo um objeto da classe da Expressoes,
    //Os coeficientes e potencias são transformados em frações.
    //Caso o coeficiente ou potencia forem vazio como x^2 ou 4x ele são virão 1/1 já que no calculo final nada é alterado 
    if(separacao[i].includes("x^")) divs = separacao[i].split(/(x\^)/)
    else if(!separacao[i].includes("x")){
        let coef
        if(separacao[i].includes("^")){
            let divs = separacao[i].split("^")
            if (!divs[0].includes("/")) divs[0] = `${divs[0]}/1`;
            coef = divs[0].split(/(\/)/)
            if (!divs[1].includes("/")) divs[1] = `${divs[1]}/1`;
            let pot = divs[1].split(/(\/)/)
            separacao[i] = new Expressoes(coef, null, pot);
        }else{
            let valor = separacao[i];
            if (!valor.includes("/")) valor = `${valor}/1`;
            coef = valor.split(/(\/)/);
            separacao[i] = new Expressoes(coef, null, [1,"/",1]);
        }
        continue;
    }
    else divs = separacao[i].split(/(x)/)
    if(divs[2] == '') divs[2] = "1/1"
    if(divs[0] == '') divs[0] = "1/1"
    if(!divs[0].includes("/")) divs[0] = `${divs[0]}/1`
    if(!divs[2].includes("/")) divs[2] = `${divs[2]}/1`
    divs[0] = divs[0].split(/(\/)/)
    divs[2] = divs[2].split(/(\/)/)
    separacao[i] = new Expressoes(divs[0],divs[1],divs[2]) 
}

//Usuario escolhe o método listados, a função esoclhida é executada e a resposta é mostrado ao final
const metodo = prompt("método: ")
switch(Number(metodo)){
    case 1:
        res = tombo(separacao)
        printExpr(res);
        break
    case 2:
        res = integralTombo(separacao)
        printExpr(res);
        break
    case 3:
        const x = prompt("Digite valor de X: ")
        copia = separacao
        res = substituirX(copia,x)
        printExpr(res)
        break
    case 4:
        i = (prompt("Digite o inicio: "))
        f = (prompt("Digite o fim: "))
        res = pontoCritico(separacao,i,f)
        console.log(res)
        break
    case 5:
        i = Number(prompt("Digite o inicio: "))
        f = Number(prompt("Digite o fim: "))
        res = bisseccao(i,f,separacao)
        printExpr(res);
        break
    case 6:
        res = tombo(tombo(separacao))
        printExpr(res);
        break
    case 7:
        const a = Number(prompt("Digite o inicio do intervalo: "))
        const b = Number(prompt("Digite o fim do intervalo: "))
        const n = Number(prompt("Digite o n: "))
        res = newtonCotes(separacao,a,b,n)
        printExpr(res);
        break
    case 8:
        res = substituirX(separacao)
        printExpr(res);
        break
    default:
        console.log("Saindo da Calculadora")
        break
}


//Função que trasforma a resposta, que está em formato de array, em uma string 
function simplificarFracao(fr) {
    let n = Number(fr[0]);
    let d = Number(fr[2]);

    if (d === 1) return n.toString();
    if (n % d === 0) return (n / d).toString();

    return `${n}/${d}`;
}

function printExpr(e) {
    for (let i = 0; i < e.length; i++) {
        if (typeof e[i] !== "object") continue;

        let coef = simplificarFracao(e[i].coeficiente);
        let pot  = simplificarFracao(e[i].potencia);
        let vari 
        if(e[i].variavel == null){
            vari = ""
        }
        else{
            vari = e[i].variavel.replace("^", ""); 
        }

        if (coef === "1") coef = "";
        if (coef === "-1") coef = "-";

        if (pot === "1") {
            pot = "";
        } else {
            pot = "^" + pot;
        }

        e[i] = coef + vari + pot;
    }

    if(e instanceof Array){
        return console.log(e.join(" "));
    }

    return console.log(e)
}

//Função que transorma a função do usuário em derivada, que segue apenas a regra do tombo.
//Onde: n -> 0 |  x^n -> n*x^n-1 
function tombo(exp)
{
    let obj = structuredClone(exp)
    for(let i = 0;i<obj.length;i++){
        if(obj[i] == "+" || obj[i] == "-") continue
        if(obj[i] == null){
        console.log("INPUT vazio")
        }
        if(obj[i].variavel == null){
            obj[i].coeficiente[0] = 0 
            continue
        } 
        else if(obj[i].potencia[0] == 1 && obj[i].potencia[2] == 1){
            obj[i].variavel = null
        } 
        else{
                obj[i].coeficiente[0] *= obj[i].potencia[0]
                obj[i].coeficiente[2] *= obj[i].potencia[2]
                obj[i].potencia[0] -= (1*Number(obj[i].potencia[2]))    
        }
    }
    return obj
}

//Função que transorma a função do usuário em integral definida, que segue apenas a regra do tombo.
//Onde: n -> nx |  x^n -> (x^n+1)/n+1
function integralTombo(exp){
    let obj = structuredClone(exp)
    for(let i = 0;i<obj.length;i++){
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
            obj[i].potencia[0] = Number(obj[i].potencia[0]) + (1*Number(obj[i].potencia[2]))
            obj[i].coeficiente[2] *= obj[i].potencia[0]
            obj[i].coeficiente[0] *= obj[i].potencia[2]
        }
    }
    return obj
}

//Função que substiui os valores de x pelo numero escolhido pelo usuario
//Depois de substituir tudo, a função calculoNormal faz o restante das operações, já que agora possui todos os números sem incognitas
function substituirX(exp,x){
    let obj = structuredClone(exp)
    for(let i =0;i<obj.length;i++){
        if(!(obj[i] instanceof Object)) continue
        if(obj[i].variavel == null){
            obj[i] = Number((obj[i].coeficiente[0]/obj[i].coeficiente[2])**(obj[i].potencia[0]/obj[i].potencia[2]))
        }
        else{
            obj[i].variavel = Number(x)
            obj[i] = Number((obj[i].coeficiente[0]/obj[i].coeficiente[2])*(obj[i].variavel**(obj[i].potencia[0]/obj[i].potencia[2])))
        }
    }
    let ops1 = ["^", "**"]
    let ops2 = ["*", "/", "%"]
    let ops3 = ["+", "-"]
    
    obj = niveis(obj,ops1)
    obj = niveis(obj,ops2)
    obj = niveis(obj,ops3)

    return obj[0]
}

//Função que calcula operções básicas, respeitando a ordem das operações mátemáticas

function niveis(obj,ops){
    let i = 0
    while(i < obj.length){
        let elem = obj[i]
        if(ops.includes(elem)){
            let resultado = Number(operacoes[elem](Number(obj[i-1]),Number(obj[i+1])))
            obj.splice(i-1,3,resultado)
            if(i > 0){
                i--
            }
            else{
                i=0
            }
        }
        else i++
    }
    
    return obj
}

//Função que transorma a função do usuário em integral Numérica.
//Existem diversos tipos de newton-cotes, como retangulo, Simpson, Simpson 3/8 e mais.
//Para esse projeto foi escolhido o método do trápezios:
//Formula  ∫(a até b) f(x) dx ≈ (h/2) * [ f(x0) + 2*(f(x1) + f(x2) + ... + f(x(n-1))) + f(xn) ]
// a - Inicionio do intervalo    b - Fim do intervalo  
// n - Número de SubIntervalos Quanto maior mais preciso e mais demorado
// h = (b-a)/n      
// x0 = a          
// xn = b             
// xi = a + i*h   (para i = 1 até n-1)
//Retornado a resposta da formula.
function newtonCotes(obj,a,b,n)
{
    let h = (b-a)/n
    let valoresX = []
    for(let i = 0;i<n+1;i++){
        valoresX[i] = a + h*i
    }
    let somatoria = 0
    for(let i =1;i<n;i++){
        somatoria += Number(substituirX(obj,valoresX[i]))
    }
    let x = (Number((substituirX(obj,valoresX[0])) + Number((2*somatoria)) + Number(substituirX(obj,valoresX[n]))) * (h/2))
    return x
}


//Função que calcula os pontos críticos
//Primeiro calcula a derivada da função original (1ª derivada).
//Depois encontra todas as raízes da derivada dentro do intervalo dado.
//Cada raiz representa um ponto crítico (onde a derivada = 0).
//Para cada ponto crítico, calcula o valor da função original nesse ponto, co
//Então calcula a 2ª derivada para classificar o ponto crítico:
//    - Se f''(x) > 0 → Mínimo local
//    - Se f''(x) < 0 → Máximo local
//    - Se f''(x) = 0 → Indeterminado (não pode concluir pela 2ª derivada)
//Retorna um vetor contendo: [x crítico, f(x), tipo do ponto crítico]

function pontoCritico(exp,i,f)
{
    let derivada = tombo(exp)
    if(i == ''){
        i = -100
    }
    if(f == ''){
        f = 100
    }
    i = Number(i)
    f = Number(f)
    let raiz = acharTodasRaizes(derivada,i,f)
    let res = []
    if(raiz.length == 0) return res = "Não tem ponto critico"
    for(let r of raiz){
        let y = substituirX(exp,r)
        let derivada2 = tombo(tombo(exp))
        let f2 = substituirX(derivada2,r)
        let tipo = ""
        if(f2 === 0) tipo = "Indeterminada"
        else if(f2 > 0) tipo = "Minimo"
        else if(f2 < 0) tipo = "Máximo"
        res.push(`Pc (${r},${y}) - ${tipo}`)
    }
    return res.join("\n")
}

//Função que encontra uma raiz da função usando o método da Bissecção.
//O método da bissecção exige que f(a) e f(b) tenham sinais opostos.
//O intervalo [a, b] é repetidamente subdividido ao meio até:
//    - Encontrar ponto onde f(x) é suficientemente próximo de 0
//    - Ou atingir o máximo de iterações permitidas.
//A cada iteração escolhe o subintervalo onde há mudança de sinal.
//O processo converge para uma raiz real devido ao Teorema do Valor Intermediário.
//Se não houver mudança de sinal no intervalo inicial, retorna 0.
//Ao final, retorna a raiz aproximada com tolerância pré-definida.

function bisseccao(inicio,fim,obj){
    let fInicio = substituirX(obj,inicio)
    let fFim = substituirX(obj,fim)

    if(fInicio * fFim > 0) return 0
    
    let meio = (inicio+fim)/2
    let fMeio = substituirX(obj,meio)
    let iteracao = 0
    const maxite = 1000
    const tolerancia = 0.0001
    
    while(Math.abs(fMeio) > tolerancia  && iteracao < maxite){
        
        
        if(Math.sign(fMeio)  == Math.sign(fInicio)){
            inicio = meio      
            fInicio = fMeio
        }
        else fim = meio  
        
        meio = (inicio+fim)/2
        fMeio = substituirX(obj,meio)

        iteracao++
    }

    if(iteracao >=maxite){
        console.log("Falha na convergencia");
        return;
    }
    return meio
}

//Função que encontra todas as raízes reais dentro de um intervalo.
//Percorre o intervalo de início até fim usando passos pequenos (passo = 0.1 por padrão).
//A cada par de pontos consecutivos [x, x+passo], verifica se houve troca de sinal:
//    - Se f(x) e f(x+passo) têm sinais diferentes, existe raiz no intervalo.
//Quando encontra possível raiz, chama a bisseção para refinar a aproximação.
//As raízes encontradas são adicionadas ao vetor 'raizes'.
//Retorna um vetor com todas as raízes aproximadas detectadas no intervalo.
function acharTodasRaizes(obj, inicio, fim, passo = 1) {
    let raizes = [];

    for (let x = inicio; x < fim; x += passo) {
        let a = x
        let b = x+passo

        if (Math.sign(substituirX(obj, a)) != Math.sign(substituirX(obj, b))) {
            let r = bisseccao(a, b, obj)
            if (r != undefined) {
                let res = Math.round(r)
                if(!raizes.includes(res)){
                    raizes.push(res);
                }
            }
        }
    }
    return raizes;
}