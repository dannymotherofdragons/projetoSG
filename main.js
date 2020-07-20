var scene = null,
    camera,
    renderer = null,
    keyboard = {},
    player = {
        height: 4,
        speed: 0.2,
    },
    fruits = [],
    mouse = new THREE.Vector2(),
    plane = null,
    selectedObject = null,
    offset = new THREE.Vector3(),
    raycaster = new THREE.Raycaster();

window.onload = function init() {

    //set up da cena e camara 

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#34c3eb");
    document.body.appendChild(renderer.domElement);



    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 4000);
    //controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', function () { renderer.render(scene, camera); });


    document.addEventListener("mousedown", mouseDown, false);
    //document.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("mouseup", mouseUp, false);
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    spawnArvores();
    //spawnFire();
    spawnFruit();
    createFloor();
    //despawnFruit();

    //var controls = new THREE.DragControls(fruits, camera, renderer.domElement)


    //luzes
    let ambientLight = new THREE.HemisphereLight(0xefffd0, 0.8)
    scene.add(ambientLight)


    //camera position
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = player.height;
    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    //sombras
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);

    animate();
}

function createFloor() {

    let grassGeometry = new THREE.BoxGeometry(70, 72, 1);
    let grassTex = new THREE.TextureLoader().load("./img/lawn.jpg")
    grassTex.wrapS = THREE.RepeatWrapping;
    grassTex.wrapT = THREE.RepeatWrapping;
    grassTex.repeat.set(27, 27)

    let grassMaterial = new THREE.MeshPhongMaterial({
        map: grassTex,
        side: THREE.DoubleSide,
    })

    let grass = new THREE.Mesh(grassGeometry, grassMaterial);

    grass.rotation.x = Math.PI / 2; //roda 90 graus em x
    grass.position.y = -0.9
    scene.add(grass)

    //path 1
    let pathGeometry = new THREE.BoxGeometry(-15, 72, 1.1)
    let pathTex = new THREE.TextureLoader().load("./img/path.jpg")
    //repetir a textura do path 
    pathTex.wrapS = THREE.RepeatWrapping;
    pathTex.wrapT = THREE.RepeatWrapping;
    pathTex.repeat.set(7, 7)
    let pathMaterial = new THREE.MeshPhongMaterial({
        map: pathTex,
        side: THREE.DoubleSide,
    })

    let path = new THREE.Mesh(pathGeometry, pathMaterial)
    path.rotation.x = Math.PI / 2
    path.position.set(0, -0.8, 0)
    scene.add(path)

    plane = new THREE.Mesh(new THREE.PlaneGeometry(72, 70), new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        opacity: 0.15,
        transparent: true,
        visible: true,
        side: THREE.DoubleSide
    }));
    plane.rotation.x = -Math.PI/2

    plane.position.z = 3;
    scene.add(plane);

    //path 2

    /*let pathGeometry1 = new THREE.BoxGeometry(-15, 72, 1.1)
    let pathTex1 = new THREE.TextureLoader().load("./img/path.jpg")
    //repetir a textura do path
    pathTex1.wrapS = THREE.RepeatWrapping;
    pathTex1.wrapT = THREE.RepeatWrapping;
    pathTex1.repeat.set(7, 7)
    let pathMaterial1 = new THREE.MeshPhongMaterial({
        map: pathTex1,
        side: THREE.DoubleSide,
    })

    let path1 = new THREE.Mesh(pathGeometry1, pathMaterial1)
    path1.rotation.x = Math.PI / 2
    path1.position.set(0, -0.8, 0)
    scene.add(path1)*/
}

function spawnArvores() {
    // Tronco
    let troncoGeo = new THREE.CylinderGeometry(0.5, 0.5, 8)
    let troncoTex = new THREE.TextureLoader().load("./img/tronco.jpg")
    let troncoMaterial = new THREE.MeshPhongMaterial({
        map: troncoTex
    })

    // Folhas
    let copaGeo = new THREE.SphereGeometry(4, 4, 20)
    let copaTex = new THREE.TextureLoader().load("./img/tree.jpg")
    let copaMaterial = new THREE.MeshPhongMaterial({
        map: copaTex
    })

    arvore = new THREE.Object3D()
    //Tronco
    let tronco = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco.position.y = 3
    arvore.add(tronco)
    //Folhas
    let copa = new THREE.Mesh(copaGeo, copaMaterial)
    copa.position.y = 3
    tronco.add(copa)
    arvore.position.set(9, 1, 15)
    scene.add(arvore)

    arvore1 = new THREE.Object3D()
    //Tronco
    let tronco1 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco1.position.y = 3
    arvore1.add(tronco1)
    //Folhas
    let copa1 = new THREE.Mesh(copaGeo, copaMaterial)
    copa1.position.y = 3
    tronco1.add(copa1)
    arvore1.position.set(20, 1, 15)
    scene.add(arvore1)

    arvore2 = new THREE.Object3D()
    //Tronco
    let tronco2 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco2.position.y = 3
    arvore2.add(tronco2)
    //Folhas
    let copa2 = new THREE.Mesh(copaGeo, copaMaterial)
    copa2.position.y = 3
    tronco2.add(copa2)
    arvore2.position.set(-20, 1, -15)
    scene.add(arvore2)

    arvore3 = new THREE.Object3D()
    //Tronco
    let tronco3 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco3.position.y = 3
    arvore3.add(tronco3)
    //Folhas
    let copa3 = new THREE.Mesh(copaGeo, copaMaterial)
    copa3.position.y = 3
    tronco3.add(copa3)
    arvore3.position.set(-14, 1, 15)
    scene.add(arvore3)

    arvore4 = new THREE.Object3D()
    //Tronco
    let tronco4 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco4.position.y = 3
    arvore4.add(tronco4)
    //Folhas
    let copa4 = new THREE.Mesh(copaGeo, copaMaterial)
    copa4.position.y = 3
    tronco4.add(copa4)
    arvore4.position.set(-9, 1, 0)
    scene.add(arvore4)

    arvore5 = new THREE.Object3D()
    //Tronco
    let tronco5 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco5.position.y = 3
    arvore5.add(tronco5)
    //Folhas
    let copa5 = new THREE.Mesh(copaGeo, copaMaterial)
    copa5.position.y = 3
    tronco5.add(copa5)
    arvore5.position.set(30, 1, -10)
    scene.add(arvore5)

    arvore6 = new THREE.Object3D()
    //Tronco
    let tronco6 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco6.position.y = 3
    arvore6.add(tronco6)
    //Folhas
    let copa6 = new THREE.Mesh(copaGeo, copaMaterial)
    copa6.position.y = 3
    tronco6.add(copa6)
    arvore6.position.set(25, 1, 5)
    scene.add(arvore6)

    arvore7 = new THREE.Object3D()
    //Tronco
    let tronco7 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco7.position.y = 3
    arvore7.add(tronco7)
    //Folhas
    let copa7 = new THREE.Mesh(copaGeo, copaMaterial)
    copa7.position.y = 3
    tronco7.add(copa7)
    arvore7.position.set(20, 1, 34)
    scene.add(arvore7)

    arvore8 = new THREE.Object3D()
    //Tronco
    let tronco8 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco8.position.y = 3
    arvore8.add(tronco8)
    //Folhas
    let copa8 = new THREE.Mesh(copaGeo, copaMaterial)
    copa8.position.y = 3
    tronco8.add(copa8)
    arvore8.position.set(-30, 1, -20)
    scene.add(arvore8)

    arvore9 = new THREE.Object3D()
    //Tronco
    let tronco9 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco9.position.y = 3
    arvore9.add(tronco9)
    //Folhas
    let copa9 = new THREE.Mesh(copaGeo, copaMaterial)
    copa9.position.y = 3
    tronco9.add(copa9)
    arvore9.position.set(10, 1, -20)
    scene.add(arvore9)

    arvore10 = new THREE.Object3D()
    //Tronco
    let tronco10 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco10.position.y = 3
    arvore10.add(tronco10)
    //Folhas
    let copa10 = new THREE.Mesh(copaGeo, copaMaterial)
    copa10.position.y = 3
    tronco10.add(copa10)
    arvore10.position.set(24, 1, -15)
    scene.add(arvore10)

    arvore11 = new THREE.Object3D()
    //Tronco
    let tronco11 = new THREE.Mesh(troncoGeo, troncoMaterial)
    tronco11.position.y = 3
    arvore11.add(tronco11)
    //Folhas
    let copa11 = new THREE.Mesh(copaGeo, copaMaterial)
    copa11.position.y = 3
    tronco11.add(copa11)
    arvore11.position.set(-15, 1, 30)
    scene.add(arvore11)

}

//ideia inicial era apagar fogueiras na floresta

/*function spawnFire() {
    let fireGeo = new THREE.SphereGeometry(1,1, 20)
    let fireMaterial = new THREE.MeshLambertMaterial({
        color: 0xfc6603
    })

    let fireLogGeo = new THREE.CylinderGeometry(0.1, 0.1, 4)
    let fireLogTex = new THREE.TextureLoader().load("./img/tronco.jpg")
    let fireLogMaterial = new THREE.MeshPhongMaterial({
        map: fireLogTex
    })

    fire = new THREE.Object3D()

    let fireLog = new THREE.Mesh(fireLogGeo, fireLogMaterial)
    fireLog.rotation.x -= Math.PI / 2;
    fireLog.position.y = 0.5
    fire.add(fireLog);

    let fireFlame = new THREE.Mesh(fireGeo, fireMaterial)
    fireFlame.position.y = 1
    fire.add(fireFlame);

    scene.add(fire)

}*/

function spawnFruit() {
    let fruitGeo = new THREE.SphereGeometry(0.5, 0.5, 40);
    let fruitTex = new THREE.TextureLoader().load("./img/orange.jpg")
    let fruitMaterial = new THREE.MeshPhongMaterial({
        map: fruitTex
    })

    fruitSpawned = new THREE.Object3D

    let fruit = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit.position.set(11, 0.5, 15.5)
    fruitSpawned.add(fruit)
    scene.add(fruitSpawned)
    fruits.push(fruit)

    fruitSpawned1 = new THREE.Object3D

    let fruit1 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit1.position.set(21, 0.5, 15.5)
    fruitSpawned.add(fruit1)
    scene.add(fruitSpawned1)
    fruits.push(fruit1)

    fruitSpawned2 = new THREE.Object3D

    let fruit2 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit2.position.set(-19, 0.5, -14.5)
    fruitSpawned.add(fruit2)
    scene.add(fruitSpawned)
    fruits.push(fruit2)

    fruitSpawned3 = new THREE.Object3D

    let fruit3 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit3.position.set(-13, 0.5, 14.5)
    fruitSpawned.add(fruit3)
    scene.add(fruitSpawned3)
    fruits.push(fruit3)

    //check if it's pushing
    console.log(fruits)

    fruitSpawned4 = new THREE.Object3D

    let fruit4 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit4.position.set(-10, 0.5, 0.5)
    fruitSpawned.add(fruit4)
    scene.add(fruitSpawned4)
    fruits.push(fruit4)

    fruitSpawned5 = new THREE.Object3D

    let fruit5 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit5.position.set(31, 0.5, -9.5)
    fruitSpawned.add(fruit5)
    scene.add(fruitSpawned5)
    fruits.push(fruit5)

    fruitSpawned6 = new THREE.Object3D

    let fruit6 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit6.position.set(26, 0.6, 5.5)
    fruitSpawned.add(fruit6)
    scene.add(fruitSpawned6)
    fruits.push(fruit6)

    fruitSpawned7 = new THREE.Object3D

    let fruit7 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit7.position.set(21, 0.5, 34.5)
    fruitSpawned.add(fruit7)
    scene.add(fruitSpawned7)
    fruits.push(fruit7)

    fruitSpawned8 = new THREE.Object3D

    let fruit8 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit8.position.set(-29, 0.5, -19)
    fruitSpawned.add(fruit8)
    scene.add(fruitSpawned8)
    fruits.push(fruit8)

    fruitSpawned9 = new THREE.Object3D

    let fruit9 = new THREE.Mesh(fruitGeo, fruitMaterial)
    fruit9.position.set(26, 0.6, 5.5)
    fruitSpawned.add(fruit9)
    scene.add(fruitSpawned9)
    fruits.push(fruit9)

    fruitSpawned10 = new THREE.Object3D

    let fruit10 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit10.position.set(25, 0.5, -14.5)
    fruitSpawned.add(fruit10)
    scene.add(fruitSpawned10)
    fruits.push(fruit10)

    fruitSpawned11 = new THREE.Object3D

    let fruit11 = new THREE.Mesh(fruitGeo, fruitMaterial)

    fruit11.position.set(-14, 0.5, 31)
    fruitSpawned.add(fruit11)
    fruit11.name = "Melhor amiga";
    scene.add(fruitSpawned11)
    fruits.push(fruit11)
}

/*function despawnFruit(event) {
    
}*/

function mouseDown(event) {
    event.preventDefault();

    // get the mouse position in viewport coordinates
    let mousePoint = new THREE.Vector2();
    mousePoint.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePoint.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    let fruitDelete
    // create a raycaster and update the picking ray with the camera and current mouse position
    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mousePoint, camera);
    
    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects(fruits);

    if (intersects.length > 0) {
        console.log("This has started");
        selectedObject = intersects[0].object;
        if (selectedObject != null) {

            selectedObject.position.y = -200
            fruitDelete = fruits.indexOf(selectedObject)
            fruits.splice(fruitDelete, 1)
        }
        

        //disable the orbit controller (drag the object around and not rotate the scene)
        /*controls.enabled = false;
        //assign the first intersected object to the selectedObject global variable
        selectedObject = intersects[0].fruitSpawned;
        
        // determine the offset between the point (in the plane) where we clicked and the center of the object
        let intersectsPlane = raycaster.intersectObject(plane);
        offset.copy(intersectsPlane[0].point).sub(selectedObject.position);
        console.log("object selected ", selectedObject.position, offset)*/
    }
    else{
        console.log("No fruit found")
    }
}

/*function mouseMove(event) {
    event.preventDefault();
    // get the mouse position in viewport coordinates
    let mousePoint = new THREE.Vector2();
    mousePoint.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePoint.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // create a raycaster and update the picking ray with the camera and current mouse position
    raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mousePoint, camera);

    // if we've selected an object and are dragging it around
    if (selectedObject) {
        //drag an object around if we've already clicked on one
        let intersects = raycaster.intersectObject(plane);
        selectedObject.position.copy(intersects[0].point.sub(offset));
    } 
    // b) auxiliary plane must pass on the object's center
    else {
        let intersects = raycaster.intersectObjects(fruits);
        if (intersects.length > 0) {
            console.log("reposition the plane")
            //reposition the plane
            plane.position.copy(intersects[0].fruitSpawned.position);
            //c) make sure the plane faces the camera 
            plane.lookAt(camera.position);
          }
    }
}*/


function mouseUp(event) {
    //controls.enabled = true;
    selectedObject = null;
}

//animate
function animate() {
    requestAnimationFrame(animate);

    //keyboard event functions

    if (keyboard[87]) { //s key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed
        camera.position.z -= Math.cos(camera.rotation.y) * player.speed
    }
    if (keyboard[83]) { //w key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed
        camera.position.z += Math.cos(camera.rotation.y) * player.speed
    }

    if (keyboard[65]) { //left movement
        camera.rotation.y += Math.PI * 0.01;
    }

    if (keyboard[68]) { //right movement
        camera.rotation.y -= Math.PI * 0.01;
    }

    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true;

}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}