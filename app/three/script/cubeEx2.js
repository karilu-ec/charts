var scene, camera, renderer;

window.addEventListener("DOMContentLoaded", function(){
	
  //code// set the scene size
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
    
// set some camera attributes
    var VIEW_ANGLE = 80,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 1,
      FAR = 10000;

    // get the DOM element to attach to
    //var $container = $('#container');
    
    
    renderer = new THREE.WebGLRenderer(); // Set renderer
    renderer.setSize( WIDTH, HEIGHT );
//$container.append( renderer.domElement ); //add the canvas
    document.body.appendChild( renderer.domElement );
	

    //set scene
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z =500;
    scene.add(camera);
    
    // set a directional light
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 5 );
	directionalLight.position.z = 3;
	scene.add( directionalLight );

    // cube geometry (200 x 200 x 200);
    var geometry = new THREE.CubeGeometry( 200, 200, 200 );
    var material = new THREE.MeshLambertMaterial( { color: 0x660000 } );
    var cubeMesh = new THREE.Mesh( geometry, material );
    scene.add( cubeMesh );
    
    renderer.setClearColor( 0xdddddd, 1);
    renderer.render( scene, camera );
    
    window.addEventListener('mousemove', function (e) {
		var mouseX = ( e.clientX - WIDTH / 2 );
		var mouseY = ( e.clientY - HEIGHT / 2 );
		cubeMesh.rotation.x = mouseY * 0.005;
		cubeMesh.rotation.y = mouseX * 0.005;
		
		renderer.render( scene, camera );
	}, false);
	
}, false);