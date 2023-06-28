const colors = [
    "rgb(0,0,255)",
    "rgb(155,16,187)",
    "rgb(0,147,0)",
    "rgb(255,0,0)",
    "rgb(255,128,0)",
  ],
  itemLetterFront = document.getElementById("item-letter-front"),
  colorItems = itemLetterFront.querySelectorAll(
    "#item-letter-front span.color-switch"
  ),
  balises = [...document.querySelectorAll(".balise")];

function colorSwitch(target) {
  const color = target.dataset.color;
  if (!colors.includes(color)) colors.push(color);
  target.dataset.color = colors.shift();
  target.style.color = target.dataset.color;
  return colorCheck();
}

function colorCheck() {
  var isCorrect = true;
  colorItems.forEach((item) => {
    if (item.dataset.color !== item.dataset.valid) isCorrect = false;
  });
  return isCorrect;
}

function colorEnd(isCorrect) {
  if (isCorrect) {
    colorItems.forEach((item) => {
      item.style.color = "";
      item.classList.remove("color-switch");
    });
    nav.querySelector('div[data-item="letter-back"').classList.remove("hidden");
    nextStep(1);
  }
}

function scrollLetter(target) {
  if (target.dataset.direction === "up") scrollLetterFront -= 100;
  else if (target.dataset.direction === "down") scrollLetterFront += 100;
  if (scrollLetterFront < 0) scrollLetterFront = 0;
  else if (scrollLetterFront > scrollLetterFrontMax)
    scrollLetterFront = scrollLetterFrontMax;
  sealSvg.style.transform = "rotate(" + scrollLetterFront / 10 + "deg)";
}
