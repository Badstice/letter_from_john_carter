const points = [
    ...document.querySelectorAll("#address-container .line div[data-elmt]"),
  ],
  screenLetters = [...document.querySelectorAll("[data-sletter]")];

let elmts = [
  {
    letter: "F",
    points: ["1", "2", "3", "4", "6", "7", "9", "11"],
  },
  {
    letter: "E",
    points: ["1", "2", "3", "4", "6", "7", "9", "11", "12", "13"],
  },
  {
    letter: "U",
    points: ["1", "3", "4", "5", "6", "8", "9", "10", "11", "12", "13"],
  },
];

function switchElmts(target) {
  const classList = target.classList;
  if (elmts.length > 0) {
    classList.toggle("hidden");
    if (step == 1) {
      for (let i = 0; i < elmts.length; i++) {
        const elmt = elmts.shift();
        if (
          points.every(
            (e) =>
              elmt.points.includes(e.dataset.elmt) !==
              e.classList.contains("hidden")
          )
        ) {
          document
            .querySelector(
              `#item-letter-back .letter[data-letter="${elmt.letter}"`
            )
            ?.classList.remove("hidden");
          points.forEach((e) =>
            setTimeout(() => {
              e.classList.add("hidden");
            }, 1000)
          );
        } else {
          elmts.push(elmt);
        }
      }
    } else {
      resetItem(target);
    }
  }
}

function displayLetter(target) {
  const l = screenLetters.find((e) => !e.dataset.sletter);
  l.dataset.sletter = target.dataset.letter;
  l.innerHTML = target.dataset.letter;
  if (screenLetters.every((e) => e.dataset.sletter)) {
    if (screenLetters.map((e) => e.dataset.sletter).join("") === "FEU") {
      endOfLetter();
    } else {
      screenLetters.forEach((e) => {
        setTimeout(() => {
          e.dataset.sletter = "";
          e.innerHTML = "";
        }, 1500);
      });
    }
  }
}

function endOfLetter() {
  if (grid.classList.contains("hidden")) nextStep(3);
  else nextStep(2);
  main.classList.add("end");
  fire.classList.remove("hidden");
}
