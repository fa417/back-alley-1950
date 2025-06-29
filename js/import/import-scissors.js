import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';


const canvasContainer = document.getElementById('scissors');


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });  // alpha: trueで背景を透明にする
scene.background = null;
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);  // Canvasを指定したコンテナに追加

scene.background = null;

// ライト - 全体 -
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// ライト - 前 -
const lightFrontRight = new THREE.DirectionalLight(0xffffff, 2);
lightFrontRight.position.set(20, 20, 20);
scene.add(lightFrontRight);

// ライト - 左 -
const lightLeft = new THREE.DirectionalLight(0xffffff, 2);
lightLeft.position.set(-10, 10, 5);
scene.add(lightLeft);

// ライト - 右 -
const lightRight = new THREE.DirectionalLight(0xffffff, 1);
lightRight.position.set(30, 30, 5);
scene.add(lightRight);

// ライト - 後ろ -
const lightBack = new THREE.DirectionalLight(0xffffff, 1);
lightBack.position.set(0, 10, -15);
scene.add(lightBack);

const loader = new GLTFLoader();

loader.load('../js/models/scissors.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(1.2, 1.2, 1.2);
  scene.add(model);
  animate();
}, undefined, (error) => {
  console.error('モデル読み込みエラー:', error);
});

camera.position.z = 15;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// ズーム操作無効
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;