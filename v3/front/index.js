export function simplificarFracao(fr) {
    let n = Number(fr[0]);
    let d = Number(fr[2]);

    if (d === 1) return n.toString();
    if (n % d === 0) return (n / d).toString();

    return `${n}/${d}`;
}

export function printExpr(e) {
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
        return e.join(" ");
    }

    return e
}

const operacoes = {
  "^": (a, b) => a ** b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
};

export class Expressoes {
  constructor(coeficiente, variavel, potencia) {
    this.coeficiente = coeficiente;
    this.variavel = variavel;
    this.potencia = potencia;
  }
}


export function tombo(exp){
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

export function integralTombo(exp){
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

export function substituirX(exp,x){
    let obj = structuredClone(exp)
    for(let i =0;i<obj.length;i++){
        if(!(obj[i] instanceof Object)) continue
        if(obj[i].variavel == null){
            obj[i] = Number((obj[i].coeficiente[0]/obj[i].coeficiente[2])**(obj[i].potencia[0]/obj[i].potencia[2]))
        }
        else{
            obj[i].variavel = x
            obj[i] = Number((obj[i].coeficiente[0]/obj[i].coeficiente[2])*(obj[i].variavel**(obj[i].potencia[0]/obj[i].potencia[2])))
        }
    }
    let ops1 = ["^", "**"];
    let ops2 = ["*", "/", "%"];
    let ops3 = ["+", "-"];
    
    obj = niveis(obj,ops1)
    obj = niveis(obj,ops2)
    obj = niveis(obj,ops3)

    return obj[0]
}

export function niveis(obj,ops){
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

export function newtonCotes(obj,a,b,n){
    let h = (b-a)/n
    let valoresX = []
    for(let i = 0;i<n+1;i++){
        valoresX[i] = a + h*i
    }
    let somatoria = 0
    for(let i =1;i<n;i++){
        somatoria += substituirX(obj,valoresX[i])
    }
    let x = (Number((substituirX(obj,valoresX[0])) + Number((2*somatoria)) + Number(substituirX(obj,valoresX[n]))) * (h/2))
    return x
}

export function pontoCritico(exp,i,f)
{
    let derivada = tombo(exp)
    if(i == null){
        i = -100
    }
    if(f == null){
        f = 100
    }
    let raiz = acharTodasRaizes(derivada,i,f)
    let res = []
    for(let r of raiz){
        let y = substituirX(exp,r)
        let derivada2 = tombo(tombo(exp))
        let f2 = substituirX(derivada2,r)
        let tipo = ""
        if(f2 === 0) tipo = "Indeterminada"
        else if(f2 > 0) tipo = "Minimo"
        else if(f2 < 0) tipo = "Máximo"

        res.push(`Pc (${r},${y}) - ${tipo}`);
    }

    return res.join("\n")
}

export function bisseccao(inicio,fim,obj){
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

export function acharTodasRaizes(obj, inicio, fim, passo = 0.1) {
    let raizes = [];

    for (let x = inicio; x < fim; x += passo) {
        let a = x;
        let b = x + passo;

        if (Math.sign(substituirX(obj, a)) !== Math.sign(substituirX(obj, b))) {
            let r = bisseccao(a, b, obj);
            if (r !== undefined) raizes.push(Math.floor(r));
        }
    }

    return raizes;
}
