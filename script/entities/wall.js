class Wall
{
   constructor(v1, v2, v3, v4, color)
   {
      //Set verices
      this.vertices = 
      [
         v1, v2, v3, v4
      ];
      this.bounds =
      [
         new Line(v1.x, v1.y, v2.x, v2.y),
         new Line(v2.x, v2.y, v3.x, v3.y),
         new Line(v3.x, v3.y, v4.x, v4.y),
         new Line(v4.x, v4.y, v1.x, v1.y),
      ];

      //Set color
      if (color == null)
      {
         //this.color = color(255, 255, 255);
      }
      else
      {
         this.color = color;
      }
   }

   draw()
   {
      fill(this.color);
      noStroke();
      quad(this.vertices[0].x, this.vertices[0].y,
           this.vertices[1].x, this.vertices[1].y,
           this.vertices[2].x, this.vertices[2].y,
           this.vertices[3].x, this.vertices[3].y);
   }
}