const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 4;
scene.add(camera);
const width = 1;
const height = 1;
const depth = 1;

const geometry = new THREE.BoxGeometry(width, height, depth);
let material = new THREE.MeshBasicMaterial({ color: "red" });
let mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

let canvas = document.querySelector("#canvas_1");
let renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// mesh.rotation.x = Math.PI / 4;
// mesh.rotation.z = Math.PI / 4;

let clock = new THREE.Clock();

const animate = () => {
  window.requestAnimationFrame(animate);
  mesh.rotation.y = clock.getElapsedTime() * 2;
  renderer.render(scene, camera);
};

animate();
