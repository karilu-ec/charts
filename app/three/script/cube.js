//basics for three.js
var scene = new THREE.Scene();

//type of camera: PerspectiveCamera( Field of view, aspect ratio(always divide width by height), near, far)
//objects farther from far or closer than near won't be rendered.
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//three.js comes with other renders used as fallbacks for older browsers or without webGL support.
var renderer = new THREE.WebGLRenderer(); //render instance

//set size to render the app. Use the width and height of the area we want to fill with our game
renderer.setSize( window.innerWidth, window.innerHeight );

//Add the renderer to the HTML <canvas element>
document.body.appendChild( renderer.domElement );



//To create a cube, we need a BoxGeometry.
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//we need a material to color it. Example MeshBasicMaterial.
//(All materials take an object of properties which will be applied to them. Ex. color..)
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//we need  a Mesh. A mesh is an object that takes a geometry, and applies a material to it
var cube = new THREE.Mesh( geometry, material );
//insert the cube to the scene
scene.add( cube );
//move the camera a bit because the the scene was added in coordinates (0,0,0)
camera.position.z = 5;

//render loop
function render() {
	requestAnimationFrame( render );
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
	renderer.render( scene, camera );
}
render();