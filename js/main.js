//Captura os elementos de texto do Draw
const title = document.querySelector(".text .label-medium");
const text = document.querySelector(".text .paragraph-large");

//Captura os elementos do Form
const form = document.getElementById("form-draw");
const numberTotal = document.getElementById("numberTotal");
const numberMin = document.getElementById("numberMin");
const numberMax = document.getElementById("numberMax");
const checkbox = document.getElementById("checkbox");
const button = document.querySelector(".button");

//Captura os valores gerados pelas informações do form
form.onsubmit = function (event) {
  event.preventDefault();

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
    createResults(selectedNumber(selectedValues));
  } else {
    alert("O valor mínimo deve ser menor que o valor máximo");
  }
};

//Cria os números selecionados no DOM
function selectedNumber(numbers) {
  const div = document.createElement("div");
  div.classList.add("selected-number");
  const span = document.createElement("span");
  span.textContent = numbers;
  div.appendChild(span);
  return div;
}

function createResults(results) {
  const div = document.createElement("div");
  div.classList.add("results");
  div.appendChild(results);
  form.appendChild(div);
}
