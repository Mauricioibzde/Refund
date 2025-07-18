const amount = document.querySelector("#amount")
//Capturando o evento de input para formatar o valor
amount.oninput = () => { 
    // obtem o valor do input e remove os carcters nao numericos
  let value = amount.value.replace(/\D/g,"") // expressao regex para remover letras e substituir por nada
  //transformar valor em centavos (exemplo 150/100 1.5 = 1,50R$)
  value = Number(value) / 100
  
  
  //atualizando valor do input 
  amount.value = formatCurrencyBRL(value)

}

function formatCurrencyBRL(value) {
    //formatando o valor no padrao BRL (Real Brasileiro)
  value = value.toLocaleString("pt-BR", {
    style:"currency",
    currency:"BRL"
  })
  return value
}


