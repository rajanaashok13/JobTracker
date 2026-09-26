import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CareerPipelineBackground
 * Replaces the chaotic bubble particle clouds with a purposeful, high-end
 * Career Pipeline & Job Application Network 3D WebGL experience.
 *
 * Features:
 * 1. Perspective Career Trajectory Grid (Clean ground & matrix vectors)
 * 2. Multi-stage Pipeline Pathways connecting Application stages (Applied -> Interview -> Selected -> Offer)
 * 3. Animated Data Packets / Career Beacons gliding along pipeline avenues
 * 4. Geometric Career Prism Gyroscope (Precision tech aesthetic, zero blurry bubbles)
 * 5. Interactive Parallax responsiveness to mouse movement
 */
const CareerPipelineBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch (e) {
      return;
    }

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a10, 0.015);

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
    camera.position.set(0, 18, 55);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 2. Perspective Career Grid Plane (Ground Matrix)
    const gridHelper = new THREE.GridHelper(160, 40, 0xf59e0b, 0x1e2433);
    gridHelper.position.y = -14;
    gridHelper.material.opacity = 0.22;
    gridHelper.material.transparent = true;
    rootGroup.add(gridHelper);

    // 3. Multi-Stage Pipeline Highway Tubes / Curves
    // Four distinct career pipeline avenues spanning through 3D space
    const pipelineCurves = [
      // Avenue 1: Primary Engineering Highway
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-45, -12, -30),
        new THREE.Vector3(-25, -4, -10),
        new THREE.Vector3(0, 2, 5),
        new THREE.Vector3(25, 8, -5),
        new THREE.Vector3(50, 16, -25)
      ]),
      // Avenue 2: Leadership / Senior Pathway
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-50, 4, -40),
        new THREE.Vector3(-20, 8, -15),
        new THREE.Vector3(10, 6, 0),
        new THREE.Vector3(35, 2, -10),
        new THREE.Vector3(55, -6, -30)
      ]),
      // Avenue 3: Architecture & Systems Pipeline
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-40, -8, -15),
        new THREE.Vector3(-10, -2, 10),
        new THREE.Vector3(15, -4, 15),
        new THREE.Vector3(40, 4, 5)
      ])
    ];

    const pipelineMaterials = [
      new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.55 }),
      new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.45 }),
      new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.4 })
    ];

    pipelineCurves.forEach((curve, idx) => {
      const points = curve.getPoints(100);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, pipelineMaterials[idx % pipelineMaterials.length]);
      rootGroup.add(line);
    });

    // 4. Pipeline Milestone Nodes (Representing Applied, Interview, Selected, Offer)
    const milestoneGroup = new THREE.Group();
    const nodeCoords = [
      { pos: new THREE.Vector3(-25, -4, -10), color: 0xf59e0b, label: 'Applied' },
      { pos: new THREE.Vector3(0, 2, 5), color: 0x8b5cf6, label: 'Interview' },
      { pos: new THREE.Vector3(25, 8, -5), color: 0x10b981, label: 'Selected' },
      { pos: new THREE.Vector3(50, 16, -25), color: 0xff6b35, label: 'Offer' },
      { pos: new THREE.Vector3(-20, 8, -15), color: 0xf59e0b, label: 'Applied' },
      { pos: new THREE.Vector3(10, 6, 0), color: 0x8b5cf6, label: 'Interview' },
      { pos: new THREE.Vector3(35, 2, -10), color: 0x10b981, label: 'Offer' }
    ];

    const nodeGeometry = new THREE.OctahedronGeometry(1.3, 0);

    nodeCoords.forEach((node) => {
      const nodeMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.75
      });
      const mesh = new THREE.Mesh(nodeGeometry, nodeMat);
      mesh.position.copy(node.pos);

      // Outer radar pulse ring for each milestone
      const ringGeo = new THREE.RingGeometry(2.2, 2.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      mesh.add(ringMesh);

      milestoneGroup.add(mesh);
    });

    rootGroup.add(milestoneGroup);

    // 5. Flowing Career Data Beacons (Packets traveling along pipeline curves)
    const beaconCount = 18;
    const beacons = [];
    const beaconGeo = new THREE.BoxGeometry(0.8, 0.8, 1.4);

    for (let b = 0; b < beaconCount; b++) {
      const curveIdx = b % pipelineCurves.length;
      const mat = new THREE.MeshBasicMaterial({
        color: curveIdx === 0 ? 0xfbbf24 : curveIdx === 1 ? 0x34d399 : 0xa78bfa,
        wireframe: true
      });
      const mesh = new THREE.Mesh(beaconGeo, mat);
      rootGroup.add(mesh);
      beacons.push({
        mesh,
        curve: pipelineCurves[curveIdx],
        speed: 0.04 + (b % 4) * 0.015,
        offset: b / beaconCount
      });
    }

    // 6. Central Holographic Career Beacon (Rotary Gyroscope Core)
    const coreGroup = new THREE.Group();

    // Geometric Diamond Core
    const prismGeo = new THREE.OctahedronGeometry(8, 0);
    const prismMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    coreGroup.add(prismMesh);

    // Outer Target Radar Ring
    const radarRingGeo = new THREE.TorusGeometry(14, 0.25, 16, 64);
    const radarRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.32
    });
    const radarRingMesh = new THREE.Mesh(radarRingGeo, radarRingMat);
    radarRingMesh.rotation.x = Math.PI / 3;
    coreGroup.add(radarRingMesh);

    // Second Inclined Telemetry Ring
    const telemRingGeo = new THREE.TorusGeometry(18, 0.2, 16, 64);
    const telemRingMat = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.25
    });
    const telemRingMesh = new THREE.Mesh(telemRingGeo, telemRingMat);
    telemRingMesh.rotation.y = Math.PI / 4;
    coreGroup.add(telemRingMesh);

    coreGroup.position.set(24, 6, -10);
    rootGroup.add(coreGroup);

    // 7. Interactive Parallax Tilt
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (event.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Parallax camera rotation
      camera.position.x = currentMouseX * 14;
      camera.position.y = 18 - currentMouseY * 8;
      camera.lookAt(0, 5, 0);

      // Rotate Milestone nodes gently
      milestoneGroup.children.forEach((node, i) => {
        node.rotation.y = elapsedTime * 0.5 + i;
        node.rotation.x = elapsedTime * 0.3;
      });

      // Animate flowing data beacons along pipeline avenues
      beacons.forEach((b) => {
        const t = (elapsedTime * b.speed + b.offset) % 1;
        const pos = b.curve.getPointAt(t);
        const tangent = b.curve.getTangentAt(t);
        b.mesh.position.copy(pos);
        b.mesh.lookAt(pos.clone().add(tangent));
      });

      // Rotate Career Prism core
      coreGroup.rotation.y = elapsedTime * 0.12;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.18;
      prismMesh.rotation.z = elapsedTime * 0.2;
      radarRingMesh.rotation.z = -elapsedTime * 0.15;
      telemRingMesh.rotation.z = elapsedTime * 0.1;

      // Gentle breathing pulse
      const breathe = 1 + Math.sin(elapsedTime * 1.4) * 0.05;
      prismMesh.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (w < 768) {
        coreGroup.position.set(0, -4, -18);
        coreGroup.scale.set(0.7, 0.7, 0.7);
      } else {
        coreGroup.position.set(24, 6, -10);
        coreGroup.scale.set(1, 1, 1);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      gridHelper.geometry.dispose();
      nodeGeometry.dispose();
      beaconGeo.dispose();
      prismGeo.dispose();
      radarRingGeo.dispose();
      telemRingGeo.dispose();
      renderer.dispose();

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="career-pipeline-canvas" aria-hidden="true" />;
};

export default CareerPipelineBackground;
