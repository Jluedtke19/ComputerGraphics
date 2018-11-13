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
		
        renderer.setClearColor(new THREE.Color(0xFFCC88, 1.0));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;

        var planeGeometry = new THREE.PlaneGeometry(44, 44);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xAAFFCC});
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
		
		var polyhedron = new THREE.Object3D();
		var material = new THREE.MeshPhongMaterial({color: 0xFF44EE});
		material.side = THREE.DoubleSide;
		material.wireframe = false;
		material.recieveShadow = false;

		
		var near = new THREE.Vector3(0,0,1);
		var far = new THREE.Vector3(0,0,-1);
		var east = new THREE.Vector3(1,0,0);
		var north = new THREE.Vector3(0,1,0);
		var west = new THREE.Vector3(-1,0,0);
		var south = new THREE.Vector3(0,-1,0);
		
		makeTriangles(east, north, near, material, polyhedron);
		makeTriangles(north, west, near, material, polyhedron);
		makeTriangles(west, south, near, material, polyhedron);
		makeTriangles(south, east, near, material, polyhedron);
		makeTriangles(west, north, far, material, polyhedron);
		makeTriangles(north, east, far, material, polyhedron);
		makeTriangles(east, south, far, material, polyhedron);
		makeTriangles(south, west, far, material, polyhedron);
		
		scene.add(polyhedron);
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

        spotLight.target = polyhedron;
        scene.add(spotLight);

        // Add the output of the renderer to the HTML div element.
        document.getElementById("picture").appendChild(renderer.domElement);
		cameramovement();
		var render = function(){
			polyhedron.rotation.x += .02;
			polyhedron.rotation.y += .03;
			
			polyhedron.translateX(.05);
			polyhedron.translateY(.05);
		
			requestAnimationFrame( render );

			renderer.render( scene, camera );
	}
		//animate();
		render();
        renderer.render(scene, camera);
	} // init()
	
	function animate() {
		requestAnimationFrame( animate );
		
		renderer.render( scene, camera );
	}
	
	var makeTriangles = function(v0,v1,v2,material,polyhedron){
		var length1 = v0.distanceTo(v1);
		var length2 = v0.distanceTo(v2);
		var length3 = v1.distanceTo(v2);
		
		var smallest = Math.min(length1, length2);
		var rsmall = Math.min(length3, smallest);
		
		if(rsmall < EPSILON){
			var geometry = new THREE.Geometry();
			geometry.vertices.push(v0,v1,v2);
			geometry.faces.push(new THREE.Face3(0,1,2));
			
			var color = new THREE.Color();
			color.setHSL(Math.random(), .95, .5);
			
			
			geometry.computeFaceNormals();
			
			var mat = new THREE.MeshPhongMaterial({color : color});
			var mesh = new THREE.Mesh(geometry, mat);
			polyhedron.add(mesh);
		}
		else{
			//var v01 = getMidpoint(v0, v1);
			var v01 = new THREE.Vector3(0,0,0);
			var v12 = new THREE.Vector3(0,0,0);
			var v20 = new THREE.Vector3(0,0,0);
			v01.addVectors(v0,v1);
			v01.normalize();
			//var v12 = getMidpoint(v1, v2);
			v12.addVectors(v1,v2);
			v12.normalize();
			//var v20 = getMidpoint(v2, v0);
			v20.addVectors(v2,v0);
			v20.normalize();
			
			makeTriangles(v0, v01, v20, material, polyhedron);
			makeTriangles(v1, v12, v01, material, polyhedron);
			makeTriangles(v12, v2, v20, material, polyhedron);
			makeTriangles(v01, v12, v20, material, polyhedron);
			
			
		}
	}
	var getMidpoint = function(point1, point2){
		return new Vector3((point1.x + point2.x)/2,(point1.y + point2.y)/2,(point1.z + point2.z)/2);
	}
	
	
    window.onload = init;
