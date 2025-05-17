import * as THREE from 'three';

// 创建几个控制曲线的点
const p1 = new THREE.Vector3(-150, 0, 0); // 增加管道路径的跨度
const p2 = new THREE.Vector3(50, 150, 0);
const p3 = new THREE.Vector3(200, 150, 0);  // 调整路径，增加管道的跨度
const p4 = new THREE.Vector3(150, 0, 100);

// 使用 CubicBezierCurve3 来创建管道的路径
const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);

// 使用 TubeGeometry 来生成管道
const geometry = new THREE.TubeGeometry(curve, 100, 40, 40, false);  // 增大管道的半径和分段数

// 创建一个网格材质，使用 Wireframe 模式来显示网格
const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color('purple'),  // 紫色
    wireframe: true,  // 启用线框模式
    side: THREE.DoubleSide  // 双面渲染
});

// 创建一个 Mesh 来显示管道
const mesh = new THREE.Mesh(geometry, material);

// 为了方便调试，添加控制点
const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1, p2, p3, p4]);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),
    size: 10
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());

// 将控制点和路径线添加到管道网格上
mesh.add(points2, line2);

export default mesh;
