import * as THREE from 'three';

// 圆锥
var coneGeometry = new THREE.ConeGeometry(
    30,        // 底部半径
    30,        // 高度
);
const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    opacity: 0.5,
    transparent: true,
  });
// Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
const cone = new THREE.Mesh(coneGeometry, material);
cone.position.set(0, 100, 0);//点光源放在x轴上

export default cone;