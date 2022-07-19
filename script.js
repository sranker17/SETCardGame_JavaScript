const btnChoose = document.querySelector("#choose");
const playerCount = document.querySelector("#player-count");
const playersDiv = document.querySelector("#players");
const start = document.querySelector("#start");
const competitionSetting = document.querySelector("#competition");
const trainingSetting = document.querySelector("#training");
const settings = document.querySelector("#settings");
const main = document.querySelector("#main");
const table = document.querySelector("table");
const gameDiv = document.querySelector("#game");
const callSETBtn = document.querySelector("#set");
const playerList = document.querySelector("div#game ul");
const gameBtns = document.querySelector("div#buttons");
const hasSETBtn = document.querySelector("#hasSET");
const showSETBtn = document.querySelector("#showSET");
const SETChecker = document.querySelector("#SET-checker");
const SETShower = document.querySelector("#SET-shower");
const moreSET = document.querySelector("#moreSET");
const separately = document.querySelector("#separately");
const automatically = document.querySelector("#automatically");
const endDiv = document.querySelector("#end");
const endUl = document.querySelector("div#end ul");
const cardCount = document.querySelector("#cardCount");
const bCenter = document.querySelector("#b-center");
const time = document.querySelector("#time");

endDiv.style.display = "none";
start.disabled = true;
gameDiv.style.display = "none";
moreSET.style.display = "none";
let players = [];
let matrix;
let startTime;
let row = 4;
let selected = 0;
let playerSelected = 0;
let first = undefined;
let second = undefined;
let third = undefined;
let currentPlayer;
let futurePlayer;
let buttonCount = 0;
let was = [];
let timerID;

const cards = [
  {
    Form: "diamond",
    Color: "green",
    Number: 1,
    Picture: "1SgD.svg",
  },
  {
    Form: "diamond",
    Color: "green",
    Number: 2,
    Picture: "2SgD.svg",
  },
  {
    Form: "diamond",
    Color: "green",
    Number: 3,
    Picture: "3SgD.svg",
  },
  {
    Form: "diamond",
    Color: "red",
    Number: 1,
    Picture: "1SrD.svg",
  },
  {
    Form: "diamond",
    Color: "red",
    Number: 2,
    Picture: "2SrD.svg",
  },
  {
    Form: "diamond",
    Color: "red",
    Number: 3,
    Picture: "3SrD.svg",
  },
  {
    Form: "diamond",
    Color: "purple",
    Number: 1,
    Picture: "1SpD.svg",
  },
  {
    Form: "diamond",
    Color: "purple",
    Number: 2,
    Picture: "2SpD.svg",
  },
  {
    Form: "diamond",
    Color: "purple",
    Number: 3,
    Picture: "3SpD.svg",
  },
  {
    Form: "wavy",
    Color: "green",
    Number: 1,
    Picture: "1SgS.svg",
  },
  {
    Form: "wavy",
    Color: "green",
    Number: 2,
    Picture: "2SgS.svg",
  },
  {
    Form: "wavy",
    Color: "green",
    Number: 3,
    Picture: "3SgS.svg",
  },
  {
    Form: "wavy",
    Color: "red",
    Number: 1,
    Picture: "1SrS.svg",
  },
  {
    Form: "wavy",
    Color: "red",
    Number: 2,
    Picture: "2SrS.svg",
  },
  {
    Form: "wavy",
    Color: "red",
    Number: 3,
    Picture: "3SrS.svg",
  },
  {
    Form: "wavy",
    Color: "purple",
    Number: 1,
    Picture: "1SpS.svg",
  },
  {
    Form: "wavy",
    Color: "purple",
    Number: 2,
    Picture: "2SpS.svg",
  },
  {
    Form: "wavy",
    Color: "purple",
    Number: 3,
    Picture: "3SpS.svg",
  },
  {
    Form: "oval",
    Color: "green",
    Number: 1,
    Picture: "1SgP.svg",
  },
  {
    Form: "oval",
    Color: "green",
    Number: 2,
    Picture: "2SgP.svg",
  },
  {
    Form: "oval",
    Color: "green",
    Number: 3,
    Picture: "3SgP.svg",
  },
  {
    Form: "oval",
    Color: "red",
    Number: 1,
    Picture: "1SrP.svg",
  },
  {
    Form: "oval",
    Color: "red",
    Number: 2,
    Picture: "2SrP.svg",
  },
  {
    Form: "oval",
    Color: "red",
    Number: 3,
    Picture: "3SrP.svg",
  },
  {
    Form: "oval",
    Color: "purple",
    Number: 1,
    Picture: "1SpP.svg",
  },
  {
    Form: "oval",
    Color: "purple",
    Number: 2,
    Picture: "2SpP.svg",
  },
  {
    Form: "oval",
    Color: "purple",
    Number: 3,
    Picture: "3SpP.svg",
  },
];

btnChoose.addEventListener("click", NOPlayers);

function NOPlayers() {
  if (playerCount.value > 0 && playerCount.value < 11) {
    start.disabled = false;
    playersDiv.innerHTML = "";
    for (let i = 1; playerCount.value >= i; i++) {
      const label = document.createElement("label");
      label.innerHTML = `Játékos ${i}: `;
      const input = document.createElement("input");
      input.value = `Játékos${i}`;
      const br = document.createElement("br");
      playersDiv.appendChild(label);
      playersDiv.appendChild(input);
      playersDiv.appendChild(br);
    }
  }
}

competitionSetting.addEventListener("change", Gamemode);
trainingSetting.addEventListener("change", Gamemode);

function Gamemode() {
  settings.style.display = trainingSetting.checked ? "block" : "none";
}

start.addEventListener("click", startClick);

function startClick() {
  startTime = Date.now();
  gameDiv.style.display = "block";
  main.style.display = "none";
  const inputs = document.querySelectorAll("div#players input");
  inputs.forEach((element) => {
    players.push(element.value);
    const li = document.createElement("li");
    li.innerHTML = element.value + ": 0";
    playerList.appendChild(li);
  });
  matrix = cards;
  shuffle(matrix);
  create();
  cardCount.innerHTML = "Kártyák száma: " + matrix.length;
  matrix.forEach((e) => console.log(e));
  if (trainingSetting.checked) {
    if (!SETChecker.checked) hasSETBtn.style.display = "none";
    if (!SETShower.checked) showSETBtn.style.display = "none";
    if (separately.checked) moreSET.style.display = "block";
  } else if (competitionSetting.checked) {
    hasSETBtn.style.display = "none";
    showSETBtn.style.display = "none";
    moreSET.style.display = "none";
    automatically.checked = true;
  }
  if (playerCount.value == 1) {
    //singleplayer
    callSETBtn.style.display = "none";
    delegate(table, "click", "td", click);
  }
}

showSETBtn.addEventListener("click", showSET);

function showSET() {
  let indexes = [];
  let stop = false;
  for (let i = 0; row * 3 - 2 > i && matrix.length - 2 > i && !stop; i++) {
    for (
      let j = i + 1;
      row * 3 - 1 > j && matrix.length - 1 > j && !stop;
      j++
    ) {
      for (let k = j + 1; row * 3 > k && matrix.length > k && !stop; k++) {
        if (
          ((matrix[i].Color === matrix[j].Color &&
            matrix[i].Color === matrix[k].Color &&
            matrix[j].Color === matrix[k].Color) ||
            (matrix[i].Color !== matrix[j].Color &&
              matrix[i].Color !== matrix[k].Color &&
              matrix[j].Color !== matrix[k].Color)) &&
          ((matrix[i].Form === matrix[j].Form &&
            matrix[i].Form === matrix[k].Form &&
            matrix[j].Form === matrix[k].Form) ||
            (matrix[i].Form !== matrix[j].Form &&
              matrix[i].Form !== matrix[k].Form &&
              matrix[j].Form !== matrix[k].Form)) &&
          ((matrix[i].Number === matrix[j].Number &&
            matrix[i].Number === matrix[k].Number &&
            matrix[j].Number === matrix[k].Number) ||
            (matrix[i].Number !== matrix[j].Number &&
              matrix[i].Number !== matrix[k].Number &&
              matrix[j].Number !== matrix[k].Number))
        ) {
          indexes = [i, j, k];
          stop = true;
        }
      }
    }
  }
  table.innerHTML = "";
  let counter = 0;
  for (let i = 0; row > i && matrix.length / 3 > i; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; 3 > j; j++) {
      const td = document.createElement("td");
      const img = document.createElement("img");
      img.src = `cards/${matrix[counter++].Picture}`;
      td.appendChild(img);
      if (
        counter - 1 === indexes[0] ||
        counter - 1 === indexes[1] ||
        counter - 1 === indexes[2]
      ) {
        td.style.border = "3px solid chartreuse";
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

moreSET.addEventListener("click", moreSET_func);

function moreSET_func() {
  row++;
  create();
}

hasSETBtn.addEventListener("click", hasSETBtn_func);

function hasSETBtn_func() {
  if (hasSET) {
    alert("Van SET");
  } else {
    alert("Nincs SET");
  }
}

callSETBtn.addEventListener("click", callSET);

function callSET() {
  playerSelected = 0;
  delegate(playerList, "click", "li", playerClick);
}

function playerClick(e) {
  const li = e.delegatedTarget;
  if (playerSelected === 0) {
    currentPlayer = e.delegatedTarget;
    futurePlayer = li.innerHTML;
    let ITT_futurePlayer = futurePlayer;
    let point = parseInt(futurePlayer.slice(-2));
    if (point >= 0) {
      ITT_futurePlayer = futurePlayer.slice(0, -2);
    } else {
      ITT_futurePlayer = futurePlayer.slice(0, -3);
    }
    if (!alreadyWas(ITT_futurePlayer)) {
      li.innerHTML = `<strong>${li.innerHTML}</strong>`;
      delegate(table, "click", "td", click);
      playerSelected++;
      if (playerCount.value != 1) timerID = setTimeout(timer, 10000);
    }
  }
}

function timer() {
  let point = parseInt(futurePlayer.slice(-2));
  let ITT_futurePlayer = futurePlayer;
  if (point > -1) {
    point--;
    currentPlayer.innerHTML = futurePlayer.slice(0, -2) + " " + point;
    ITT_futurePlayer = futurePlayer.slice(0, -2);
  } else {
    point--;
    currentPlayer.innerHTML = futurePlayer.slice(0, -2) + point;
    ITT_futurePlayer = futurePlayer.slice(0, -3);
  }
  was.push(ITT_futurePlayer);
  first = undefined;
  second = undefined;
  third = undefined;
  const tds = document.querySelectorAll("table td");
  tds.forEach((e) => (e.style.border = ""));
  selected = 0;
  buttonCount = 0;
  delegate(table, "click", "td", click);

  alert("Az idő lejárt!");
}

function click(e) {
  if (playerCount.value == 1) {
    const gameLi = document.querySelector("div#game ul li");
    currentPlayer = gameLi;
    futurePlayer = gameLi.innerHTML;
  }
  const td = e.delegatedTarget;
  if (td.style.border === "3px solid orange" && selected !== 3) {
    if (td.style.border === "3px solid chartreuse")
      td.style.border = "3px solid chartreuse";
    else td.style.border = "";
    if (first === td.parentElement.rowIndex * 3 + td.cellIndex)
      first = undefined;
    else if (second === td.parentElement.rowIndex * 3 + td.cellIndex)
      second = undefined;
    if (selected > 0) selected--;
  } else if (
    selected !== 3 &&
    (first === undefined || first >= 0) &&
    (second === undefined || second >= 0) &&
    (third === undefined || third >= 0)
  ) {
    td.style.border = "3px solid orange";
    if (
      first === undefined &&
      td.parentElement.rowIndex * 3 + td.cellIndex >= 0
    )
      first = td.parentElement.rowIndex * 3 + td.cellIndex;
    else if (
      second === undefined &&
      td.parentElement.rowIndex * 3 + td.cellIndex >= 0
    )
      second = td.parentElement.rowIndex * 3 + td.cellIndex;
    else if (
      third === undefined &&
      td.parentElement.rowIndex * 3 + td.cellIndex >= 0
    )
      third = td.parentElement.rowIndex * 3 + td.cellIndex;
    if (td.parentElement.rowIndex * 3 + td.cellIndex >= 0) selected++;
  }
  if (selected === 3) {
    clearTimeout(timerID);
    let firstProp = false;
    let secondProp = false;
    let thirdProp = false;
    if (
      matrix[first].Color === matrix[second].Color &&
      matrix[first].Color === matrix[third].Color &&
      matrix[second].Color === matrix[third].Color
    )
      firstProp = true;
    else if (
      matrix[first].Color !== matrix[second].Color &&
      matrix[first].Color !== matrix[third].Color &&
      matrix[second].Color !== matrix[third].Color
    )
      firstProp = true;
    if (
      matrix[first].Form === matrix[second].Form &&
      matrix[first].Form === matrix[third].Form &&
      matrix[second].Form === matrix[third].Form
    )
      secondProp = true;
    else if (
      matrix[first].Form !== matrix[second].Form &&
      matrix[first].Form !== matrix[third].Form &&
      matrix[second].Form !== matrix[third].Form
    )
      secondProp = true;
    if (
      matrix[first].Number === matrix[second].Number &&
      matrix[first].Number === matrix[third].Number &&
      matrix[second].Number === matrix[third].Number
    )
      thirdProp = true;
    else if (
      matrix[first].Number !== matrix[second].Number &&
      matrix[first].Number !== matrix[third].Number &&
      matrix[second].Number !== matrix[third].Number
    )
      thirdProp = true;
    if (firstProp && secondProp && thirdProp) {
      let point = parseInt(futurePlayer.slice(-2));
      if (point >= 0) {
        point++;
        currentPlayer.innerHTML = futurePlayer.slice(0, -2) + " " + point;
      } else {
        point++;
        currentPlayer.innerHTML = futurePlayer.slice(0, -2) + point;
      }
      let sequence = [first, second, third];
      let temp;
      for (let i = 0; i < sequence.length; i++) {
        for (let j = i + 1; j < sequence.length; j++) {
          if (sequence[i] > sequence[j]) {
            temp = sequence[i];
            sequence[i] = sequence[j];
            sequence[j] = temp;
          }
        }
      }
      matrix.splice(sequence[0], 1);
      matrix.splice(sequence[1] - 1, 1);
      matrix.splice(sequence[2] - 2, 1);
      if (row > 4) row--;
      create();
      was = [];
    } else {
      let ITT_futurePlayer = futurePlayer;
      let point = parseInt(futurePlayer.slice(-2));
      if (point > -1) {
        point--;
        currentPlayer.innerHTML = futurePlayer.slice(0, -2) + " " + point;
        ITT_futurePlayer = futurePlayer.slice(0, -2);
      } else {
        point--;
        currentPlayer.innerHTML = futurePlayer.slice(0, -2) + point;
        ITT_futurePlayer = futurePlayer.slice(0, -3);
      }
      was.push(ITT_futurePlayer);
    }
    first = undefined;
    second = undefined;
    third = undefined;
    const tds = document.querySelectorAll("table td");
    tds.forEach((e) => (e.style.border = ""));
    selected = 0;
    buttonCount = 0;
    if (playerCount.value != 1) {
      delegate(table, "click", "td", click);
    }
    cardCount.innerHTML = "Kártyák száma: " + matrix.length;
    if (was.length === parseInt(playerCount.value)) {
      was = [];
    }
  }
}

function shuffle(array) {
  let tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}

function create() {
  table.innerHTML = "";
  let counter = 0;
  for (let i = 0; row > i && matrix.length / 3 > i; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; 3 > j; j++) {
      const td = document.createElement("td");
      const img = document.createElement("img");
      img.src = `cards/${matrix[counter++].Picture}`;
      td.appendChild(img);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  if (!hasSET() && matrix.length < 12) {
    if (competitionSetting.checked)
      time.innerHTML =
        "Eltelt idő: " + Math.floor((Date.now() - startTime) / 1000) + " mp";
    alert("A játéknak vége");
    gameDiv.style.display = "none";
    endDiv.style.display = "block";
    endUl.innerHTML = playerList.innerHTML;
  }
}

function hasSET() {
  let result = false;
  for (let i = 0; row * 3 - 2 > i && matrix.length - 2 > i; i++) {
    for (let j = i + 1; row * 3 - 1 > j && matrix.length - 1 > j; j++) {
      for (let k = j + 1; row * 3 > k && matrix.length > k; k++) {
        if (
          ((matrix[i].Color === matrix[j].Color &&
            matrix[i].Color === matrix[k].Color &&
            matrix[j].Color === matrix[k].Color) ||
            (matrix[i].Color !== matrix[j].Color &&
              matrix[i].Color !== matrix[k].Color &&
              matrix[j].Color !== matrix[k].Color)) &&
          ((matrix[i].Form === matrix[j].Form &&
            matrix[i].Form === matrix[k].Form &&
            matrix[j].Form === matrix[k].Form) ||
            (matrix[i].Form !== matrix[j].Form &&
              matrix[i].Form !== matrix[k].Form &&
              matrix[j].Form !== matrix[k].Form)) &&
          ((matrix[i].Number === matrix[j].Number &&
            matrix[i].Number === matrix[k].Number &&
            matrix[j].Number === matrix[k].Number) ||
            (matrix[i].Number !== matrix[j].Number &&
              matrix[i].Number !== matrix[k].Number &&
              matrix[j].Number !== matrix[k].Number))
        ) {
          result = true;
        }
      }
    }
  }
  if (!result && matrix.length > 12 && automatically.checked) {
    row++;
    create();
  }
  return result;
}

function alreadyWas(name) {
  let result = false;
  let i = 0;
  while (!result && was.length !== i) {
    if (name === was[i]) result = true;
    i++;
  }
  return result;
}

function delegate(parent, type, selector, fn) {
  function delegatedFunction(e) {
    if (e.target.matches(`${selector},${selector} *`)) {
      let target = e.target;
      while (!target.matches(selector)) target = target.parentNode;
      e.delegatedTarget = target;
      return fn(e);
    }
  }
  parent.addEventListener(type, delegatedFunction, false);
}
