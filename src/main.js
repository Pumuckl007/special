game.canvasWidth = window.innerWidth, game.canvasHeight = window.innerHeight;
game.initializeScene = function initializeScene(){
  game.renderer = new THREE.WebGLRenderer({antialias:true});
  game.renderer.setClearColor(0x040413, 1);
  game.renderer.setSize(game.canvasWidth, game.canvasHeight);
  game.renderer.shadowMapEnabled = true;
  game.renderer.shadowMapSoft = true;
  document.getElementById("WebGLCanvas").appendChild(game.renderer.domElement);
  game.camera = new THREE.PerspectiveCamera(45, game.canvasWidth / game.canvasHeight, 0.05, 1000);
  game.scene = new THREE.Scene();
  game.scene.fog = new THREE.FogExp2( 0x040413, 0.001 );
  game.dir_light = new THREE.DirectionalLight( 0xFFFFFF );
  game.dir_light.position.set( 20, 30, -5 );
  game.dir_light.target.position.copy( game.scene.position );
  game.dir_light.castShadow = true;
  game.dir_light.shadowCameraLeft = -30;
  game.dir_light.shadowCameraTop = -30;
  game.dir_light.shadowCameraRight = 30;
  game.dir_light.shadowCameraBottom = 30;
  game.dir_light.shadowCameraNear = 20;
  game.dir_light.shadowCameraFar = 200;
  game.dir_light.shadowBias = -.001
  game.dir_light.shadowMapWidth = game.dir_light.shadowMapHeight = 4096;
  game.dir_light.shadowDarkness = .5;
  game.scene.add( game.dir_light );

  game.add();

  game.camera.position.set(-50, 0, 0);
  game.camera.rotation.order = "YXZ";
  game.camera.lookAt(game.scene.position);
  game.camera.location = new THREE.Vector3(0,0,0);
  game.camera.distance = 50;
  game.camera.yaw = 0;
  game.camera.pitch = -Math.PI/2;
  game.camera.update = function update(){
    this.position.x = this.distance * Math.cos(this.yaw) * Math.sin(this.pitch) + this.location.x;
    this.position.y = this.distance * Math.cos(this.pitch) + this.location.y;
    this.position.z = this.distance * Math.sin(this.yaw) * Math.sin(this.pitch) + this.location.z;
    this.lookAt(this.location);
  }
  game.ambientLight = new THREE.AmbientLight(0x202020);
  game.scene.add(game.ambientLight);
}
game.step = function step(timestamp) {
  game.renderScene();
  requestAnimationFrame(step);
}
game.add = function add(){
  game.addStars();
  game.addPlanets();
}
game.renderScene = function renderScene(){
  game.update();
  game.renderer.render(game.scene, game.camera);
}
game.update = function update(){
  game.station.update();
  game.updateInputManager();
}

game.initUi();
game.initializeScene();
requestAnimationFrame(game.step);
game.renderScene();
