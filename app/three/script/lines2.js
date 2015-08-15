
/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
 */

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var $container = $("#container");
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	////var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var SCREEN_WIDTH = $container.width(), SCREEN_HEIGHT = $container.height();	
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);
	
		
    //function to get the dimension of the container.
    var containerDimension = function(){ return { width: $container.width(), height: $container.height() } }
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setClearColor(0xcccccc, 1);
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	// EVENTS
	THREEx.WindowResize(renderer, camera, containerDimension);
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	
	// FLOOR
	// don't add floor -- easier to view result.

	scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
	
	////////////
	// CUSTOM //
	////////////

	var lineGeometry = new THREE.Geometry();
	var vertArray = lineGeometry.vertices;
	vertArray.push( new THREE.Vector3(-150, -100, 0), new THREE.Vector3(-150, 100, 0) );
	lineGeometry.computeLineDistances();
	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
	var line = new THREE.Line( lineGeometry, lineMaterial );
	scene.add(line);

	var lineGeometry = new THREE.Geometry();
	var vertArray = lineGeometry.vertices;
	vertArray.push( new THREE.Vector3(-100, -100, 0), new THREE.Vector3(-100, 100, 0) );
	lineGeometry.computeLineDistances();
	var lineMaterial = new THREE.LineDashedMaterial( { color: 0x00cc00, dashSize: 4, gapSize: 2 } );
	var line = new THREE.Line( lineGeometry, lineMaterial );
	scene.add(line);

	var lineGeometry = new THREE.Geometry();
	var vertArray = lineGeometry.vertices;
	vertArray.push( new THREE.Vector3(-50, -100, 0), new THREE.Vector3(-50, 100, 0) );
	lineGeometry.computeLineDistances();
	var lineMaterial = new THREE.LineDashedMaterial( { color: 0x0000cc, dashSize: 1, gapSize: 3 } );
	var line = new THREE.Line( lineGeometry, lineMaterial );
	scene.add(line);
	
	var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50 );

	// use LineBasicMaterial if no dashes are desired
	var dashMaterial = new THREE.LineDashedMaterial( { color: 0x000000, dashSize: 2, gapSize: 3 } );
	
	cube = new THREE.Line( geo2line(cubeGeometry), dashMaterial, THREE.LinePieces );
	cube.position.set(50,26,0);
	scene.add(cube);
	
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	if ( keyboard.pressed("z") ) 
	{ 
		// do something
	}
	
	controls.update();
	stats.update();
}

function render() 
{
	renderer.render( scene, camera );
}

function geo2line( geo ) // credit to WestLangley!
{
    var geometry = new THREE.Geometry();
    var vertices = geometry.vertices;
	
	for ( i = 0; i < geo.faces.length; i++ ) 
	{
        var face = geo.faces[ i ];
        if ( face instanceof THREE.Face3 ) 
		{
            var a = geo.vertices[ face.a ].clone();
			var b = geo.vertices[ face.b ].clone();
			var c = geo.vertices[ face.c ].clone();
            vertices.push( a,b, b,c, c,a );
        } 
		else if ( face instanceof THREE.Face4 ) 
		{
			var a = geo.vertices[ face.a ].clone();
			var b = geo.vertices[ face.b ].clone();
			var c = geo.vertices[ face.c ].clone();
			var d = geo.vertices[ face.d ].clone();
            vertices.push( a,b, b,c, c,d, d,a );
        }
    }

    geometry.computeLineDistances();
    return geometry;
}
