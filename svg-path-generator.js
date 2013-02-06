function Path(canvas, path){
  this.canvas = canvas;
  this.dataPoints = [];
  
  if(path != undefined){
      this.path = path;
  
  } else {
    
    this.path = this.canvas.append('svg:path')
    .attr("stroke","black")
    .attr("stroke-width",3)
    .attr("fill","none");
  
  }
   
}
Path.prototype.el  = function(wayPoint){
  return this.path;  
}

Path.prototype.add  = function(wayPoint){
  this.dataPoints.push(wayPoint);

}


Path.prototype.canvas  = function(){
   return this.canvas;
}


Path.prototype.render  = function(){
  var cx = 0, cy = 0;
  for(var i=0; i < this.dataPoints.length; i++){
    var el = this.dataPoints[i];
    var op = el[0];

    if(op === 'M' || op === 'L' || op === 'm' || op === 'T'){
      cx = el[1];
      cy = el[2];
    }

    if(op === 'l' || op === 't'){
      cx =  cx + el[1];
      cy =  cy + el[2];
    }    

    if(op === 'q' || op === 's'){
      cx =  cx + el[3];
      cy =  cy + el[4];
    }

    if(op === 'c'){
      cx =  cx + el[5];
      cy =  cy + el[6];
    }

    if(op === 'v'){
      cy =  cy + el[1];
    }

    if(op === 'h'){
      cx =  cx + el[1];
    }


    if(op === 'A'){
      cx = el[6];
      cy = el[7];
    }

    if(op === 'a'){
      cx = cx + el[6];
      cy = cy + el[7];
    }


    if(op === 'C'){
  
      this.canvas.append('line')
      .attr({
        stroke: "green",
        "stroke-width":1,
        fill: "none",
        x1: cx,
        x2: el[1],
        y1: cy,
        y2: el[2],
        class: "line"        
      });

      cx = el[5];
      cy = el[6];
      
      this.canvas.append("circle")
      .attr({
        r: 2,
        cx: el[1],
        cy: el[2],
        fill: "#FF0000",
        class: "pointers",
        opacity: "1" 
      })

      this.canvas.append("circle")
      .attr({
        r: 2,
        cx: el[3],
        cy: el[4],
        fill: "#FF0000",
        class: "pointers",
        opacity: "1" 
      })

      this.canvas.append('line')
      .attr({
        stroke: "green",
        "stroke-width":1,
        fill: "none",
        x1: cx,
        x2: el[3],
        y1: cy,
        y2: el[4],
        class: "line"                
      });      



      }
      if(op === 'Q' || op === 'S'){
        cx = el[3];
        cy = el[4];

        this.canvas.append("circle")
        .attr({
          r: 2,
          cx: el[1],
          cy: el[2],
          fill: "#FF0000",
          class: "pointers",
          opacity: "1" 
        })

        this.canvas.append('line')
        .attr({
          stroke: "green",
          "stroke-width":1,
          fill: "none",
          x1: cx,
          x2: el[1],
          y1: cy,
          y2: el[2],
          class: "line"                   
        });

    }
    if(op === 'H'){
      cx = el[1];

    }
    if(op === 'V'){
      cy = el[1];

    }    
  var self = this;
    var drag = d3.behavior.drag()
    .on("drag", function(d,i){
      var elem = d3.select(this).datum();
      var it = self.dataPoints[elem.index];
      console.log('draggin',it);
      
      if(it[0] === 'l' || it[0] === 'm'){
        self.dataPoints[elem.index][1] += d3.event.dx;
      self.dataPoints[elem.index][2] += d3.event.dy;
      }
      //
      //self.render()
      //self.showPoints()

    }) 
    .on("dragstart", function(d, i) {})
    .on("dragend", function(d, i) {
      self.canvas.selectAll('.line').remove();
      self.canvas.selectAll('.pointers').remove();
      self.render()});
    
     
    this.canvas.append("circle")
    .attr({
      r: 5,
      cx: cx,
      cy: cy,
      fill: "#FFF583",
      class: "pointers",
      opacity: "1" 
    })
    .call(drag)
    .datum({type: el, index: i});
    
  }
  this.path.attr("d",this.pathWay());
}

Path.prototype.read  = function(string_delta){
     this.dataPoints = [];
  
}


Path.prototype.showPoints  = function(){
  this.canvas.selectAll(".pointers")
        .attr({opacity: "1"});
  
}
Path.prototype.hidePoints  = function(){
  this.canvas.selectAll(".pointers")
        .attr({opacity: "0"});

  this.canvas.selectAll(".line")
        .attr({opacity: "0"});        
  
}

Path.prototype.pathWay  = function(){
  var way = '';
  
  for(var i=0; i < this.dataPoints.length; i++){
    var elem = this.dataPoints[i];
      way += elem.join(' ');
  }
  return way;
} 

