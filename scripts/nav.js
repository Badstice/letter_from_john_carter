var draggedSquare = null;

const grid = document.getElementById("color-grid-game"),
  row1 = document.getElementById("color-row1"),
  row2 = document.getElementById("color-row2"),
  row3 = document.getElementById("color-row3");

var squares = [...document.getElementsByClassName("color-square")].slice(3, -1);
squares.forEach((e) => {
  e.addEventListener("touchstart", function (event) {
    draggedSquare = event.target;
  });
});

squares.forEach((e) => {
  e.addEventListener("touchmove", function (event) {
    event.preventDefault();
  });
});

squares.forEach((e) => {
  e.addEventListener("touchend", function (event) {
    var targetSquare = document.elementFromPoint(
      event.changedTouches[0].pageX,
      event.changedTouches[0].pageY
    );
    if (isAdjacent(targetSquare, draggedSquare)) {
      var targetColor = getComputedStyle(targetSquare).backgroundColor;
      var draggedColor = getComputedStyle(draggedSquare).backgroundColor;
      var mixedColor = mixColors(targetColor, draggedColor);
      console.log(mixedColor);
      targetSquare.style.backgroundColor = mixedColor;

      if (
        colorDistance(
          mixedColor,
          getComputedStyle(targetSquare.parentElement).backgroundColor
        ) < 20
      ) {
        targetSquare.classList.add("hidden");
        targetSquare.parentElement.dataset.done = "true";
        if (row1.dataset.done === "true") {
          if (row2.dataset.done === "true") {
            if (row3.dataset.done === "true") {
              grid.dataset.step = 3;
              setTimeout(colorgridEnd, 2000);
              return;
            }
            grid.dataset.step = 2;
            return;
          }
          grid.dataset.step = 1;
        }
      }
    }
  });
});

function isAdjacent(square1, square2) {
  var square1Index = Array.prototype.indexOf.call(squares, square1);
  console.log(square1Index);
  var square2Index = Array.prototype.indexOf.call(squares, square2);
  console.log(square2Index);
  var rowDiff = Math.abs(
    Math.floor(square1Index / 3) - Math.floor(square2Index / 3)
  );
  var colDiff = Math.abs((square1Index % 3) - (square2Index % 3));
  return (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 0);
}

function mixColors(color1, color2) {
  // Exemple simple : mélange linéaire des couleurs RGB
  var rgb1 = color1.match(/\d+/g);
  var rgb2 = color2.match(/\d+/g);

  var mixedColor = "rgb(";
  for (var i = 0; i < 3; i++) {
    var component1 = parseInt(rgb1[i]);
    var component2 = parseInt(rgb2[i]);
    var mixedComponent = Math.floor((component1 + component2) / 2);
    mixedColor += mixedComponent;
    if (i < 2) {
      mixedColor += ",";
    }
  }
  mixedColor += ")";

  return mixedColor;
}

function colorDistance(color1, color2) {
  var rgb1 = color1.match(/\d+/g);
  var rgb2 = color2.match(/\d+/g);
  var distance = 0;
  for (var i = 0; i < 3; i++) {
    var component1 = parseInt(rgb1[i]);
    var component2 = parseInt(rgb2[i]);
    distance += Math.abs(component1 - component2);
  }
  return distance;
}

function resetSquares() {
  squares.forEach((s) => {
    s.style.backgroundColor = "";
    s.classList.remove("hidden");
  });
  [row1, row2, row3].forEach((row) => (row.dataset.done = "false"));
  grid.dataset.step = 0;
}

function colorgridEnd() {
  grid.dataset.step = 4;
  document.querySelector('div[data-item="seal"]').classList.remove("hidden");
  setTimeout(() => grid.classList.add("hidden"), 1000);
  if (step === 2) nextStep(3);
}
