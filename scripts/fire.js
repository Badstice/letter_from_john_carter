let startX = 0,
  startY = 0,
  deltaX = 0,
  deltaY = 0,
  currentX = 0,
  currentY = 0;

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
  var transformMatrix = getComputedStyle(fire).getPropertyValue("transform");
  if (transformMatrix && transformMatrix !== "none") {
    var matrixValues = transformMatrix.split(",");
    currentX = parseInt(matrixValues[4]);
    currentY = parseInt(matrixValues[5]);
  }
  fire.addEventListener("touchmove", handleTouchMove);
  fire.addEventListener("touchend", handleTouchEnd);
}

function handleTouchMove(event) {
  event.preventDefault();
  main.classList.remove("end");
  deltaX = event.touches[0].clientX - startX;
  deltaY = event.touches[0].clientY - startY;
  var newX = currentX + deltaX;
  var newY = currentY + deltaY;
  fire.style.transform = "translate(" + newX + "px, " + newY + "px)";
  var balise = document.elementFromPoint(
    event.changedTouches[0].pageX,
    event.changedTouches[0].pageY
  );
  console.log(balise);
  if (
    balise?.classList.contains("balise") &&
    balise.dataset.check === "false"
  ) {
    balise.dataset.check = "true";
    if (balises.every((b) => b.dataset.check === "true")) {
      end();
    }
  }
}

function handleTouchEnd(event) {
  currentX += deltaX;
  currentY += deltaY;
  fire.removeEventListener("touchmove", handleTouchMove);
  fire.removeEventListener("touchend", handleTouchEnd);
  main.classList.add("end");
}

fire.addEventListener("touchstart", handleTouchStart);

function end() {
  document.querySelector("#secret-message svg g g").style.fill = "rgb(200,0,0)";
  document.querySelector("#end-message").classList.remove("hidden");
}
