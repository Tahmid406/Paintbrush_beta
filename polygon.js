class Shape {
  constructor(radius, inset, sides) {
    this.radius = radius;
    this.innerRadius = radius * inset;
    this.sides = sides;
    // this.position = { x: 0, y: 0 };
    this.startangle = -PI / 2;
  }
  draw(position) {
    beginShape();
    for (let i = 0; i < this.sides; i++) {
      vertex(
        position.x + this.radius * cos(this.startangle),
        position.y + this.radius * sin(this.startangle)
      );
      this.startangle += PI / this.sides;
      vertex(
        position.x + this.innerRadius * cos(this.startangle),
        position.y + this.innerRadius * sin(this.startangle)
      );
      this.startangle += PI / this.sides;
    }
    endShape(CLOSE);
  }
}
