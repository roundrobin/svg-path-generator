function Path(canvas, path){
  
  this.dataPoints = [];
  
  if(path != undefined){
      this.path = path;
  
  } else {
    
    this.path = canvas.append('svg:path')
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

Path.prototype.render  = function(){
  	
   this.path.attr("d",this.pathWay());
}

Path.prototype.pathWay  = function(){
  var way = '';
  
  for(var i=0; i < this.dataPoints.length; i++){
    var elem = this.dataPoints[i];
    	way += elem.join(' ');
  }
  return way;
} 