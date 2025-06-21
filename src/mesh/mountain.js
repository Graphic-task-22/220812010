import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
const noise2D = createNoise2D();

// 增加分段数以提高线框密度 - 从50x50增加到80x80
const geometry = new THREE.PlaneGeometry(500, 500, 80, 80); 

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x3a5f0b), // 绿色
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2);

export default mesh;

export function updatePosition() {
    const positions = geometry.attributes.position;
  
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
  
      // 使用更精细的噪声效果
      const z = noise2D(x / 120, y / 120) * 40; 
      const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10; 
      
      positions.setZ(i, z + sinNum);
    }
    positions.needsUpdate = true;
}