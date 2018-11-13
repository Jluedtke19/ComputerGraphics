var NUMBER_OF_SPHERES = 500;
	var SIZE = .12;
    var RADIUS = 4;
    var DISTANCE = 8;
	
	var NUMBER_OF_OCTAHEDRONS = 6;
	
	var scene, camera, renderer;
	var sphereGeometry;


    function init() {
	
	// create an AudioListener and add it to the camera
	
		 v0 = new THREE.Vector3(1, 0, (- 1/Math.sqrt(2)));
		 v1 = new THREE.Vector3(-1, 0, (- 1/Math.sqrt(2)));
		 v2 = new THREE.Vector3(0, 1, ( 1/Math.sqrt(2)));
		 v3 = new THREE.Vector3(0, -1, ( 1/Math.sqrt(2)));
		 
		 var trigeom = new THREE.Geometry();
		 
		 trigeom.vertices.push(v0,v1,v2,v3);
		 trigeom.faces.push(new THREE.Face3(0,1,2));
		 trigeom.faces.push(new THREE.Face3(1,2,3));
		 trigeom.faces.push(new THREE.Face3(0,2,3));
		 
		
        scene = new THREE.Scene();
		var sphereMaterials = [];

        sphereMaterials.push( new THREE.MeshPhongMaterial({color: 0xFFEE44}) );
        sphereMaterials.push( new THREE.MeshLambertMaterial({color: 0xFF44EE, side: THREE.DoubleSide} ));
		var tria = new THREE.Mesh(trigeom,sphereMaterials[1]);
		scene.add(tria);

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
		
        scene.add(plane);
		
		controls = new THREE.OrbitControls(camera);
		function cameramovement() {

			requestAnimationFrame( cameramovement );

			// required if controls.enableDamping or controls.autoRotate are set to true
			controls.update();

			renderer.render( scene, camera );

		}
		
		var sphereGeometry = new THREE.TetrahedronGeometry(5, 0);
		
		
		sphereGeometry.verticesNeedUpdate = true;
		console.log(sphereGeometry.vertices[2].x);
        var sphereMaterials = [];

        sphereMaterials.push( new THREE.MeshPhongMaterial({color: 0xFFEE44}) );
        sphereMaterials.push( new THREE.MeshLambertMaterial({color: 0xFF44EE}) );
		
		var test = new THREE.Mesh(sphereGeometry, sphereMaterials[0]);
		//scene.add(test);
		
		
        var spheres = [];
        for( var i = 0; i < NUMBER_OF_SPHERES; i++ ) {
            spheres[i] = new THREE.Mesh(sphereGeometry, sphereMaterials[0]);
        } // for
		

		/*
        // Position the spheres.
        for( i = 0; i < NUMBER_OF_SPHERES; i++ ) {
            var angle = 10 * (i / NUMBER_OF_SPHERES) * (2 * Math.PI);
			spheres[i].rotateX(angle);
            spheres[i].position.x = (DISTANCE/10) * angle *Math.cos( angle );
            spheres[i].position.y = (DISTANCE/10) * angle * Math.sin( angle );
            //spheres[i].position.z = RADIUS + (i % 2) * RADIUS;
            spheres[i].castShadow = true;
			
        } // for
		*/
		

		/*
		for( i = 0; i < NUMBER_OF_SPHERES; i++ ) {
            var angle = 10 * (i / NUMBER_OF_SPHERES) * (2 * Math.PI);
            spheres[i].position.x = (DISTANCE/2) * Math.cos( angle );
            spheres[i].position.y = (DISTANCE/2) * Math.sin( angle );
            spheres[i].position.z = .5 * angle;
            spheres[i].castShadow = true;
			
        } // for
		*/
		
		/*
		for( i = 0; i < NUMBER_OF_SPHERES; i++ ) {
            var angle = 10 * (i / NUMBER_OF_SPHERES) * (2 * Math.PI);
            spheres[i].position.x = ((DISTANCE/2) + 2 * Math.cos(2*angle)) * Math.cos( angle );
            spheres[i].position.y = ((DISTANCE/2) + 2 * Math.cos(2*angle)) * Math.sin( angle );
            spheres[i].position.z = 2 * angle + 2 * Math.sin(2 * angle);
            spheres[i].castShadow = true;
			
        } // for
		*/
		
		var geom = new THREE.Geometry();
		
		for( i = 0; i < NUMBER_OF_SPHERES; i++ ) {
            var t = (i / NUMBER_OF_SPHERES) * (2 * Math.PI);
			var a = .05;
			var c = (Math.atan(a * t));
            //spheres[i].position.x = (Math.cos(t))/(Math.sqrt(1 + Math.pow(a,2) * Math.pow(t,2)));
            //spheres[i].position.y = (Math.sin(t))/(Math.sqrt(1 + Math.pow(a,2) * Math.pow(t,2)));
            //spheres[i].position.z = -1 * ((a * t)/(Math.sqrt(1 +Math.pow(a,2) * Math.pow(t,2) )));
			var x = Math.cos(t) * Math.cos(c);
			var y = Math.sin(t) * Math.cos(c);
			var z = -(Math.sin(c));
			geom.vertices.push(new THREE.Vector3(x, y , z));
			spheres[i].position.x = x;
            spheres[i].position.y = y;
            spheres[i].position.z = z;
            spheres[i].castShadow = true;
			
        } // for

		
        // Add each sphere to the scene.
        for( i = 0; i < NUMBER_OF_SPHERES; i++ ) {
            //scene.add(spheres[i]);
        } // for
		var line = new THREE.Line(geom, sphereMaterials[0]);
		//scene.add(line);
		
		
        camera.position.x = -15;
        camera.position.y = 0;
        camera.position.z = 36;
		//controls.update();
        camera.lookAt( new THREE.Vector3(0,0,0));
			
        var spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set( 8, 12, 20);
        spotLight.castShadow = true;

        spotLight.exponent = 1;

        spotLight.angle = Math.PI/4;

        spotLight.target = plane;
        scene.add(spotLight);

        // Add the output of the renderer to the HTML div element.
        document.getElementById("picture").appendChild(renderer.domElement);
		cameramovement();
		animate();

        renderer.render(scene, camera);
	} // init()
	
	function animate() {

				requestAnimationFrame( animate );
				//var rando = 3 * Math.random() - 2;
				//sphereGeometry.verticesNeedUpdate = true;
				
				//sphereGeometry.vertices[2].x = rando;
				//scene.add(sphereGeometry);

				renderer.render( scene, camera );

			}
    window.onload = init;
