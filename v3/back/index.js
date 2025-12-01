import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors"
let app = express();
app.use(cors());
app.use(express.json())
    let valores =[];

function limpaFormula(formula) {
  // Especificadores proibidos
  const especificadores = ["∫", "Bs", "Pc", "√", "NC", "´", "´´"];

  let resultado = formula;

  // 1) Trocar ** por ^
  resultado = resultado.replace(/\*\*/g, "^");

  // 2) Remover todos os especificadores
  // Ordem importa: primeiro os de 2 caracteres
  especificadores.forEach(spec => {
    // Escapar caracteres especiais para uso em regex
    const escaped = spec.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "g");
    resultado = resultado.replace(regex, "");
  });

  return resultado;
}

app.post("/envio/string",(req,res)=>{
    let formula = req.body.formula;
    let conta = req.body.conta;
    let resultado = req.body.resultado
    console.log(conta)
  
      let obj={
        conta: conta,
        formula:limpaFormula(formula),
        resultado: resultado
    }
    console.log(obj);
  
    valores.push(obj);
})

app.get("/receber/string",(req,res)=>{
    console.log(valores);

    res.json(valores)
})

app.listen(3000,()=>{
    console.log("servidor funcionando")
})


