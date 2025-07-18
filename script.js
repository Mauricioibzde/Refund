const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")
// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
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

  //Limpa o formulario para adionar novo item.

  formClear()

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

    // Variaval oara incrementar o total

    let total = 0

    //Percorrer cada item da (li) da lista (ul)
    for(let item = 0; item < items.length; item++) {
       const itemAmount = items[item].querySelector(".expense-amount")
       //Remover caracteres nao numericos e substitui a virgula pelo ponto
       let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

       //Converte o valor para float.
       value = parseFloat(value)
       
       //Verificar se e um numero valido

       if(isNaN(value)) {
        return alert(
          "Não foi possivel calcular o total. 0 valor não parece ser um numero."
        )
       }

       //Incrementar o valor total.
       total += Number(value)
    }

    //Cria a small para adicionar o R$ formatado

    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"
    //Formata o valor e remove o R$ que sera exibido pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
    //Limpa o conteudo do elemento
    expensesTotal.innerHTML = ""
    //Adiciona o simbolo da moeda e o valor total formatado
    expensesTotal.append(symbolBRL, total)

  } catch(error) {
    console.log(error)
    alert("Não foi possivel atualizar os totais.")
  }
}

//Evento que captura o clique nos itens da lista.

expenseList.addEventListener("click" , function(event) {
  //Vericar se o clique foi no icon de remover.
  if(event.target.classList.contains("remove-icon")) {
    //obtem a li pai do elemento clicado.
    const item = event.target.closest(".expense")
    //Remove o item da lista
    item.remove()
  }

  //Atualiza os totais
  updateTotals()
})

function formClear() {
  //Limpa os inputs.
  expense.value = ""
  category.value = ""
  amount.value = ""
//Foco no amount.
  expense.focus()
}











