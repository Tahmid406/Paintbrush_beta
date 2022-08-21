const createNewSlider = (name, posx, posy, minValue, maxValue, intital_value, jump) => {
  slider[name] = createSlider(minValue, maxValue, intital_value, jump).position(posx, posy);
  slider[name].style("width", ((innerWidth - canvasWidth) / 2 - 50).toString() + "px");
  slider[name].label = createP(name.charAt(0).toUpperCase() + name.slice(1)).style(
    "color",
    "white"
  );
  slider[name].label.position(posx, posy - 40);
  slider[name].printValue = createP(slider[name].value().toString()).style("color", "white");
  slider[name].printValue.position(posx, posy + 10);
};
