game.addPlanets = function addPlanets(){
  // initPlanet(100,100,-200,500,"../textures/earth", new Array(".jpg",".jpg",".png"), 20,0x999999,5);
}
game.initPlanet = function initPlanet(radius,x,y,z,texture,extenction,bumpscale,speccolor,cloudhight){
  var geometry = new THREE.SphereGeometry(radius, radius, radius/2);
  var material = new THREE.MeshPhongMaterial();
  material.map = THREE.ImageUtils.loadTexture(texture + extenction[0]);
  material.bumpMap = THREE.ImageUtils.loadTexture(texture + "bump" + extenction[1])
  material.bumpScale = bumpscale;
  material.specularMap    = THREE.ImageUtils.loadTexture(texture + "spec" + extenction[2]);
  material.specular  = new THREE.Color(speccolor);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  var geometry   = new THREE.SphereGeometry(radius+cloudhight, radius, radius/2)
  var material  = new THREE.MeshPhongMaterial({
    map     : new THREE.ImageUtils.loadTexture(texture + "clouds.png"),
    side        : THREE.DoubleSide,
    opacity     : 0.8,
    transparent : true,
    depthWrite  : false,
  })
  var cloudMesh = new THREE.Mesh(geometry, material)
  mesh.add(cloudMesh);
  scene.add(mesh);
}