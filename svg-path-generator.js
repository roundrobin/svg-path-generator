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
    
    
    if(op === 'C'){
        cx = el[5];
    cy = el[6];
    }
    if(op === 'Q' || op === 'S'){
        cx = el[3];
        cy = el[4];

    }
  if(op === 'H'){
        cx = el[1];

    }
  if(op === 'V'){
        cy = el[1];

    }    

    this.canvas.append("circle")
    .attr({
      r: 5,
      cx: cx,
      cy: cy,
      fill: "#FF00FF",
      class: "pointers",
      opacity: "0"
    });
    
  }
  this.path.attr("d",this.pathWay());
}

Path.prototype.showPoints  = function(){
  this.canvas.selectAll(".pointers")
        .attr({opacity: "1"});
  
}
Path.prototype.hidePoints  = function(){
  this.canvas.selectAll(".pointers")
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