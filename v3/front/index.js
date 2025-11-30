
function printExpr(e) {
    for (let i = 0; i < e.length; i++) {
        if(!(e[i] instanceof Object) ||  e[i] == "+" || e[i] == "-" || e[i] == "*" || e[i] == "/") continue
        if(e[i].coeficiente[2] == 1){
            e[i].coeficiente.splice(1,2)
        }
        if(e[i].variavel == null){
            e[i] = e[i].coeficiente
            continue
        }
        if(e[i].potencia[2] == 1){
            e[i].potencia.splice(1,2)
        }
        if(e[i].potencia[0] == 1 && e[i].potencia[2] == 1){
            e[i].potencia = null
        }
        if(e[i].coeficiente[0] == 1 && e[i].coeficiente[2] == 1){
            e[i].coeficiente = null
        }
        if(e[i].potencia == null) e[i].variavel = "x"

        let coef = e[i].coeficiente.join("")
        let vari = e[i].variavel
        let pot = e[i].potencia.join("")

        e[i] = coef+vari+pot
    }
    if(!(e instanceof Array)){
        return e
    }

    return e.join(" ");
}



export class Expressoes {
    constructor(coeficiente, variavel, potencia) {
        this.coeficiente = coeficiente;
        this.variavel = variavel;
        this.potencia = potencia;
    }
}

export function tombo(exp) {
           

    let obj = structuredClone(exp);
    console.log("Resposta que foi enviada: ",obj)
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] === "+" || obj[i] === "-") continue;
        if (obj[i] == null) console.log("INPUT vazio");

        if (obj[i].potencia[0] == 1 && obj[i].potencia[2] == 1) {
            obj[i].potencia = null;
            obj[i].variavel = null;
        } else if (obj[i].variavel == null) obj[i] = 0;
        else {
            obj[i].coeficiente[0] *= obj[i].potencia[0];
            obj[i].coeficiente[2] *= obj[i].potencia[2];
            obj[i].potencia[0] -= (1 * Number(obj[i].potencia[2]));
        }
    }
    return printExpr(obj);
}

export function integralTombo(exp) {
    let obj = structuredClone(exp);
    for (let i = 0; i < obj.length; i++) {
        if (obj[i] === "+" || obj[i] === "-") continue;
        if (obj[i] == null) console.log("INPUT vazio");

        if (obj[i].variavel == null) obj[i].variavel = "x";
        else if (obj[i].potencia == -1) {
            console.log("INPUT inválido");
            return;
        } else {
            obj[i].potencia[0] = Number(obj[i].potencia[0]) + (1 * Number(obj[i].potencia[2]));
            obj[i].coeficiente[2] *= obj[i].potencia[0];
            obj[i].coeficiente[0] *= obj[i].potencia[2];
        }
    }
    return printExpr(obj);
}

export function substituirX(exp, x) {
    let obj = structuredClone(exp);
    for (let i = 0; i < obj.length; i++) {
        if (!(obj[i] instanceof Object)) continue;
        else {
            obj[i].variavel = x;
            obj[i] = (obj[i].coeficiente[0] / obj[i].potencia[2]) *
                     (obj[i].variavel ** (obj[i].potencia[0] / obj[i].potencia[2]));
        }
    }
    let j = 1;
    while (j < obj.length) {
        if (obj[j] === "+") {
            obj[0] = Number(obj[j - 1]) + Number(obj[j + 1]);
            obj.splice(1, 2);
        } else if (obj[j] === "-") {
            obj[0] = obj[j - 1] - obj[j + 1];
            obj.splice(1, 2);
        } else if (obj[j] === "*") {
            obj[0] = obj[j - 1] * obj[j + 1];
            obj.splice(1, 2);
        } else if (obj[j] === "/") {
            obj[0] = obj[j - 1] + obj[j + 1];
            obj.splice(1, 2);
        }
    }
    return printExpr(obj[0]);
}

export function newtonCotes(obj, a, b) {
    let n = 4;
    let h = (b - a) / n;
    let valoresX = [];
    for (let i = 0; i <= n; i++) valoresX[i] = a + h * i;

    let somatoria = 0;
    for (let i = 1; i < n; i++) {
        somatoria += substituirX(obj, valoresX[i]);
    }

    return  (substituirX(obj, valoresX[0]) +
           (2 * somatoria) +
            substituirX(obj, valoresX[n])) * (h / 2);
}

export function bisseccao(inicio, fim, obj) {
    let meio;
    if (substituirX(obj, inicio) * substituirX(obj, fim) >= 0 || inicio >= fim) {
        console.log("Intervalo Invalido");
        return;
    }

    while (true) {
        meio = (inicio + fim) / 2;
        let fMeio = substituirX(obj, meio);
        let fInicio = substituirX(obj, inicio);

        if (Math.abs(fMeio) >= 0.0001) break;

        if (Math.sign(fMeio) === Math.sign(fInicio)) inicio = meio;
        else fim = meio;
    }
    return printExpr(meio);
}
