// Set up the scene, camera, and renderer as global variables.
  var scene, camera, renderer;
 
  init();
  animate();
 
  // Sets up the scene.
  function init() {
 
    // set the scene size
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    
    // set some camera attributes
    var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 20000;
 
     // Create the scene and set the scene size.
    scene = new THREE.Scene();
    
     // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0,6,0);
    scene.add(camera);
    
    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });
    
    // Set the background color of the scene.
    renderer.setClearColor(0x333F47, 1);
 
    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);
 
    // Load in the mesh and add it to the scene.
    var loader = new THREE.JSONLoader();
    loader.load( "models/treehouse_logo.js", function(geometry){
      var material = new THREE.MeshLambertMaterial({color: 0x55B663});
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });
    
    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);
  }
  
  // Renders the scene and updates the render as needed.
  function animate() {
 
    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);
 
    // Render the scene.
    renderer.render(scene, camera);
    controls.update();
 
  }