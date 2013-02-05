svg-path-generator
==================

A simple class for a simple creation of svg path language 



HOW-TO USE
==========

```
var svg = d3.select("svg");
var path = new Path(svg)
path.add(['m',200,100]);
path.add(['l',100,100]);
path.add(['v',50]);
path.add(['h',50]);
path.add(['q',50,50,30,80]);
path.add(['c',50,50,30,80,50,90]);
path.add(['t',-50,-50]);
path.add(['s',50,100,-130,-80]);

path.add(['a',50,50,1, 1,1,-71,50]);
path.add(['A',5,5,1, 1,1,100,153]);

  
path.render();
path.showPoints()   
```
