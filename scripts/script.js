const nav = document.querySelector("nav"),
  sealSvg = document.querySelector("main #item-seal svg"),
  fire = document.getElementById("fire"),
  main = document.querySelector("main");

let step = 0,
  helpCount = 0,
  scrollLetterFront = 0,
  scrollLetterFrontMax = 0;

document.addEventListener("click", (evt) => {
  const target = evt.target,
    id = target.id,
    nodeName = target.nodeName,
    classList = target.classList;
  console.log(target);
  if (id === "btn-menu") {
    nav.classList.toggle("hidden");
  } else if (classList.contains("color-switch")) {
    colorEnd(colorSwitch(target));
  } else if (classList.contains("btn-scroll")) {
    scrollLetter(target);
  } else if (classList.contains("btn-item")) {
    showItem(target.dataset.item);
  } else if (id === "stamp-miniature") {
    target.classList.add("hidden");
    nav
      .querySelector('.btn-item[data-item="stamp"]')
      .classList.remove("hidden");
  } else if (id === "btn-help") {
    showHelp();
  } else if (target.dataset.elmt) {
    switchElmts(target);
  } else if (step < 2 && target.dataset.letter) {
    displayLetter(target);
  } else if (target.classList.contains("start")) {
    const itemStart = document.getElementById("item-start");
    itemStart.classList.add("hidden");
    setTimeout(() => itemStart.remove(), 10000);
  } else if (id === "square-reset") {
    resetSquares();
  }

  if (classList.contains("helping")) {
    classList.remove("helping");
  }
});

const showItem = (item) => {
  const itemShowed = document.querySelector("main div.item:not(.hidden)");
  const itemIdToShow = "item-" + item;
  if (itemShowed) itemShowed.classList.add("hidden");
  if (itemShowed?.id !== itemIdToShow) {
    var item = document.getElementById(itemIdToShow);
    item.classList.remove("hidden");
    if (item === itemLetterFront) showLetterFront();
  }
};

function initLetterFront() {
  scrollLetterFrontMax = itemLetterFront.scrollHeight;
}

function showLetterFront() {
  itemLetterFront.scrollTop = scrollLetterFront;
}

initLetterFront();

function resetItem(e) {
  setTimeout(() => e.classList.toggle("hidden"), 1000);
}

function nextStep(n) {
  step = n;
  main.dataset.step = n;
  helpCount = 0;
  document
    .querySelectorAll(".helping")
    .forEach((e) => e.classList.remove("helpping"));
}

function toHelp() {
  document
    .querySelectorAll(queryHelping.join(","))
    .forEach((target) => target.classList.add("helping"));
  helpCount += 1;
}

let queryHelping = ['[data-item="letter-front"]', '[data-item="envelope"]'];

function showHelp() {
  if (step === 0) {
    if (helpCount === 0) {
      toHelp();
      queryHelping.push("span.color-switch");
    } else if (helpCount === 1) {
      toHelp();
      queryHelping.push("#envelope-help");
    } else if (helpCount === 2) {
      toHelp();
      queryHelping.push("#stamp-miniature");
    } else {
      toHelp();
    }
  } else if (step === 1) {
    if (helpCount === 0) {
      queryHelping = ['[data-item="letter-back"]', '[data-item="envelope"]'];
      toHelp();
      queryHelping.push("#letter-container");
    } else if (helpCount === 1) {
      toHelp();
      queryHelping.push("#address-container");
    } else if (helpCount === 2) {
      toHelp();
      queryHelping.push("#letter-back-help");
    } else {
      toHelp();
    }
  } else if (step === 2) {
    if (helpCount === 0) {
      queryHelping = ["#btn-menu"];
      toHelp();
    } else {
      toHelp();
    }
  } else if (step === 3) {
    if (helpCount === 0) {
      queryHelping = ['[data-item="letter-front"]', '[data-item="seal"]'];
      toHelp();
    } else if (helpCount === 1) {
      queryHelping.push('[data-direction="down"]');
      toHelp();
    } else if (helpCount === 2) {
      queryHelping.push("#fire");
      toHelp();
    } else {
      toHelp();
    }
  }
}
