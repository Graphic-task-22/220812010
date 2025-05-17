import * as THREE from 'three';
import cube from "./mesh/cube";
import sphere from './mesh/sphere';
import cone from './mesh/cone';
import plane from './mesh/plane';
import Stats from 'three/addons/libs/stats.module.js';
import pointLight  from './light/pointlight';
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
    // scene.background = new THREE.Color(0xffffff);//白色环境背景


    // 创建Sprite材质
    const textureLoader = new THREE.TextureLoader();
    const spriteTexture = textureLoader.load('./src/assets/snowflake2.png');
    const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteTexture,
        transparent: true,
        blending: THREE.AdditiveBlending // 让黑色部分变透明
    });
    

    // 创建多个Sprite粒子
    const spriteCount = 100; // 设定粒子数量
    for (let i = 0; i < spriteCount; i++) {
        const sprite = new THREE.Sprite(spriteMaterial);
      

        // 随机大小
        const scale = Math.random() * 10 + 5;
        sprite.scale.set(scale, scale, 1);

        // 随机位置（-200 到 200 之间）
        sprite.position.set(
            (Math.random() - 0.5) * 400, 
            (Math.random() - 0.5) * 400, 
            (Math.random() - 0.5) * 400
        );

        scene.add(sprite);
    }

    //场景添加点光源
    scene.add(pointLight);
    //点光源辅助观察
    const pointLightHelpler = new THREE.PointLightHelper(pointLight);
    scene.add(pointLightHelpler);
    // 环境光
    scene.add(ambientLight);

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
    

    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
      renderer.render(scene, camera); //执行渲染操作
    }); //监听鼠标、键盘事件

    // 添加一个辅助网格地面 网格地面辅助观察GridHelper
    const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
    scene.add(gridHelper);
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



// 关闭打开菜单
gui.close()
gui.open()