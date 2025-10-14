const operadores = ["/","*","-","+"];
const incognitas = ["x","y","z"];
const numeros = ["0","1","2","3","4","5","6","7","8","9"];

document.getElementById("btn").addEventListener("click",()=>{
    let formula = document.getElementById("formula").value;
    let tamanho = formula.length;
    let contador = 0;
    let valor = " ";
    let variavel = " ";
    let potencia= " "
 
    let elementosFodas = [];
    let elemento={
        "valor":valor,
        "variavel":variavel,
        "potencia":potencia

    };
    for(contador = 0;contador<=tamanho;contador++){    
        let letra = formula[contador];


        if(!operadores.includes(letra)){
          
        if(incognitas.includes(letra)){
            variavel += letra;
            if(!numeros.includes(formula[contador-1])){
                valor = 1;
            }
            if(!numeros.includes(formula[contador+1])){
                potencia = 1;
            }
            else{
                potencia = formula[contador+1]
            }
        }
        if(!isNaN(letra)){
            valor += letra;
        }        
        }
        else{
            elemento = {
                "valor": valor,
                "variavel":variavel,
                "potencia":potencia
            }

            elementosFodas.push(elemento)
            elementosFodas.push(formula[contador])
            variavel = ""
            valor = ""
        }
    }
    
    const resposta = document.getElementById("respostas");
    const divResposta = document.createElement("div");
    divResposta.id = "divResposta";
    divResposta.textContent = `${elemento.valor} ${elemento.variavel} ${elemento.potencia}`
    resposta.appendChild(divResposta);
    console.log(elementosFodas);
})