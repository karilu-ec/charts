//https://github.com/mrdoob/three.js/blob/master/examples/webgl_particles_billboards_colors.html
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container, stats;
var camera, scene, renderer, particles, geometry, material, i, h, color, colors = [], sprite, size;
var mouseX = 0, mouseY = 0;
var $container = $("#container");
//function to get the dimension of the container
var containerDimension = function(){ return { width: $container.width(), height: $container.height() } }
	
var SCREEN_WIDTH = $container.width(), SCREEN_HEIGHT = $container.height();
var windowHalfX = SCREEN_WIDTH / 2;
var windowHalfY = SCREEN_HEIGHT / 2;	
	
/*var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;*/
init();
animate();
function init() {
	
	
	/////container = document.createElement( 'div' );
	///document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000 );
	camera.position.z = 1400;
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.0009 );
	geometry = new THREE.Geometry();
	sprite = THREE.ImageUtils.loadTexture( "images/ball.png" );
	for ( i = 0; i < 5000; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = 2000 * Math.random() - 1000;
		vertex.y = 2000 * Math.random() - 1000;
		vertex.z = 2000 * Math.random() - 1000;
		geometry.vertices.push( vertex );
		colors[ i ] = new THREE.Color( 0xffffff );
		colors[ i ].setHSL( ( vertex.x + 1000 ) / 2000, 1, 0.5 );
	}
	geometry.colors = colors;
	material = new THREE.PointCloudMaterial( { size: 9, map: sprite, vertexColors: THREE.VertexColors, alphaTest: 0.5, transparent: true } );
	material.color.setHSL( 1.0, 0.2, 0.7 );
	particles = new THREE.PointCloud( geometry, material );
	scene.add( particles );
	//
	renderer = new THREE.WebGLRenderer();
	//renderer.setPixelRatio( window.devicePixelRatio );
	///renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	$container.append(renderer.domElement);
	////container.appendChild( renderer.domElement );
	//
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	//container.appendChild( stats.domElement );
	$container.append(stats.domElement);
	//
/*	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	/*window.addEventListener( 'resize', onWindowResize, false );*/
	// EVENTS
	THREEx.WindowResize(renderer, camera);
		
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
}
function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}
function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}/*
function onWindowResize( event ) {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}*/
//
function animate() {
	requestAnimationFrame( animate );
	render();
	update()
}


function update()
{
	
	controls.update();
	stats.update();
}

function render() {
	var time = Date.now() * 0.00005;
	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt( scene.position );
	h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
	material.color.setHSL( h, 1.0, 0.6 );
	renderer.render( scene, camera );
}

