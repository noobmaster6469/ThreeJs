import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
scene.add(camera);

let loader = new THREE.TextureLoader();
let color = loader.load("textures/color.jpg");
let roughness = loader.load("textures/roughness.jpg");
let normal = loader.load("textures/normal.png");
let height = loader.load("textures/height.png");

const geometry = new THREE.BoxGeometry(3, 1.8, 2, 100, 100, 100);
const material = new THREE.MeshStandardMaterial({
  map: color,
  roughnessMap: roughness,
  normalMap: normal,
  displacementMap: height,
  displacementScale: 0,
  side: THREE.DoubleSide,
  metalness: 0,
  roughness: 0.5,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const canvas1 = document.querySelector("#canvas1");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas1,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 5);
scene.add(directionalLight);

let directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.5
);
scene.add(directionalLightHelper);

let pointLight = new THREE.PointLight(0xffffff, 5, 100, 2);
pointLight.position.set(0, -2, 0);
scene.add(pointLight);

let pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(pointLightHelper);

// GUI controls
const gui = new GUI();

// Material controls
const materialFolder = gui.addFolder("Material");
materialFolder.add(material, "roughness", 0, 1, 0.01);
materialFolder.add(material, "metalness", 0, 1, 0.01);
materialFolder.add(material, "displacementScale", 0, 0.2, 0.001);

// Mesh controls
const meshFolder = gui.addFolder("Mesh");
meshFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01).name("Rotate X");
meshFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01).name("Rotate Y");
meshFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01).name("Rotate Z");
meshFolder.add(cube.position, "x", -5, 5, 0.1).name("Position X");
meshFolder.add(cube.position, "y", -5, 5, 0.1).name("Position Y");
meshFolder.add(cube.position, "z", -5, 5, 0.1).name("Position Z");
meshFolder.add(cube.scale, "x", 0.1, 3, 0.1).name("Scale X");
meshFolder.add(cube.scale, "y", 0.1, 3, 0.1).name("Scale Y");
meshFolder.add(cube.scale, "z", 0.1, 3, 0.1).name("Scale Z");

// Light controls
const lightFolder = gui.addFolder("Lights");

// Ambient Light controls
const ambientLightFolder = lightFolder.addFolder("Ambient Light");
ambientLightFolder.add(ambientLight, "intensity", 0, 2, 0.01).name("Intensity");

// Directional Light controls
const directionalLightFolder = lightFolder.addFolder("Directional Light");
directionalLightFolder
  .add(directionalLight, "intensity", 0, 2, 0.01)
  .name("Intensity");
directionalLightFolder
  .add(directionalLight.position, "x", -5, 5, 0.1)
  .name("Position X");
directionalLightFolder
  .add(directionalLight.position, "y", -5, 5, 0.1)
  .name("Position Y");
directionalLightFolder
  .add(directionalLight.position, "z", -5, 5, 0.1)
  .name("Position Z");

// Point Light controls
const pointLightFolder = lightFolder.addFolder("Point Light");
pointLightFolder.add(pointLight, "intensity", 0, 10, 0.1).name("Intensity");
pointLightFolder.add(pointLight.position, "x", -5, 5, 0.1).name("Position X");
pointLightFolder.add(pointLight.position, "y", -5, 5, 0.1).name("Position Y");
pointLightFolder.add(pointLight.position, "z", -5, 5, 0.1).name("Position Z");
pointLightFolder.add(pointLight, "distance", 0, 200, 1).name("Distance");
pointLightFolder.add(pointLight, "decay", 0, 10, 0.1).name("Decay");

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;
controls.autoRotateSpeed = 10;
controls.enableZoom = true;

let clock = new THREE.Clock();
function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
