game.elemeut = document.getElementById("WebGLCanvas");
game.onMouseDown = function onMouseDown(event) {
  switch(event.which){
    case 1:
      if(!event.shiftKey){
        var mouseVector = new THREE.Vector3(
          2 * (event.clientX/game.canvasWidth)-1,
          1-2*(event.clientY/game.canvasHeight));
        var projector = new THREE.Projector();
        var raycaster = projector.pickingRay(mouseVector.clone(), game.camera);
        var highlightcube = game.scene.getObjectByName("highlightcube");
        game.scene.remove(highlightcube);
        var intersects = raycaster.intersectObjects(game.scene.__objects);
        game.scene.add(highlightcube);
        if(intersects.length > 0){
          var obj = intersects[0].object;
          var pos = obj.position.clone();
          pos.add(intersects[0].face.normal);
          game.station.addedParts.push(new game.station.part(
          new THREE.CubeGeometry(1,1,1),
          new THREE.MeshPhongMaterial({color:game.addColor}),
          pos.x, pos.y, pos.z, game.addFunc));
        }
        game.onMouseMove(event);
      }
      else{
        var mouseVector = new THREE.Vector3(
          2 * (event.clientX/game.canvasWidth)-1,
          1-2*(event.clientY/game.canvasHeight));
        var projector = new THREE.Projector();
        var raycaster = projector.pickingRay(mouseVector.clone(), game.camera);
        var highlightcube = game.scene.getObjectByName("highlightcube");
        game.scene.remove(highlightcube);
        var intersects = raycaster.intersectObjects(game.scene.__objects);
        game.scene.add(highlightcube);
        if(intersects.length > 0){
          var obj = intersects[0].object.part;
          game.station.removePart(obj);
        }
        game.onMouseMove(event);
      }
    break;
    case 2:
    break;
    case 3:
    var mouseVector = new THREE.Vector3(
      2 * (event.clientX/game.canvasWidth)-1,
      1-2*(event.clientY/game.canvasHeight));
    var projector = new THREE.Projector();
    var raycaster = projector.pickingRay(mouseVector.clone(), game.camera);
    var highlightcube = game.scene.getObjectByName("highlightcube");
    game.scene.remove(highlightcube);
    var intersects = raycaster.intersectObjects(game.scene.__objects);
    game.scene.add(highlightcube);
    if(intersects.length > 0){
      var obj = intersects[0].object.part;
      obj.initUI(event);
    }
    break;
    default:
      alert("mouse button is: " + event.which);
  }
  if(!document.getElementById("menu").hidden && event.which !== 3){
    var menu = document.getElementById("menu");
    menu.hidden = true;
  }
}
game.onMouseMove = function onMouseMove(event){
  var movementX = event.movementX ||
    event.mozMovementX            ||
    event.webkitMovementX         ||
    0,
  movementY = event.movementY     ||
    event.mozMovementY            ||
    event.webkitMovementY         ||
    0;
  switch(event.which){
    case 0:
    if(event.clientX < 20){
      game.partmenuleftval = 0;
    }
    if(event.clientX > 50){
      game.partmenuleftval = -50;
    }
    var mouseVector = new THREE.Vector3(
      2 * (event.clientX/game.canvasWidth)-1,
      1-2*(event.clientY/game.canvasHeight));
    var projector = new THREE.Projector();
    var raycaster = projector.pickingRay(mouseVector.clone(), game.camera);
    var highlightcube = game.scene.getObjectByName("highlightcube");
    game.scene.remove(highlightcube);
    var intersects = raycaster.intersectObjects(game.scene.__objects);
    game.scene.add(highlightcube);
    if(intersects.length > 0){
      var highlightcube = game.scene.getObjectByName("highlightcube");
      if(typeof highlightcube === 'undefined'){
        highlightcube = new THREE.Mesh(new THREE.CubeGeometry(1,1,1),new THREE.MeshPhongMaterial({transparent: true, color:0xFFFF88}));
        highlightcube.name = "highlightcube";
        game.scene.add(highlightcube);
      }
      var pos = intersects[0].object.position.clone();
      if(!event.shiftKey){
        pos.add(intersects[0].face.normal);
      }
      highlightcube.position.x = pos.x;
      highlightcube.position.y = pos.y;
      highlightcube.position.z = pos.z;
    } else {
      if(typeof highlightcube !== 'undefined'){
        highlightcube.position.z = 1010;
      }
    }
    break;
    case 1:
    break;
    case 2:
    game.camera.yaw += movementX/100;
    game.camera.pitch += movementY/100;
    if(game.camera.pitch > 0){
      game.camera.pitch = -0.0000001;
    }
    if(game.camera.pitch < -Math.PI){
      game.camera.pitch = -Math.PI;
    }
    break;
    case 3:
    break;
  }
}
game.onScroll = function onScroll(event){
  if(game.mouseDown[1] === 0){
    if(event.wheelDeltaX > 0){
      game.camera.location.y ++;
    }
    if(event.wheelDeltaX < 0){
      game.camera.location.y --;
    }
  }
  if(event.shiftKey){
    if(event.wheelDeltaY > 0){
      game.camera.location.y ++;
    }
    if(event.wheelDeltaY < 0){
      game.camera.location.y --;
    }
  } else {
    if(event.wheelDeltaY > 0){
      game.camera.distance --;
    }
    if(event.wheelDeltaY < 0){
      game.camera.distance ++;
    }
  }
  if(document.getElementById("menu").isopen === true){
    var menu = document.getElementById("menu");
    menu.isopen = false;
    menu.style.left = 0 + 'px';
    menu.style.top = 20000 + 'px';
  }
}
game.onKeyPress = function onKeyPress(event){
  if(!event.altKey){
    switch(event.which){
      case 87:
        game.camera.location.x += Math.cos(game.camera.yaw);
        game.camera.location.z += Math.sin(game.camera.yaw);
      break;
      case 83:
        game.camera.location.x -= Math.cos(game.camera.yaw);
        game.camera.location.z -= Math.sin(game.camera.yaw);
      break;
      case 65:
        game.camera.location.x += Math.cos(game.camera.yaw - Math.PI/2);
        game.camera.location.z += Math.sin(game.camera.yaw - Math.PI/2);
      break;
      case 68:
        game.camera.location.x += Math.cos(game.camera.yaw + Math.PI/2);
        game.camera.location.z += Math.sin(game.camera.yaw + Math.PI/2);
      break;
      default :
      break;
    }
  }
}
game.updateInputManager = function updateInputManager(){
  if(typeof game.scene.getObjectByName("highlightcube") !== 'undefined'){
    game.scene.getObjectByName("highlightcube").material.opacity = 0.4 + Math.sin(new Date().getTime() * 0.0035)/3;
  }
  game.camera.update();
  if(game.partmenuleftval !== game.actualpartmenuleftval){
    if(typeof game.actualpartmenuleftval === 'undefined'){
      game.actualpartmenuleftval = game.partmenuleftval;
      partmenu.style.left = game.partmenuleftval + "px";
    } 
    else {
      if(game.partmenuleftval > game.actualpartmenuleftval){
        game.actualpartmenuleftval += 5;
      }
      if(game.partmenuleftval < game.actualpartmenuleftval){
        game.actualpartmenuleftval -= 5;
      }
      partmenu.style.left = game.actualpartmenuleftval + "px";
    }
  }
  for(var i = 0; i<partmenu.info.elements.length; i++){
    var element = partmenu.info.elements[i];
    var marginTop = (element.position + partmenu.info.scrollVal) + "px";
    element.style.marginTop = marginTop;
    if(element.position + partmenu.info.scrollVal > game.canvasHeight - 90){
      element.hidden = true;
    } else{
      element.hidden = false;
    }
  }
}
game.addFunc = function(){};
game.addColor = 0xFFBB88;
game.initUi = function(){
  partmenu.info = new Object();
  partmenu.info.elements = new Array();
  partmenu.info.scrollVal = 2;
  var crewCabin = document.createElement("button");
  crewCabin.className = "sidemenubutton";
  crewCabin.textContent = "Crew Cabin";
  crewCabin.position = 0;
  crewCabin.onclick = function(){
    game.addFunc = function(part){
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
    };
    game.addColor = 0xFFBB88;
  }
  partmenu.info.elements.push(crewCabin);
  partmenu.appendChild(crewCabin);
  var o2Recycler = document.createElement("button");
  o2Recycler.className = "sidemenubutton";
  o2Recycler.textContent = "O" + String.fromCharCode(0x2082) + " Recycler";
  o2Recycler.position = 50;
  o2Recycler.onclick = function(){
    game.addFunc = function(part){
      part.scrubco2 = true;
      part.reciveo2 = false;
      part.name = "O" + String.fromCharCode(0x2082) + " Recycler";
      part.updateModual = function(part){
        if(this.scrubco2){
          for(var i = 0; i<6; i++){
            var connection = part.connections[i];
            if(typeof connection !== 'undefined'){
              if(connection.name.charCodeAt(1) !== 0x2082){
                this.co2 += connection.co2;
                connection.co2 = 0;
              }
            }
          }
          if(this.co2 > 0.00003 && this.o2 < 100){
            this.co2-=0.00004;
            this.o2 +=0.00004;
          }
        }
        if(this.o2level > 100){
          this.o2level = 100;
        }
      }
      part.addToUI = function(part, menu){
        var co2level = document.createElement("p");
        co2level.textContent = "CO" + String.fromCharCode(0x2082) + " Level = " + this.co2;
        part.co2level = co2level;
        menu.appendChild(co2level);
        menu.elements.push(co2level);
        var scrubco2 = document.createElement("div");
        var scrubco2Text = document.createElement("p");
        scrubco2Text.style.display = "inline-block";
        scrubco2Text.textContent = "Scrub CO" + String.fromCharCode(0x2082);
        scrubco2.appendChild(scrubco2Text);
        var scrubco2Button = document.createElement("button");
        scrubco2Button.className = "uibutton";
        scrubco2Button.textContent = part.scrubco2.toString();
        var partindex = game.station.parts.indexOf(part);
        scrubco2Button.onclick = function(){
          game.station.parts[partindex].scrubco2 = !game.station.parts[partindex].scrubco2;
          this.textContent = game.station.parts[partindex].scrubco2.toString();
        }
        scrubco2.appendChild(scrubco2Button);
        menu.elements.push(scrubco2);
        menu.appendChild(scrubco2);
      }
    };
    game.addColor = 0xFF4455;
  }
  partmenu.info.elements.push(o2Recycler);
  partmenu.appendChild(o2Recycler);
}
game.onPartMenuScroll = function(){
  partmenu.info.scrollVal -=event.wheelDeltaY/10;
  if(partmenu.info.scrollVal > 2){
    partmenu.info.scrollVal = 2;
  }
  if(partmenu.info.scrollVal < partmenu.info.elements.length * -50 + 52){
    partmenu.info.scrollVal = partmenu.info.elements.length * -50 + 52;
  }
}
/**
0 in no click
1 is left click
2 is middle click
3 is right click
*/
game.mouseDown = [0, 0, 0, 0, 0, 0, 0, 0, 0];
game.mouseDownCount = 0;
document.body.onmousedown = function(evt) { 
  ++game.mouseDown[evt.button];
  ++game.mouseDownCount;
}
document.body.onmouseup = function(evt) {
  game.mouseDown[evt.button] = 0;
  --game.mouseDownCount;
}
game.elemeut.addEventListener('mousedown', game.onMouseDown, false);
game.elemeut.addEventListener('mousemove', game.onMouseMove, false);
game.elemeut.addEventListener('mousewheel', game.onScroll, false);
partmenu.addEventListener('mousewheel', game.onPartMenuScroll, false);
document.addEventListener('keydown', game.onKeyPress);