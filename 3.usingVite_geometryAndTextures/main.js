import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
scene.add(camera);

const geometry = new THREE.SphereGeometry(1, 10, 10);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const canvas1 = document.querySelector("#canvas1");
const renderer = new THREE.WebGLRenderer({ canvas: canvas1, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;
controls.enableZoom = true;

let clock = new THREE.Clock();
function animate() {
  window.requestAnimationFrame(animate);
  //   cube.rotation.x = clock.getElapsedTime();
  //   cube.rotation.y = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
}
animate();
