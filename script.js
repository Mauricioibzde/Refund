const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")
// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuatity = document.querySelector("aside header p span")
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


//Adiciona um novo item na lista.
function expenseAdd(newExpense) {
  try {
   // Cria o elemento de li para adionar o item na lista.
   const expenseItem = document.createElement("li")
   expenseItem.classList.add("expense")
  //Cria o icone da categoria
  const expenseIcon = document.createElement("img")
  expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`)
  expenseIcon.setAttribute("alt", newExpense.category_name)

  //Cria a info da despesa.
  const expenseInfo = document.createElement("div")
  expenseInfo.classList.add("expense-info")

  //Cria nome da despesa.
  const expenseName = document.createElement("strong")
  expenseName.textContent = newExpense.expense

  //Cria a categoria da despesa.

  const expenseCategory = document.createElement("span")
  expenseCategory.textContent = newExpense.category_name

  //Adiciona nome e categoria na div das informacoes da despesa ou seja expenseInfo.

  expenseInfo.append(expenseName, expenseCategory)


//Criar o valor da despesa.
  
  const expenseAmount = document = document.createElement("small")
  expenseAmount.classList.add("expense-amount")
  expenseAmount.innerHTML = `
  <small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}
  `
 //Cria o icone de remover 
 const removeIcon = document.createElement("img")
 removeIcon.classList.add("remove-icon")
 removeIcon.setAttribute("src", "img/remove.svg")
 removeIcon.setAttribute("alt", "remover")



  //Adiciona as informacoes no item.
  expenseItem.append(expenseIcon , expenseInfo, expenseAmount , removeIcon)
  //Adiciona o item na lista
  expenseList.appendChild(expenseItem)

  //Atualiza os totais.
  updateTotals()


  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas.")
    console.log(error)
  }
  
  
}

// Atualizar os totais.

function updateTotals(){
  try {
   // Recupera todos os itens (li) da lista (ul)
   const items = expenseList.children
   // Atualiza a quatidade de itens da lista.
   expensesQuatity.textContent = `${items.length} ${
    items.length > 1 ? "despesas" : "despesa"}`
  } catch(error) {
    console.log(error)
    alert("Não foi possivel atualizar os totais.")
  }
}











