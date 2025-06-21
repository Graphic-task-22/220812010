import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import createHouse from '../mesh/House';

// 初始化场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 8, 10);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加光源
const light = new THREE.DirectionalLight(0xffffff, 2.5);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x505050));
scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1));

// 添加地面
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0x3a5f0b })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// 添加房屋模型
const house = createHouse();
house.position.set(0, 0, 0);
house.scale.set(0.8, 0.8, 0.8);
scene.add(house);

// 初始化时钟和动画混合器
const clock = new THREE.Clock();
let mixer;

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    if (mixer) {
        mixer.update(delta);
    }
    
    controls.update();
    renderer.render(scene, camera);
}
animate();

// 响应式调整
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
