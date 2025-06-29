import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';

const canvasContainer = document.getElementById('chair');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });  // 背景透明
scene.background = null;
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);

scene.background = null;

// ライト - 全体 -
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// ライト - 前 -
const lightFrontRight = new THREE.DirectionalLight(0xffffff, 1);
lightFrontRight.position.set(10, 10, 10);
scene.add(lightFrontRight);

// ライト - 左 -
const lightLeft = new THREE.DirectionalLight(0xffffff, 0.5);
lightLeft.position.set(-15, 20, 0);
scene.add(lightLeft);

// ライト - 右 -
const lightRight = new THREE.DirectionalLight(0xffffff, 0.5);
lightRight.position.set(10, 10, 0);
scene.add(lightRight);

// ライト - 後ろ -
const lightBack = new THREE.DirectionalLight(0xffffff, 0.7);
lightBack.position.set(0, 0, -10);
scene.add(lightBack);

// ライト - 下 -
const lightBottom = new THREE.DirectionalLight(0xffffff, 0.5);
lightBottom.position.set(0, -2, 0);
scene.add(lightBottom);

const loader = new GLTFLoader();

let chairModel;

loader.load('../js/models/chair.glb', (gltf) => {
  chairModel = gltf.scene;
  chairModel.scale.set(2, 2, 2);
  scene.add(chairModel);
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
  controls.update();
  renderer.render(scene, camera);
}

// ズーム操作無効
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;