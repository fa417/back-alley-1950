import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';

const canvasContainer = document.getElementById('pole');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
scene.background = null;
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);

// ライト - 全体 -
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// ライト - 前 -
const lightFrontRight = new THREE.DirectionalLight(0xffffff, 1);
lightFrontRight.position.set(1, 1, 1);
scene.add(lightFrontRight);

// ライト - 後ろ -
const lightBack = new THREE.DirectionalLight(0xffffff, 0.5);
lightBack.position.set(0, 0, -10);
scene.add(lightBack);

const loader = new GLTFLoader();

let innerPart = null;

loader.load('../js/models/pole.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1.3, 1.3, 1.3);
    scene.add(model);

    model.traverse((child) => {
        if (child.isMesh) {
            if (child.name.toLowerCase().includes('inner')) {
                innerPart = child;
            }
        }
    });

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
    // 中身だけ回転
    if (innerPart) {
        innerPart.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

// ズーム操作無効
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
