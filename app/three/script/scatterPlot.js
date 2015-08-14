// Global vars...
var container, camera, scene, geometry, mesh, renderer, controls, particles, colors;

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
    var $container = $('#WebGL-output');
    
    //set the renderer
    renderer = new THREE.WebGLRenderer({
        clearAlpha: 1
    }); 
    renderer.setSize( WIDTH, HEIGHT );
    renderer.setClearColor(0xffffff, 1);
    $container.append( renderer.domElement ); //add the canvas

    //set scene
    scene = new THREE.Scene();
    
    //set camera
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
   // camera.position.set( -15, 10, 10 ); //(x,y,z)
    camera.position.set(200, 0, 75);
    scene.add(camera);

   // Controls...
   controls = new THREE.OrbitControls(camera);

}
function display() {
    // Scatter plot...
    scatterPlot = new THREE.Object3D();
    scene.add(scatterPlot);
    
    // Make grid...
    xzColor = 'black';
    xyColor = 'black';
    yzColor = 'black';
    
        
    var gridXY = new THREE.GridHelper(50, 5);
    gridXY.position.set(0, 0, 0);
    gridXY.rotation.x = Math.PI / 2;
    gridXY.setColors(new THREE.Color(xyColor), new THREE.Color(xyColor));
    scatterPlot.add(gridXY);
    renderer.setClearColor( 0xdddddd, 1);
    renderer.render( scene, camera );
    
    // Plot some random points...
    geometry = new THREE.Geometry();
    colors = [];
    
    for (var i = 0; i < 50; i++) {
    
        colors[i] = new THREE.Color(1, 1, 1);
        colors[i].setHSL(1000 / 2000, 1, 0.5);
    
        var material = new THREE.PointCloudMaterial({
            size: 5,
            vertexColors: THREE.VertexColors,
            transparent: true,
            useScreenCoordinates: false
        });
    
        material.color.setHSL(1.0, 0.2, 0.7);
    
        var vertex = new THREE.Vector3();
        
        var max = 50;
        var min = -50;
    
        vertex.x = Math.random() * (max - min) + min;
        vertex.y = Math.random() * (max - min) + min;
        // vertex.z = Math.random() * (max - min) + min;
    
        geometry.vertices.push(vertex);
    }
    particles = new THREE.PointCloud(geometry, material);
    particles.sortParticles = true;
    scatterPlot.add(particles);
    
    geometry.colors = colors;
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}