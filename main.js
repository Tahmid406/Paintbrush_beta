let initialValues = {};
let slider = {};
let angle = 0;
let msdown = false;
let canvasWidth = innerWidth * 0.8;

let rotationSpeed = 00;
let colorPicker;
let eraser;

let gap1 = (innerWidth - canvasWidth) / 10;
let gap2 = (innerWidth - canvasWidth) / 2 + gap1 - 20;

function setup() {
  //Set Ranges
  let ranges = {
    radius: [1, 75],
    inset: [0.01, 1],
    sides: [2, 20],
    "rotation speed": [-0.3, 0.3],
    offset: [-50, 50],
  };

  //Set Random initial values
  initialValues.radius = floor(random(ranges.radius[0], ranges.radius[1] + 1));
  initialValues.inset = floor(random(ranges.inset[0] * 100, ranges.inset[1] * 100)) / 100;
  initialValues.sides = floor(random(ranges.sides[0], ranges.sides[1] + 1));
  initialValues["rotation speed"] =
    floor(random(ranges["rotation speed"][0] * 100 - 1, ranges["rotation speed"][1] * 100 + 1)) /
    100;
  initialValues.offset = 0;

  //create sliders
  createNewSlider(
    "radius",
    canvasWidth + gap1,
    100,
    ranges.radius[0],
    ranges.radius[1],
    initialValues.radius,
    1
  );
  createNewSlider(
    "inset",
    canvasWidth + gap2,
    100,
    ranges.inset[0],
    ranges.inset[1],
    initialValues.inset,
    0.01
  );
  createNewSlider(
    "sides",
    canvasWidth + gap1,
    200,
    ranges.sides[0],
    ranges.sides[1],
    initialValues.sides,
    1
  );
  createNewSlider(
    "rotation Speed",
    canvasWidth + gap2,
    200,
    ranges["rotation speed"][0],
    ranges["rotation speed"][1],
    initialValues["rotation speed"],
    0.01
  );
  createNewSlider(
    "offset",
    canvasWidth + gap1,
    300,
    ranges.offset[0],
    ranges.offset[1],
    initialValues.offset,
    1
  );

  //pick color
  colorPicker = createColorPicker(
    `rgb(${floor(random(1, 256))}, ${floor(random(1, 256))}, ${floor(random(1, 256))})`
  )
    .position(canvasWidth + gap1 + 80, 380)
    .style("background", "transparent")
    .style("border", "none");
  colorPicker.label = createP("Set Color")
    .position(canvasWidth + gap1, 370)
    .style("color", "white");

  //eraser
  eraser = createCheckbox("eraser", false)
    .position(canvasWidth + gap1, 420)
    .style("color", "white");

  createCanvas(canvasWidth, innerHeight);
  newShape = new Shape(initialValues.radius, initialValues.inset, initialValues.sides);
  noStroke();

  //set shadow for every element
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = "black";
  rotationSpeed = initialValues["rotation speed"];

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
  slider["offset"].elt.addEventListener("mousemove", () => {
    slider["offset"].printValue.elt.innerText = slider["offset"].value();
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
      newShape.draw({ x: slider.offset.value(), y: slider.offset.value() });

      angle += rotationSpeed;
    }
    pop();
  }
  drawingContext.clearRect(0, 0, 165, 160);
  newShape.draw({ x: 75, y: 75 });
}
