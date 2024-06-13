import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
//rendered.setClearColor(0x000000)
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const directionalLight = new THREE.DirectionalLight(0x0099ff, 1.0);
directionalLight.position.set(1, 1, 0);

scene.add(directionalLight);

const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

function animate(t: number = 0) {
  requestAnimationFrame(animate);
  // mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);
  mesh.rotation.y = t * 0.0001;
  controls.update();
  renderer.render(scene, camera);
}
animate();
