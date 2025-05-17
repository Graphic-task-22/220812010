import * as THREE from 'three';

//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load('./src/assets/earth_day_4096.png');
texture.colorSpace  = THREE.SRGBColorSpace;//设置为SRGB颜色空间
// 球体
const sphereGeometry = new THREE.SphereGeometry(30,30,30);
const material = new THREE.MeshStandardMaterial({
    opacity: 1,
    transparent: true,
    map: texture//map表示材质的颜色贴图属性
  });
// Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.set(0, 0, 0);//点光源放在x轴上
// sphere.castShadow = true;
// sphere.receiveShadow = true;
export default sphere;