game.station = new Object();
var fist = 0;
game.station.prototype = function(){

}
game.station.init = function(){
  game.station.parts = new Array;
  game.station.addedParts = new Array;
  game.station.partxyz = new Array;
  var iteration = 10;
  for(var i = 0; i < Math.pow(2,iteration); i++){
    this.partxyz[i-(Math.pow(2,iteration)/2)+1] = new Array;
    for(var k = 0; k<Math.pow(2,iteration); k++){
      this.partxyz[i-(Math.pow(2,iteration)/2)+1][k-(Math.pow(2,iteration)/2)+1] = new Array;
    }
  }
  game.station.part = function part(geometry, material, x,y,z, initfunc){
    this.connections = new Array;
    this.exists = true;
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
    this.mesh.part = this;
    this.position = new Object();
    this.ui = new Object();
    this.ui.width = 200;
    this.ui.height = 150;
    this.position.pos = new THREE.Vector3(x,y,z);
    this.position.set = function set(x,y,z){
      this.position.pos = new THREE.Vector3(x,y,z);
      this.mesh.position.x = x;
      this.mesh.position.y = y;
      this.mesh.position.z = z;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
    this.name = "Crew Cabin";
    this.o2 = 100;
    this.reciveo2 = true;
    this.sendo2 = true;
    this.personcount = 0;
    this.o2loss = 0;
    this.co2 = 0;
    this.updateModual = function(){};
    this.addToUI = function(){};
    this.add = function add(thingtoadd){
      thingtoadd.add(this.mesh);
    }
    this.initUI = function(event){
      var menu = document.getElementById("menu");
      var ui = this.ui;
      menu.style.left = event.clientX + 'px';
      menu.style.top = event.clientY + 'px';
      menu.style.width = ui.width + 'px';
      menu.style.height = ui.height + 'px';
      menu.hidden = false;
      menu.style.backgroundColor = "#0C0C0C";
      menu.style.background = "-webkit-linear-gradient(-45deg,#101010,#1C1C1C)";
      menu.style.background = "-moz-linear-gradient(-45deg,#101010,#1C1C1C)";
      menu.style.borderRadius = "5px";
      menu.style.boxShadow = "0px 0px 0px 2pt #444444";
      menu.style.color = "#18CC22";
      if(typeof menu.elements === 'undefined'){
        menu.elements = new Array;
      } else {
        menu.cleanUp();
      }
      menu.cleanUp = function(){
        var i;
        while(this.hasChildNodes()){
          this.removeChild(this.elements[0]);
          this.elements.splice(i++ - 1, 1);
        }
      }
      var name = document.createElement("p");
      name.textContent = this.name;
      name.style.fontSize = "18px";
      name.style.fontWeight = "bold";
      menu.appendChild(name);
      menu.elements.push(name);
      var o2level = document.createElement("p");
      this.o2level = o2level;
      o2level.textContent = "O" + String.fromCharCode(0x2082) + " Level = " + this.o2;
      menu.elements.push(o2level);
      menu.appendChild(o2level);
      var disableo2 = document.createElement("div");
      var disableo2Text = document.createElement("p");
      disableo2Text.style.display = "inline-block";
      disableo2Text.textContent = "Recive O" + String.fromCharCode(0x2082);
      disableo2.appendChild(disableo2Text);
      var disableo2Button = document.createElement("button");
      disableo2Button.className = "uibutton";
      disableo2Button.textContent = this.sendo2.toString();
      var partindex = game.station.parts.indexOf(this);
      disableo2Button.onclick = function(){
        game.station.parts[partindex].reciveo2 = !game.station.parts[partindex].reciveo2;
        this.textContent = game.station.parts[partindex].reciveo2.toString();
      }
      disableo2.appendChild(disableo2Button);
      menu.elements.push(disableo2);
      menu.appendChild(disableo2);
      this.addToUI(this, menu);
    }
    if(typeof initfunc !== 'undefined'){
      initfunc(this);
    }
    this.update = function(){
      this.o2 -= 0.00001 * this.personcount + this.o2loss;
      this.co2 += 0.00001 * this.personcount;
      if(this.reciveo2 === true && this.o2 < 99.95){
        var o2suck = new Array;
        if(typeof this.connections[0] !== 'undefined'){
          if(this.connections[0].sendo2 && this.connections[0].o2 > 0.05){
            o2suck.push(this.connections[0]);
          }
        }
        if(typeof this.connections[1] !== 'undefined'){
          if(this.connections[1].sendo2 && this.connections[1].o2 > 0.05){
            o2suck.push(this.connections[1]);
          }
        }
        if(typeof this.connections[2] !== 'undefined'){
          if(this.connections[2].sendo2 && this.connections[2].o2 > 0.05){
            o2suck.push(this.connections[2]);
          }
        }
        if(typeof this.connections[3] !== 'undefined'){
          if(this.connections[3].sendo2 && this.connections[3].o2 > 0.05){
            o2suck.push(this.connections[3]);
          }
        }
        if(typeof this.connections[4] !== 'undefined'){
          if(this.connections[4].sendo2 && this.connections[4].o2 > 0.05){
            o2suck.push(this.connections[4]);
          }
        }
        if(typeof this.connections[5] !== 'undefined'){
          if(this.connections[5].sendo2 && this.connections[5].o2 > 0.05){
            o2suck.push(this.connections[5]);
          }
        }
        if(o2suck.length > 0){
          for(var i = 0; i<o2suck.length; i++){
            o2suck[i].o2 -= 0.05/o2suck.length;
            var o2test = this.o2;
            while(o2test === this.o2){
              this.o2 += 0.05/o2suck.length;
              if(fist < 5){
                fist++;
              }
            }
          }
        }
      }
      if(this.co2level > 100){
        this.co2level = 100;
      }
      if(this.o2 < 0){
        this.o2 = 0;
      }
      this.o2 = Math.round( this.o2 * 100000) / 100000;
      if(typeof this.o2level !== 'undefined'){
        this.o2level.textContent = "O" + String.fromCharCode(0x2082) + " Level = " + this.o2;
      }
      this.co2 = Math.round( this.co2 * 100000) / 100000;
      if(typeof this.co2level !== 'undefined'){
        this.co2level.textContent = "CO" + String.fromCharCode(0x2082) + " Level = " + this.co2;
      }
      this.updateModual(this);
    }
  }
  var part = new game.station.part(
  new THREE.CubeGeometry(1,1,1),
  new THREE.MeshPhongMaterial({color:0xFFBB88}),0, 0, 0,
  function(part){
    part.personcount = 2;
    part.updateModual = function(part){

    }
    part.addToUI = function(part, menu){
      var personCount = document.createElement("p");
      personCount.textContent = "Person Count = " + part.personcount;
      menu.appendChild(personCount);
      menu.elements.push(personCount);
      var co2level = document.createElement("p");
      co2level.textContent = "CO" + String.fromCharCode(0x2082) + " Level = " + this.co2;
      part.co2level = co2level;
      menu.appendChild(co2level);
      menu.elements.push(co2level);
    }
  });
  game.station.addedParts.push(part);
}
game.station.init();
game.station.removePart = function(part){
  var index = this.parts.indexOf(part);
  this.parts.splice(index,1);
  game.scene.remove(part.mesh);
  var x = part.position.pos.x;
  var y = part.position.pos.y;
  var z = part.position.pos.z;
  game.station.partxyz[x][y][z] = null;
  if(typeof game.station.partxyz[x][y-1][z] !== 'undefined'){
    game.station.partxyz[x][y-1][z].connections[0] = game.getUndifind();
  }
  if(typeof game.station.partxyz[x][y+1][z] !== 'undefined'){
    game.station.partxyz[x][y+1][z].connections[1] = game.getUndifind();
  }
  if(typeof game.station.partxyz[x+1][y][z] !== 'undefined'){
    game.station.partxyz[x+1][y][z].connections[2] = game.getUndifind();
  }
  if(typeof game.station.partxyz[x-1][y][z] !== 'undefined'){
    game.station.partxyz[x-1][y][z].connections[3] = game.getUndifind();
  }
  if(typeof game.station.partxyz[x][y][z-1] !== 'undefined'){
    game.station.partxyz[x][y][z-1].connections[4] = game.getUndifind();
  }
  if(typeof game.station.partxyz[x][y][z+1] !== 'undefined'){
    game.station.partxyz[x][y][z+1].connections[5] = game.getUndifind();
  }
}
game.station.update = function() {
  var size = this.addedParts.length;
  if(size > 0){
    for (var i = 0; i < size; i++) {
      var part = this.addedParts[i];
      if(typeof part !== 'undefined'){
        part.add(game.scene);
        game.station.parts.push(part);
        var x = part.position.pos.x;
        var y = part.position.pos.y;
        var z = part.position.pos.z;
        game.station.partxyz[x][y][z] = part;
        part.connections[0] = game.station.partxyz[x][y+1][z];
        part.connections[1] = game.station.partxyz[x][y-1][z];
        part.connections[2] = game.station.partxyz[x-1][y][z];
        part.connections[3] = game.station.partxyz[x+1][y][z];
        part.connections[4] = game.station.partxyz[x][y][z+1];
        part.connections[5] = game.station.partxyz[x][y][z-1];
        if(typeof game.station.partxyz[x][y-1][z] !== 'undefined'){
          game.station.partxyz[x][y-1][z].connections[0] = part;
        }
        if(typeof game.station.partxyz[x][y+1][z] !== 'undefined'){
          game.station.partxyz[x][y+1][z].connections[1] = part;
        }
        if(typeof game.station.partxyz[x+1][y][z] !== 'undefined'){
          game.station.partxyz[x+1][y][z].connections[2] = part;
        }
        if(typeof game.station.partxyz[x-1][y][z] !== 'undefined'){
          game.station.partxyz[x-1][y][z].connections[3] = part;
        }
        if(typeof game.station.partxyz[x][y][z-1] !== 'undefined'){
          game.station.partxyz[x][y][z-1].connections[4] = part;
        }
        if(typeof game.station.partxyz[x][y][z+1] !== 'undefined'){
          game.station.partxyz[x][y][z+1].connections[5] = part;
        }
      }
      game.station.addedParts.splice(i,1);
    }
  }
  size = this.parts.length;
  if(size > 0){
    for (var i = 0; i < size; i++) {
      var part = this.parts[i];
      part.update();
    }
  }
};
