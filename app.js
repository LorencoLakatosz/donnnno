import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(24, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubeGeometry = new THREE.TorusGeometry();
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./donut.png');
const cubeMaterial = new THREE.MeshBasicMaterial({ map: texture });

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

const light = new THREE.PointLight(0x394867, 2);
light.position.set(20, -20, 40);

const light2 = new THREE.PointLight(0x9BA4B5, 1);
light2.position.set(-20, 30, 40);

scene.add(light);
// scene.add(light2);
scene.add(cube);

camera.position.z = 20;

function updateAnimation(scrollPos) {
    cube.rotation.z = scrollPos * 0.01;
    cube.rotation.y = -scrollPos * 0.01;
    cube.rotation.x = -scrollPos * -0.02;
    camera.position.z = 20 + scrollPos * -0.04;
    camera.position.x = scrollPos * 0.01;
}

function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop)
}

function handleResize() {
    const {innerWidth, innerHeight} = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
}

function handleScroll() {
    const scrollPos = window.scrollY;
    updateAnimation(scrollPos);
}

loop();
window.addEventListener('resize', handleResize);
window.addEventListener('scroll', handleScroll);
