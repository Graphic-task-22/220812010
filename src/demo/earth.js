import * as THREE from 'three';

import sphere from '../mesh/sphere';

import Stats from 'three/addons/libs/stats.module.js';
import pointLight  from '../lights/pointLights';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

console.log(THREE);

// 全局变量
let renderer,scene,camera;
let ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

function init(){
  console.log(window.devicePixelRatio);
    // 建立场景
    scene = new THREE.Scene();
    scene.add(sphere);

    //场景添加点光源
    scene.add(pointLight);
    //点光源辅助观察
    const pointLightHelpler = new THREE.PointLightHelper(pointLight);
    scene.add(pointLightHelpler);
    // 环境光
    scene.add(ambientLight);

    const textureCube = new THREE.CubeTextureLoader().setPath('../../assets/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
    // CubeTexture表示立方体纹理对象，父类是纹理对象Texture 
    
    const hj=new THREE.MeshStandardMaterial({
        metalness: 1.0,roughness: 0.5,
        envMap: textureCube, //设置pbr材质环境贴图
    })  
    scene.environment = hj;

        
    // 创建相机 使用的是 PerspectiveCamera（透视摄像机）
    camera = new THREE.PerspectiveCamera(
      75, // 视野角度（FOV）
      window.innerWidth / window.innerHeight, // 长宽比（aspect ratio）
      0.1, // 近截面（near）
      1000 // 远截面（far）
    );
    // 设置相机摆放的位置
    camera.position.set(100, 100, 100);
    // 设置相机看向的位置
    camera.lookAt(0, 0, 0);
    
    // WebGLRenderer 渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //  renderer（渲染器）的dom元素（renderer.domElement）添加到 HTML 文档中
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);
}

//辅助控制器
function initHelper(params){
      // 辅助坐标轴
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
      renderer.render(scene, camera); //执行渲染操作
    }); //监听鼠标、键盘事件

}

//动画
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // 立方体旋转
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  // 或 cube.rotateY(0.01)
}

//stats查看threejs渲染帧率
function initstate(){
  //创建stats对象
    const stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
    // 渲染函数
    function render() {
      //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
      stats.update();
      renderer.render(scene, camera);//执行渲染操作
      requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();
}

window.onresize=function(){
 if(!renderer)
  return;

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.render(scene, camera);
  camera.updateProjectionMatrix();
}


init();
initHelper();
animate();
initstate();

//----------------------------------控制面板----------------------------------
const gui = new GUI();

// 改变几何对象的属性
let WTfodler=gui.addFolder('物体');
let WZfodler=WTfodler.addFolder('位置');
let CZfodler=WTfodler.addFolder("材质");

//几何属性，坐标
WZfodler.add(sphere.position, 'x', -100, 100).name('x坐标');
WZfodler.add(sphere.position, 'y', -100, 100).name('y坐标');
WZfodler.add(sphere.position, 'z', -100, 100).name('z坐标');

CZfodler.addColor(sphere.material, 'color').name('颜色')//几何材质，颜色属性
// 布尔值设置单选框
CZfodler.add(sphere.material, 'transparent').name('是否透明');
CZfodler.add(sphere.material,'opacity',0,1).name('透明度');

//改变光源
let GYfodler=gui.addFolder('光源');
let HJfodler=GYfodler.addFolder('环境光');
let Dfodler=GYfodler.addFolder('点光源');

HJfodler.addColor(ambientLight,'color').name('颜色');
HJfodler.add(ambientLight, 'intensity', 0.1, 2).name('强度').step(0.1).onChange((value) => {
  console.log(value);
});

Dfodler.addColor(pointLight,'color').name('颜色');
Dfodler.add(pointLight, 'intensity', 0.1, 2).name('强度').step(0.1).onChange((value) => {
  console.log(value);
});
let DWZfodler=Dfodler.addFolder("位置");
DWZfodler.add(pointLight.position, 'x', -100, 100).name('x坐标');
DWZfodler.add(pointLight.position, 'y', -100, 100).name('y坐标');
DWZfodler.add(pointLight.position, 'z', -100, 100).name('z坐标');

// 执行方法
const settings = {
  clear() {
      CZfodler.children[0].reset(); 
   },
   setDefault() {
      WZfodler.children[0].reset();
      WZfodler.children[1].reset();
      WZfodler.children[2].reset();

      CZfodler.children[0].reset();
      CZfodler.children[1].reset();
      CZfodler.children[2].reset();

      HJfodler.children[0].reset();
      HJfodler.children[1].reset();

      Dfodler.children[0].reset();
      Dfodler.children[1].reset();

      DWZfodler.children[0].reset();
      DWZfodler.children[1].reset();
      DWZfodler.children[2].reset();
      
   }
};
gui.add(settings, 'clear').name("重置颜色");//重置颜色
gui.add(settings, 'setDefault').name("恢复默认"); // 重置到默认值

// 关闭打开菜单
gui.close()
gui.open()