import * as THREE from 'three';

export default function createHouse() {
    const house = new THREE.Group();
    
    // 房屋主体
    const bodyGeometry = new THREE.BoxGeometry(14, 6, 10);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF0F5F5,
        roughness: 0.6,
        metalness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 3;
    house.add(body);

    // 屋顶
    const roofGeometry = new THREE.ConeGeometry(10, 7, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3A6B7E,
        roughness: 0.4,
        metalness: 0.7
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 9.5;
    house.add(roof);

    // 房屋内部空间
    const interiorGeometry = new THREE.BoxGeometry(13.8, 5.8, 9.8);
    const interiorMaterial = new THREE.MeshStandardMaterial({
        color: 0xE6BE8A,
        side: THREE.BackSide,
        roughness: 0.8
    });
    const interior = new THREE.Mesh(interiorGeometry, interiorMaterial);
    interior.position.y = 3;
    house.add(interior);

    // 门
    const doorFrameGeometry = new THREE.BoxGeometry(2.2, 3.2, 0.6);
    const doorFrameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2E1E17,
        roughness: 0.3
    });
    const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
    doorFrame.position.set(0, 1.5, 5);
    house.add(doorFrame);

    // 带纹理的门
    const doorGeometry = new THREE.BoxGeometry(1.8, 2.8, 0.1);
    const doorTexture = new THREE.CanvasTexture(createDoorTexture());
    const doorMaterial = new THREE.MeshStandardMaterial({ 
        map: doorTexture,
        roughness: 0.2,
        metalness: 0.1
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.5, 5.3);
    house.add(door);

    // 窗户框架 - 放在门的右上方
    const windowFrameGeometry = new THREE.BoxGeometry(2.5, 2.5, 0.4);
    const windowFrame = new THREE.Mesh(
        windowFrameGeometry, 
        new THREE.MeshStandardMaterial({ 
            color: 0x2E1E17,
            roughness: 0.3
        })
    );
    windowFrame.position.set(3, 4.0, 5);
    house.add(windowFrame);

    // 窗户玻璃
    const windowGeometry = new THREE.BoxGeometry(2.3, 2.3, 0.1);
    const windowMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0xB0E0E6,
        transmission: 0.85,
        roughness: 0.05,
        thickness: 0.5,
        envMapIntensity: 1.5
    });
    
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(3, 4.0, 5.2);
    house.add(window);

    // 烟囱
    const chimneyGeometry = new THREE.BoxGeometry(1.2, 3.0, 1.2);
    const chimneyMaterial = new THREE.MeshStandardMaterial({
        color: 0x4A4A4A,
        roughness: 0.7
    });
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    chimney.position.set(3.5, 7.5, -3);
    house.add(chimney);

    // 平台
    const platformGeometry = new THREE.BoxGeometry(18, 0.5, 14);
    const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0x7A7D7D,
        roughness: 0.8
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.25;
    house.add(platform);

    // 添加栅栏（围栏）
    createFence(house);

    return house;
}

// 创建带玻璃窗的门纹理
function createDoorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 384;
    const ctx = canvas.getContext('2d');
    
    // 门底色
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(0, 0, 256, 384);
    
    // 门框
    ctx.fillStyle = '#2E1E17';
    ctx.fillRect(0, 0, 256, 20);
    ctx.fillRect(0, 364, 256, 20);
    ctx.fillRect(0, 0, 20, 384);
    ctx.fillRect(236, 0, 20, 384);
    
    // 玻璃窗区域
    ctx.fillStyle = '#B0E0E680';
    ctx.fillRect(50, 60, 70, 80);
    ctx.fillRect(50, 180, 70, 100);
    
    // 窗框
    ctx.fillStyle = '#2E1E17';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 60, 70, 80);
    ctx.beginPath();
    ctx.moveTo(85, 60);
    ctx.lineTo(85, 140);
    ctx.stroke();
    
    ctx.strokeRect(50, 180, 70, 100);
    ctx.beginPath();
    ctx.moveTo(85, 180);
    ctx.lineTo(85, 280);
    ctx.stroke();
    
    // 门把手
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(200, 250, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // 门板纹理
    ctx.strokeStyle = '#2E1E17';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(25, 50 + i * 40);
        ctx.lineTo(230, 50 + i * 40);
        ctx.stroke();
    }
    
    return canvas;
}

// 创建栅栏（围栏）函数
function createFence(house) {
    const fenceMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B5A2B,  // 原木色
        roughness: 0.7
    });
    
    // 围栏柱子
    const postGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8);
    
    // 前围栏柱子 (Z正方向)
    for (let i = -8.5; i <= 8.5; i += 1.4) {
        const frontPost = new THREE.Mesh(postGeometry, fenceMaterial);
        frontPost.position.set(i, 0.75, 7.5);
        house.add(frontPost);
    }
    
    // 后围栏柱子 (Z负方向)
    for (let i = -8.5; i <= 8.5; i += 1.4) {
        const backPost = new THREE.Mesh(postGeometry, fenceMaterial);
        backPost.position.set(i, 0.75, -7.5);
        house.add(backPost);
    }
    
    // 左侧围栏柱子 (X负方向)
    for (let i = -7; i <= 7; i += 1.4) {
        const leftPost = new THREE.Mesh(postGeometry, fenceMaterial);
        leftPost.position.set(-9.5, 0.75, i);
        house.add(leftPost);
    }
    
    // 右侧围栏柱子 (X正方向)
    for (let i = -7; i <= 7; i += 1.4) {
        const rightPost = new THREE.Mesh(postGeometry, fenceMaterial);
        rightPost.position.set(9.5, 0.75, i);
        house.add(rightPost);
    }
    
    // 围栏横梁
    const railGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.8);
    
    // 前后围栏横梁
    for (let i = -8.5; i <= 8.5; i += 1.4) {
        // 前围栏顶部横梁
        const frontTopRail = new THREE.Mesh(railGeometry, fenceMaterial);
        frontTopRail.position.set(i, 1.2, 7.5);
        house.add(frontTopRail);
        
        // 前围栏底部横梁
        const frontBottomRail = new THREE.Mesh(railGeometry, fenceMaterial);
        frontBottomRail.position.set(i, 0.4, 7.5);
        house.add(frontBottomRail);
        
        // 后围栏顶部横梁
        const backTopRail = new THREE.Mesh(railGeometry, fenceMaterial);
        backTopRail.position.set(i, 1.2, -7.5);
        house.add(backTopRail);
        
        // 后围栏底部横梁
        const backBottomRail = new THREE.Mesh(railGeometry, fenceMaterial);
        backBottomRail.position.set(i, 0.4, -7.5);
        house.add(backBottomRail);
    }
    
    // 左右围栏横梁
    for (let i = -7; i <= 7; i += 1.4) {
        // 左侧围栏顶部横梁
        const leftTopRail = new THREE.Mesh(railGeometry, fenceMaterial);
        leftTopRail.rotation.y = Math.PI / 2;
        leftTopRail.position.set(-9.5, 1.2, i);
        house.add(leftTopRail);
        
        // 左侧围栏底部横梁
        const leftBottomRail = new THREE.Mesh(railGeometry, fenceMaterial);
        leftBottomRail.rotation.y = Math.PI / 2;
        leftBottomRail.position.set(-9.5, 0.4, i);
        house.add(leftBottomRail);
        
        // 右侧围栏顶部横梁
        const rightTopRail = new THREE.Mesh(railGeometry, fenceMaterial);
        rightTopRail.rotation.y = Math.PI / 2;
        rightTopRail.position.set(9.5, 1.2, i);
        house.add(rightTopRail);
        
        // 右侧围栏底部横梁
        const rightBottomRail = new THREE.Mesh(railGeometry, fenceMaterial);
        rightBottomRail.rotation.y = Math.PI / 2;
        rightBottomRail.position.set(9.5, 0.4, i);
        house.add(rightBottomRail);
    }
    
    // 围栏大门位置（移除部分围栏）
    // 在前围栏中央留出大门位置（X从-1.2到1.2）
    const gateStart = -1.2;
    const gateEnd = 1.2;
    
    // 移除大门位置的柱子
    for (let i = gateStart; i <= gateEnd; i += 1.4) {
        // 这些位置的柱子将被移除
    }
    
    // 移除大门位置的横梁
    for (let i = gateStart; i <= gateEnd; i += 1.4) {
        // 这些位置的横梁将被移除
    }
    
    // 添加大门柱子（更粗的柱子）
    const gatePostGeometry = new THREE.CylinderGeometry(0.25, 0.25, 1.8, 8);
    
    // 左侧大门柱子
    const leftGatePost = new THREE.Mesh(gatePostGeometry, fenceMaterial);
    leftGatePost.position.set(-1.5, 0.9, 7.5);
    house.add(leftGatePost);
    
    // 右侧大门柱子
    const rightGatePost = new THREE.Mesh(gatePostGeometry, fenceMaterial);
    rightGatePost.position.set(1.5, 0.9, 7.5);
    house.add(rightGatePost);
}