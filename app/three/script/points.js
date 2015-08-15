// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats, colors = [], sprite;
var clock = new THREE.Clock();

// custom global variables
var mesh;
var $container = $("#container");

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = $container.width(), SCREEN_HEIGHT = $container.height();	
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.setClearColor(0xcccccc, 1);
	$container.append( renderer.domElement );
	
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	$container.append( stats.domElement );
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(100,250,100);
	scene.add(light);

	// SKYBOX
	var skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	////////////
	// CUSTOM //
	////////////
 // Scatter plot...
    scatterPlot = new THREE.Object3D();
    scene.add(scatterPlot);
	
/*	var gridXZ = new THREE.GridHelper(100, 10);
	gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
	gridXZ.position.set( 100,0,100 );
	scene.add(gridXZ);*/
	
	var gridXY = new THREE.GridHelper(100, 10); //Grid xy 2d.
	gridXY.position.set( 0,0,0 );
	gridXY.rotation.x = Math.PI/2;
	gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
	scatterPlot.add(gridXY);

/*	var gridYZ = new THREE.GridHelper(100, 10);
	gridYZ.position.set( 0,100,100 );
	gridYZ.rotation.z = Math.PI/2;
	gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
	scene.add(gridYZ);*/
	
	//Plot random points
	geometry = new THREE.Geometry();
	sprite = THREE.ImageUtils.loadTexture( "images/ball.png" );
	for ( i = 0; i < 50; i ++ ) {
		var vertex = new THREE.Vector3();
		var max = 50;
        var min = -50;    
        vertex.x = Math.random() * (max - min) + min;
        vertex.y = Math.random() * (max - min) + min;
         //vertex.z = Math.random() * (max - min) + min;
		/*vertex.x = 2000 * Math.random() - 1000;
		vertex.y = 2000 * Math.random() - 1000;
		vertex.z = 2000 * Math.random() - 1000;*/
		geometry.vertices.push( vertex );
		colors[ i ] = new THREE.Color( 0xffffff );
		colors[ i ].setHSL(  1000  / 2000, 1, 0.5 );
	}
	geometry.colors = colors;
	material = new THREE.PointCloudMaterial( { size: 9, map: sprite, vertexColors: THREE.VertexColors, alphaTest: 0.5, transparent: true } );
	material.color.setHSL( 1.0, 0.2, 0.7 );
	particles = new THREE.PointCloud( geometry, material );
	scene.add( particles );
	//
	
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	
	controls.update();
	stats.update();
}

function render() 
{
	renderer.render( scene, camera );
}


