import * as THREE from 'three';
import tunnelTexture from '../assets/image.png';

// 定义路径
const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60)
]);

// 加载贴图
const texture = new THREE.TextureLoader().load(tunnelTexture);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(20, 1); // 沿路径重复展开

// 创建隧道几何体
const geometry = new THREE.TubeGeometry(path, 100, 5, 30, false);

// 材质使用贴图，设置为背面显示
const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide
});

// 导出路径点数组供摄像机动画使用
const tubePoints = geometry.parameters.path.getSpacedPoints(1000);

// 创建网格对象
const mesh = new THREE.Mesh(geometry, material);

export { mesh, tubePoints };
