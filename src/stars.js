game.addStars = function(){
  var particles;
  geometry = new THREE.Geometry();
  var colors = new Array;
  var starColors = new Array;
  starColors[0] = 0x9db4ff;
  starColors[1] = 0xa2b9ff;
  starColors[2] = 0xa7bcff;
  starColors[3] = 0xaabfff;
  starColors[4] = 0xafc3ff;
  starColors[5] = 0xbaccff;
  starColors[6] = 0xcad8ff;
  starColors[7] = 0xc0d1ff;
  starColors[8] = 0xcad8ff;
  starColors[9] = 0xe4e8ff;
  starColors[10] = 0xedeeff;
  starColors[11] = 0xfbf8ff;
  starColors[12] = 0xfff9f9;
  starColors[13] = 0xfff5ec;
  starColors[14] = 0xfff4e8;
  starColors[15] = 0xfff1df;
  starColors[16] = 0xffebd1;
  starColors[17] = 0xffd7ae;
  starColors[18] = 0xffc690;
  starColors[19] = 0xffbe7f;
  starColors[20] = 0xffbb7b;

  for ( i = 0; i < 5000; i ++ ) {
    var x = 0, y = 0, z = 0;
    var yaw = Math.random() * 360;
    var pitch = Math.random() * 360;
    x = 950 * Math.cos(yaw) * Math.sin(pitch);
    y = 950 * Math.cos(pitch);
    z = 950 * Math.sin(yaw) * Math.sin(pitch);
    var partical = new THREE.Vector3(
      x,
      y,
      z);
    geometry.vertices.push( partical );
    colors[ i ] = new THREE.Color(starColors[Math.floor(Math.random() * 21)]);

  }

  geometry.colors = colors;
  material = new THREE.ParticleBasicMaterial( { size: 10, vertexColors: true, transparent: true } );
  material.color.setHSL( 10, 0.2, 0.7 );

  particles = new THREE.ParticleSystem( geometry, material );
  particles.sortParticles = true;

  game.scene.add( particles );

}