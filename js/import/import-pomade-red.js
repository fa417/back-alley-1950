import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';


const canvasContainer = document.getElementById('pomade-red');


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

// ライト
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// ライト - 後ろ -
const lightBack = new THREE.DirectionalLight(0xffffff, 0.5);
lightBack.position.set(0, 0, -10);
scene.add(lightBack);

// ライト - 上 -
const lightTop = new THREE.DirectionalLight(0xffffff, 0.5);
lightTop.position.set(0, 1, 0);
scene.add(lightTop);

const loader = new GLTFLoader();

loader.load('../js/models/pomade-red.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(45, 45, 45);
    model.traverse((child) => {
        if (child.isMesh) {
            child.material.side = THREE.DoubleSide;
        }
    });
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
