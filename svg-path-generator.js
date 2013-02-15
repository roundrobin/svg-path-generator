function Path(canvas, path){
  this.canvas = canvas;
  this.dataPoints = [];
  
  if(path != undefined){
      this.path = path;
  
  } else {
    

    var transform = { transform: "translate("+[0,0]+")", class: "path-group" };
    this.canvas = canvas.append("g").attr(transform);
        
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


Path.prototype.canvasDOM  = function(){
   return this.canvas;
}

Path.prototype.close  = function(){
   this.dataPoints.push(['z'  ]);
}
Path.prototype.start  = function(){
   this.dataPoints.push(['m',0,0]);
}


Path.prototype.render  = function(){
    var attrGenericLine = {
        stroke: "green",
        "stroke-width":1,
        fill: "none",
        'class' : 'line',
        opacity: 0
    };

    var attrGenericCircle = {
        fill: "yellow",
        class: "pointers",
        opacity: 0,
        r : 7,
        'class' : 'pointers'
    };

  var cx = 0, cy = 0;


  for(var i=0; i < this.dataPoints.length; i++){

    var el = this.dataPoints[i];
    var op = el[0];

    if(op === 'l' || op === 't'){
      cx =  cx + el[1];
      cy =  cy + el[2];
    }    

    if(op === 'q' || op === 's'){

      this.canvas.append('line').attr(attrGenericLine).attr({ x1: cx, x2: cx + el[1], y1: cy, y2: cy + el[2]});
      this.canvas.append("circle").attr(attrGenericCircle).attr({ cx: cx + el[1], cy: cy + el[2]});

      cx =  cx + el[3];
      cy =  cy + el[4];

      
    }

    if(op === 'c'){

      this.canvas.append('line').attr(attrGenericLine).attr({ x1: cx, x2: cx + el[1], y1: cy, y2: cy + el[2]});
      this.canvas.append("circle").attr(attrGenericCircle).attr({ cx: cx + el[1], cy: cy + el[2]});

      this.canvas.append('line').attr(attrGenericLine).attr({ x1: cx + el[5], x2: cx + el[3], y1: cy + el[6], y2: cy + el[4]});
      this.canvas.append("circle").attr(attrGenericCircle).attr({ cx: cx + el[5], cy: cy + el[6]});

      cx =  cx + el[5];
      cy =  cy + el[6];
    }

    if(op === 'v'){
      cy =  cy + el[1];
    }

    if(op === 'h'){
      cx =  cx + el[1];
    }


    if(op === 'M' || op === 'L' || op === 'm' || op === 'T'){
      cx = el[1];
      cy = el[2];
    }


    if(op === 'a'){
      cx = cx + el[6];
      cy = cy + el[7];
    }

    if(op === 'A'){
      cx = el[6];
      cy = el[7];
    }


    if(op === 'C'){
  
      this.canvas.append('line')
      .attr(attrGeneric)
      .attr({ x1: cx, x2: el[1], y1: cy, y2: el[2]});

      cx = el[5];
      cy = el[6];

      this.canvas.append("circle").attr(attrGenericCircle).attr({ cx: el[1], cy: el[2]});
      this.canvas.append("circle").attr(attrGenericCircle).attr({ cx: el[3], cy: el[4]});
      this.canvas.append('line').attr(attrGenericLine).attr({ x1: cx, x2: el[3], y1: cy, y2: el[4]});

    }

    if(op === 'Q' || op === 'S'){
        cx = el[3];
        cy = el[4];

        this.canvas.append("circle").attr(attrGenericCircle).attr({ cx: el[1], cy: el[2]});
        this.canvas.append('line').attr(attrGenericLine).attr({ x1: cx, x2: el[3], y1: cy, y2: el[4]});
        this.canvas.append('line').attr(attrGenericLine).attr({ x1: cx, x2: el[1], y1: cy, y2: el[2]});
    }
    if(op === 'H'){
      cx = el[1];

    }
    if(op === 'V'){
      cy = el[1];

    }    
    
    this.canvas.append("circle")
    .attr(attrGenericCircle)
    .attr({cx :cx, cy: cy})
    .datum({type: el, index: i});
    
  }
  this.path.attr("d",this.pathWay());
}

Path.prototype.read  = function(string_delta){
     this.dataPoints = [];
  
}

Path.prototype.path  = function(){
     this.path.attr("d"); 
}


Path.prototype.showPoints  = function(){
  this.canvas.selectAll(".pointers")
        .attr({opacity: "1"});

  this.canvas.selectAll(".line")
        .attr({opacity: "1"});           
  
}

Path.prototype.hidePoints  = function(){
  this.canvas.selectAll(".pointers")
        .attr({opacity: "0"});

  this.canvas.selectAll(".line")
        .attr({opacity: "0"});        
  
}

Path.prototype.scale  = function(scaleFactor){
    this.canvas.attr({transform: 'scale('+(scaleFactor)+')'});       
  
}

Path.prototype.pathWay  = function(){
  var way = '';
  
  for(var i=0; i < this.dataPoints.length; i++){
    var elem = this.dataPoints[i];
      way += elem.join(' ');
  }
  return way;
} 

