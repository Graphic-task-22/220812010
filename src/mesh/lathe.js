import * as THREE from 'three';

const pointsArr = [
    new THREE.Vector2(0, 0),          // 第一个点保持不变
    new THREE.Vector2(70, 60),        // 第二个点向右上方移动，调整形状
    new THREE.Vector2(40, 120),       // 第三个点向右并稍微向上移动
    new THREE.Vector2(10, 200),       // 第四个点向右并增加了更大的高度
    new THREE.Vector2(100, 250),      // 增加一个新的点，修改形状的顶部
    new THREE.Vector2(0, 300)         // 再次改变一个点，确保形状的底部
];


const geometry = new THREE.LatheGeometry(pointsArr);

const materail = new THREE.MeshLambertMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, materail);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(pointsArr);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),
    size: 10
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
mesh.add(points2, line2);

export default mesh;
