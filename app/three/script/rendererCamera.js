var scene, camera, renderer;

init();
display();

//init function
function init() {
    //code// set the scene size
    var WIDTH = 800,
      HEIGHT = 600;
  
// set some camera attributes
    var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

    // get the DOM element to attach to
    var $container = $('#container');
    
    renderer = new THREE.WebGLRenderer(); // Set renderer
    renderer.setSize( WIDTH, HEIGHT );
    $container.append( renderer.domElement ); //add the canvas

    //set scene
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set( -15, 10, 10 ); //(x,y,z)
    camera.lookAt( scene.position ); //points the camera to the object position

    var geometry = new THREE.BoxGeometry( 5, 5, 5 );
    var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    var light = new THREE.PointLight( 0xFFFF00 );
    light.position.set( 10, 0, 10 ); //set position
    scene.add( light ); //add light to the scene
}
function display() {
    renderer.setClearColor( 0xdddddd, 1);
    renderer.render( scene, camera );
}