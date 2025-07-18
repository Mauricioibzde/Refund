const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")
// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
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
// captura o evento de submite do formulario
form.onsubmit = (e) => {
  //previne comportamento padrao de auto carregamento da pagina
e.preventDefault()
//criando o objeto com todos os detalhes da lista
const newExpense = {
  id: new Date().getTime(),
  expense: expense.value,
  category_id: category.value,
  category_name: category.options[category.selectedIndex].text,
  amount: amount.value,
  created_at: new Date(),

}
 expenseAdd(newExpense)
 

}



function expenseAdd(newExpense) {
  try {
   // Cria o elemento de li para adionar o item na lista.
   const expenseItem = document.createElement("li")
   expenseItem.classList.add("expensse")
  //Cria o icone da categoria
  const expenseIcon = document.createElement("img")
  expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`)
  expenseIcon.setAttribute("alt", newExpense.category_name)

  //Adiciona as informacoes no item.
  expenseItem.append(expenseIcon)
  //Adiciona o item na lista
  expenseList.appendChild(expenseItem)


  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas.")
    console.log(error)
  }
  
  
}









