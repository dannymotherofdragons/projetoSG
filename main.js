var scene, camera, mesh, renderer;
var meshFloor;
var keyboard = {};
var player = {
    height: 1.8,
    speed: 0.2,
}

function init() {
    //set up da cena, camera e mesh
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);

    mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({
            color: 0xff9999,
            wireframe: false
        })
    );
    scene.add(mesh);

    createFloor()
    
    //luzes
    ambientLight = new THREE.AmbientLight(0xfffff,0.7   );
    scene.add(ambientLight);

    //camera position
    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    //render function
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);

    animate();
}

function createFloor(){
    meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(45, 37, 10),
        new THREE.MeshPhongMaterial({
            color: 0x42a832,
            wireframe: false
        })
    )
    meshFloor.rotation.x -= Math.PI / 2; //roda -90 graus em x
    scene.add(meshFloor)
    }


//animate
function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    //keyboard event functions

    if (keyboard[87]) { //s key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed
        camera.position.z += Math.cos(camera.rotation.y) * player.speed
    }
    if (keyboard[83]) { //w key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed
        camera.position.z -= Math.cos(camera.rotation.y) * player.speed
    }

    if (keyboard[65]) { //left movement
        camera.rotation.y -= Math.PI * 0.01;
    }

    if (keyboard[68]) { //right movement
        camera.rotation.y += Math.PI * 0.01;
    }

    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true;

}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;