var NUMBER_OF_SPHERES = 500;
	var SIZE = .12;
    var RADIUS = 4;
    var DISTANCE = 8;
	var EPSILON = Math.PI / 10;
	
	var NUMBER_OF_OCTAHEDRONS = 6;
	
	var scene, camera, renderer;
	var sphereGeometry;
	
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;


    function init() {
	
	// create an AudioListener and add it to the camera
        scene = new THREE.Scene();
		var sphereMaterials = [];

        sphereMaterials.push( new THREE.MeshPhongMaterial({color: 0xFFEE44}) );
        sphereMaterials.push( new THREE.MeshLambertMaterial({color: 0xFF44EE, side: THREE.DoubleSide} ));

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

        renderer = new THREE.WebGLRenderer();
		
		//var controls = new THREE.OrbitControls(camera);
		
        renderer.setClearColor(new THREE.Color(0x64dde7, 1.0));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;

        var planeGeometry = new THREE.PlaneGeometry(44, 44);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0x64dde7});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
		

        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = -8;
		
        //scene.add(plane);
		
		controls = new THREE.OrbitControls(camera);
		function cameramovement() {
			requestAnimationFrame( cameramovement );
			controls.update();
			renderer.render( scene, camera );

		}
		
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 4;
		//controls.update();
        camera.lookAt( new THREE.Vector3(0,0,0));
			
        var spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set( 4, 6, 8);
        spotLight.castShadow = true;

        spotLight.exponent = 1;

        spotLight.angle = Math.PI/3;

        scene.add(spotLight);

        // Add the output of the renderer to the HTML div element.
        document.getElementById("picture").appendChild(renderer.domElement);
		cameramovement();
        renderer.render(scene, camera);
	} // init()
	
	function animate() {
		requestAnimationFrame( animate );
		
		renderer.render( scene, camera );
	}
	
	
	
    window.onload = init;
