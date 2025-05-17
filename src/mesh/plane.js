import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(100, 100);

//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load('./src/assets/syp.jpg');
texture.colorSpace  = THREE.SRGBColorSpace;//设置为SRGB颜色空间

// 设置阵列模式
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(5,5);//注意选择合适的阵列数量

const material = new THREE.MeshLambertMaterial({
    // 设置纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//map表示材质的颜色贴图属性
});
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 2;


export default plane;