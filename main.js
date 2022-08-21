let slider = {};
let angle = 0;
let msdown = false;
let canvasWidth = innerWidth * 0.8;

let rotationSpeed = 0.1;
let colorPicker;
let eraser;

let gap1 = (innerWidth - canvasWidth) / 10;
let gap2 = (innerWidth - canvasWidth) / 2 + gap1 - 20;

function setup() {
  //create sliders
  createNewSlider("radius", canvasWidth + gap1, 100, 1, 75, 50, 1);
  createNewSlider("inset", canvasWidth + gap2, 100, 0.01, 1, 0.25, 0.01);
  createNewSlider("sides", canvasWidth + gap1, 200, 2, 20, 5, 1);
  createNewSlider("rotation Speed", canvasWidth + gap2, 200, -0.3, 0.3, 0.1, 0.01);

  //pick color
  colorPicker = createColorPicker("rgb(0, 255, 0)")
    .position(canvasWidth + gap1 + 80, 280)
    .style("background", "transparent")
    .style("border", "none");
  colorPicker.label = createP("Set Color")
    .position(canvasWidth + gap1, 270)
    .style("color", "white");

  //eraser
  eraser = createCheckbox("eraser", false)
    .position(canvasWidth + gap1, 320)
    .style("color", "white");

  createCanvas(canvasWidth, innerHeight);
  newShape = new Shape(50, 0.25, 5);
  noStroke();

  //set shadow for every element
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = "black";

  //draw shape
  window.addEventListener("mousedown", (e) => (msdown = true));
  window.addEventListener("mouseup", (e) => (msdown = false));

  //slider events
  slider.radius.elt.addEventListener("mousemove", () => {
    newShape.radius = slider.radius.value();
    newShape.innerRadius = slider.inset.value() * newShape.radius;
    slider.radius.printValue.elt.innerText = slider.radius.value();
  });
  slider.inset.elt.addEventListener("mousemove", () => {
    newShape.innerRadius = slider.inset.value() * newShape.radius;
    slider.inset.printValue.elt.innerText = slider.inset.value();
  });
  slider.sides.elt.addEventListener("mousemove", () => {
    newShape.sides = slider.sides.value();
    slider.sides.printValue.elt.innerText = slider.sides.value();
  });
  slider["rotation Speed"].elt.addEventListener("mousemove", () => {
    rotationSpeed = slider["rotation Speed"].value();
    slider["rotation Speed"].printValue.elt.innerText = slider["rotation Speed"].value();
  });
}

function draw() {
  fill(colorPicker.color());
  if (msdown && mouseX < canvasWidth) {
    push();
    translate(mouseX, mouseY);
    if (eraser.checked()) {
      drawingContext.clearRect(
        -newShape.radius / 2,
        -newShape.radius / 2,
        newShape.radius,
        newShape.radius
      );
    } else {
      rotate(angle);
      newShape.draw({ x: 0, y: 0 });

      angle += rotationSpeed;
    }
    pop();
  }
  drawingContext.clearRect(0, 0, 165, 160);
  newShape.draw({ x: 75, y: 75 });
}
