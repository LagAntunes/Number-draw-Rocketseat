//Captura os elementos do Form
const form = document.getElementById("form-draw");
const text = document.querySelector(".text");
const fieldset = document.querySelector("fieldset");
const numberTotal = document.getElementById("numberTotal");
const numberMin = document.getElementById("numberMin");
const numberMax = document.getElementById("numberMax");
const checkboxWrapper = document.querySelector(".checkbox-wrapper");
const checkbox = document.getElementById("checkbox");
const button = document.querySelector(".button");
const buttonSpan = document.querySelector(".button span");

//Contador de resultados
let count = 0;

//Captura os valores gerados pelas informações do form
form.onsubmit = function (event) {
  event.preventDefault();

  count++;

  let minValue = Number(numberMin.value);
  let maxValue = Number(numberMax.value);
  let totalNumbers = Number(numberTotal.value);
  let uniqueNumbers = checkbox.checked;

  let numbersBetween = [];

  if (minValue < maxValue) {
    for (let number = minValue; number <= maxValue; number++) {
      numbersBetween.push(number);
    }

    let selectedValues = [];

    // Evita loop infinito
    if (uniqueNumbers && totalNumbers > numbersBetween.length) {
      alert("Você pediu mais números únicos do que existem no intervalo!");
      return;
    }

    //Gera os números aleatórios
    while (selectedValues.length < totalNumbers) {
      let randomIndex = Math.floor(Math.random() * numbersBetween.length);
      let randomValue = numbersBetween[randomIndex];

      if (uniqueNumbers) {
        if (!selectedValues.includes(randomValue)) {
          selectedValues.push(randomValue);
        }
      } else {
        selectedValues.push(randomValue);
      }
    }

    //Esconde os campos do form após o sorteio
    text.style.display = "none";
    fieldset.style.display = "none";
    checkboxWrapper.style.display = "none";

    //Remove o resultado anterior
    let result = document.querySelector(".results");
    if (result) {
      result.remove();
    }

    //Cria os resultados
    createResults(selectedNumber(selectedValues), resultTextWrapper(count));

    //Muda o texto do botão
    buttonSpan.textContent = "Sortear novamente";

    //Cria o botão de restart
    restartButton();
  } else {
    alert("O valor mínimo deve ser menor que o valor máximo");
  }
};

//Cria o texto do resultado no DOM
function resultTextWrapper(count) {
  const innerTitle = document.createElement("strong");
  innerTitle.classList.add("label-medium");
  innerTitle.textContent = "Resultado do sorteio";
  const innerText = document.createElement("p");
  innerText.classList.add("paragraph-large");
  innerText.textContent = `${count}º resultado`;
  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add("result-wrapper");
  resultWrapper.appendChild(innerTitle);
  resultWrapper.appendChild(innerText);
  return resultWrapper;
}

//Cria os números selecionados no DOM
function selectedNumber(numbers) {
  const ul = document.createElement("ul");
  ul.classList.add("selected-number");
  numbers.forEach((number) => {
    const li = document.createElement("li");
    li.classList.add("overline");
    li.textContent = number;
    ul.appendChild(li);
  });
  return ul;
}

//Cria os resultados no DOM
function createResults(results, resultTextWrapper) {
  const div = document.createElement("div");
  div.classList.add("results");
  div.appendChild(resultTextWrapper);
  div.appendChild(results);
  form.prepend(div);
}

function restartButton() {
  //Verifica se o botão de restart já existe
  let existingButton = document.querySelector(".restart-button");
  //Se existir, não cria novamente
  if (existingButton) return;

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("button-wrapper");
  const buttonRestart = document.createElement("button");
  buttonRestart.classList.add("restart-button");
  const span = document.createElement("span");
  span.classList.add("label-medium");
  span.textContent = "Escolha outros números";
  buttonRestart.appendChild(span);
  buttonWrapper.appendChild(buttonRestart);
  form.append(buttonWrapper);
  buttonRestart.addEventListener("click", () => {
    fieldset.style.display = "flex";
    checkboxWrapper.style.display = "flex";
    buttonSpan.textContent = "Sortear";
    buttonWrapper.remove();
  });
}
