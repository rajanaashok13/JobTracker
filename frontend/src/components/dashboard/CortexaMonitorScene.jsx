import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CortexaMonitorScene
 * Inspired by ThreeUI "Cortexa Silhouette — Monitor" WebGL background
 * Features:
 * - Cathode-ray cabinet scanned as a wireframe shell with rim comb and tube taper
 * - Lit inner lip and safe-area brackets in corners
 * - Graticule coordinate oscilloscope grid
 * - Two live dynamic telemetry oscilloscope traces (Cyber Emerald & Solar Gold)
 * - Rolling raster scanline band sweeping down the CRT face
 * - 100% NON-BLUE luxury color palette (Cyber Emerald, Solar Gold, Royal Amethyst, Deep Obsidian)
 * - Interactive 3D mouse parallax tilt
 */
const CortexaMonitorScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080b, 0.04);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 10.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Root Group for interactive parallax tilt
    const monitorGroup = new THREE.Group();
    scene.add(monitorGroup);

    // --- Helper: Create Rounded Rectangle Line Geometry ---
    const createRoundedRect = (w, h, r, z = 0) => {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);

      const points = shape.getPoints(48);
      const points3D = points.map(p => new THREE.Vector3(p.x, p.y, z));
      return new THREE.BufferGeometry().setFromPoints(points3D);
    };

    // --- Materials (100% Non-Blue: Emerald, Gold, Obsidian) ---
    const matBezelComb = new THREE.LineBasicMaterial({
      color: 0x059669,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    const matLitInnerLip = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const matSecondaryLip = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const matCabinetCone = new THREE.LineBasicMaterial({
      color: 0x047857,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });

    const matGraticule = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending
    });

    const matBrackets = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const matTrace1 = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });

    const matTrace2 = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5
    });

    const matRasterBeam = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    // --- 1. Cathode-Ray Cabinet Bezel & Combed Rim ---
    const screenW = 8.8;
    const screenH = 5.2;

    // Lit Inner Lip
    const innerLipGeo = createRoundedRect(screenW, screenH, 0.45, 0.1);
    const innerLip = new THREE.Line(innerLipGeo, matLitInnerLip);
    monitorGroup.add(innerLip);

    // Bezel Comb: closely packed concentric rings at the rim
    const combRingsCount = 8;
    for (let i = 1; i <= combRingsCount; i++) {
      const scale = 1 + i * 0.025;
      const zOffset = -i * 0.08;
      const combGeo = createRoundedRect(screenW * scale, screenH * scale, 0.45 + i * 0.03, zOffset);
      const ring = new THREE.Line(combGeo, i % 2 === 0 ? matBezelComb : matSecondaryLip);
      monitorGroup.add(ring);
    }

    // Outer Cabinet Shell & Tapering Electron Tube Neck
    const taperDepths = [-1.0, -1.8, -2.8, -3.8, -4.8, -5.8];
    const taperScales = [1.24, 1.15, 0.95, 0.72, 0.48, 0.28];
    taperDepths.forEach((z, idx) => {
      const s = taperScales[idx];
      const coneGeo = createRoundedRect(screenW * s, screenH * s, 0.35, z);
      const coneRing = new THREE.Line(coneGeo, matCabinetCone);
      monitorGroup.add(coneRing);
    });

    // Connecting Longitudinal Cabinet Rails
    const railCorners = [
      [-screenW / 2 * 1.2, -screenH / 2 * 1.2],
      [screenW / 2 * 1.2, -screenH / 2 * 1.2],
      [-screenW / 2 * 1.2, screenH / 2 * 1.2],
      [screenW / 2 * 1.2, screenH / 2 * 1.2]
    ];
    railCorners.forEach(([cx, cy]) => {
      const railPoints = [
        new THREE.Vector3(cx, cy, -0.6),
        new THREE.Vector3(cx * 0.24, cy * 0.24, -5.8)
      ];
      const railGeo = new THREE.BufferGeometry().setFromPoints(railPoints);
      const railLine = new THREE.Line(railGeo, matCabinetCone);
      monitorGroup.add(railLine);
    });

    // Top Vented Brow (Cooling Slats)
    const ventLinesGroup = new THREE.Group();
    for (let v = 0; v < 6; v++) {
      const vy = screenH / 2 * 1.22 + v * 0.12;
      const vz = -0.5 - v * 0.15;
      const vGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.8, vy, vz),
        new THREE.Vector3(2.8, vy, vz)
      ]);
      ventLinesGroup.add(new THREE.Line(vGeo, matBezelComb));
    }
    monitorGroup.add(ventLinesGroup);

    // --- 2. Graticule Grid (Oscilloscope Division Mesh) ---
    const graticuleGroup = new THREE.Group();
    const gridCols = 10;
    const gridRows = 6;
    const colStep = screenW / gridCols;
    const rowStep = screenH / gridRows;

    // Vertical grid lines
    for (let c = 1; c < gridCols; c++) {
      const gx = -screenW / 2 + c * colStep;
      const gGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(gx, -screenH / 2 + 0.3, 0),
        new THREE.Vector3(gx, screenH / 2 - 0.3, 0)
      ]);
      graticuleGroup.add(new THREE.Line(gGeo, matGraticule));
    }

    // Horizontal grid lines
    for (let r = 1; r < gridRows; r++) {
      const gy = -screenH / 2 + r * rowStep;
      const gGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-screenW / 2 + 0.3, gy, 0),
        new THREE.Vector3(screenW / 2 - 0.3, gy, 0)
      ]);
      graticuleGroup.add(new THREE.Line(gGeo, matGraticule));
    }

    // Center Crosshairs with fine sub-ticks
    const centerHGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-screenW / 2 + 0.2, 0, 0.02),
      new THREE.Vector3(screenW / 2 - 0.2, 0, 0.02)
    ]);
    graticuleGroup.add(new THREE.Line(centerHGeo, matLitInnerLip));

    const centerVGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -screenH / 2 + 0.2, 0.02),
      new THREE.Vector3(0, screenH / 2 - 0.2, 0.02)
    ]);
    graticuleGroup.add(new THREE.Line(centerVGeo, matLitInnerLip));

    // Axis Tick Marks
    for (let t = -screenW / 2 + 0.5; t < screenW / 2; t += 0.4) {
      const tickGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(t, -0.08, 0.02),
        new THREE.Vector3(t, 0.08, 0.02)
      ]);
      graticuleGroup.add(new THREE.Line(tickGeo, matGraticule));
    }
    for (let t = -screenH / 2 + 0.5; t < screenH / 2; t += 0.4) {
      const tickGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.08, t, 0.02),
        new THREE.Vector3(0.08, t, 0.02)
      ]);
      graticuleGroup.add(new THREE.Line(tickGeo, matGraticule));
    }
    monitorGroup.add(graticuleGroup);

    // --- 3. Safe-Area Corner Brackets [ ┌ ┐ └ ┘ ] ---
    const bracketSize = 0.5;
    const bx = screenW / 2 - 0.55;
    const by = screenH / 2 - 0.45;
    const bracketPts = [
      // Top-Left
      [new THREE.Vector3(-bx, by - bracketSize, 0.05), new THREE.Vector3(-bx, by, 0.05), new THREE.Vector3(-bx + bracketSize, by, 0.05)],
      // Top-Right
      [new THREE.Vector3(bx - bracketSize, by, 0.05), new THREE.Vector3(bx, by, 0.05), new THREE.Vector3(bx, by - bracketSize, 0.05)],
      // Bottom-Left
      [new THREE.Vector3(-bx, -by + bracketSize, 0.05), new THREE.Vector3(-bx, -by, 0.05), new THREE.Vector3(-bx + bracketSize, -by, 0.05)],
      // Bottom-Right
      [new THREE.Vector3(bx - bracketSize, -by, 0.05), new THREE.Vector3(bx, -by, 0.05), new THREE.Vector3(bx, -by + bracketSize, 0.05)]
    ];
    bracketPts.forEach(pts => {
      const bGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const bLine = new THREE.Line(bGeo, matBrackets);
      monitorGroup.add(bLine);
    });

    // --- 4. Two Live Dynamic Oscilloscope Traces ---
    const tracePointsCount = 180;
    const traceWidth = screenW - 0.8;

    // Trace 1: Cyber Emerald Wave (Job telemetry heartbeat)
    const trace1Positions = new Float32Array(tracePointsCount * 3);
    const trace1Geo = new THREE.BufferGeometry();
    trace1Geo.setAttribute('position', new THREE.BufferAttribute(trace1Positions, 3));
    const trace1Line = new THREE.Line(trace1Geo, matTrace1);
    monitorGroup.add(trace1Line);

    // Trace 2: Solar Gold Wave (Pipeline frequency modulation)
    const trace2Positions = new Float32Array(tracePointsCount * 3);
    const trace2Geo = new THREE.BufferGeometry();
    trace2Geo.setAttribute('position', new THREE.BufferAttribute(trace2Positions, 3));
    const trace2Line = new THREE.Line(trace2Geo, matTrace2);
    monitorGroup.add(trace2Line);

    // --- 5. Rolling Raster Scanline Band (Cathode Beam) ---
    const rasterPts = [
      new THREE.Vector3(-screenW / 2 + 0.3, 0, 0.04),
      new THREE.Vector3(screenW / 2 - 0.3, 0, 0.04)
    ];
    const rasterGeo = new THREE.BufferGeometry().setFromPoints(rasterPts);
    const rasterLine = new THREE.Line(rasterGeo, matRasterBeam);
    monitorGroup.add(rasterLine);

    // --- 6. Ambient Phosphor Dust Point Cloud ---
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color(0x10b981);
    const amberColor = new THREE.Color(0xf59e0b);

    for (let p = 0; p < particleCount; p++) {
      const idx = p * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 16;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 10;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 8;

      const c = Math.random() > 0.4 ? emeraldColor : amberColor;
      particleColors[idx] = c.r;
      particleColors[idx + 1] = c.g;
      particleColors[idx + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // --- Interactive Mouse Parallax ---
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = normX * 0.14;
      targetRotX = -normY * 0.10;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/monitor parallax damping
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
      monitorGroup.rotation.x = currentRotX;
      monitorGroup.rotation.y = currentRotY;

      // Rotate ambient phosphor cloud subtly
      particleCloud.rotation.y = elapsedTime * 0.02;
      particleCloud.rotation.x = Math.sin(elapsedTime * 0.015) * 0.03;

      // --- Update Oscilloscope Trace 1 (Emerald Telemetry Pulse) ---
      const p1 = trace1Geo.attributes.position.array;
      const pulseX = ((elapsedTime * 2.2) % 14) - 7; // travelling pulse
      for (let i = 0; i < tracePointsCount; i++) {
        const x = -traceWidth / 2 + (i / (tracePointsCount - 1)) * traceWidth;
        const dist = Math.abs(x - pulseX);
        const pulseEffect = Math.exp(-dist * 1.6) * Math.sin(dist * 6 - elapsedTime * 12) * 0.9;
        const baseline = Math.sin(x * 1.5 + elapsedTime * 1.8) * 0.22 +
                         Math.sin(x * 3.8 - elapsedTime * 2.5) * 0.08;
        const y = 0.8 + baseline + pulseEffect;
        p1[i * 3] = x;
        p1[i * 3 + 1] = y;
        p1[i * 3 + 2] = 0.03;
      }
      trace1Geo.attributes.position.needsUpdate = true;

      // --- Update Oscilloscope Trace 2 (Solar Gold Frequency Band) ---
      const p2 = trace2Geo.attributes.position.array;
      for (let i = 0; i < tracePointsCount; i++) {
        const x = -traceWidth / 2 + (i / (tracePointsCount - 1)) * traceWidth;
        const waveA = Math.sin(x * 2.4 - elapsedTime * 2.2) * 0.35;
        const waveB = Math.sin(x * 7.1 + elapsedTime * 3.4) * 0.12;
        const y = -0.9 + waveA + waveB;
        p2[i * 3] = x;
        p2[i * 3 + 1] = y;
        p2[i * 3 + 2] = 0.03;
      }
      trace2Geo.attributes.position.needsUpdate = true;

      // --- Update Rolling Raster Scanline (Cathode Beam sweep) ---
      const rasterPeriod = 3.6; // seconds per full sweep
      const cycle = (elapsedTime % rasterPeriod) / rasterPeriod; // 0 to 1
      const rasterY = (screenH / 2 - 0.2) - cycle * (screenH - 0.4);
      rasterLine.position.y = rasterY;
      // Pulse brightness near center
      matRasterBeam.opacity = 0.35 + Math.sin(cycle * Math.PI) * 0.45;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="cortexa-canvas-layer"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    />
  );
};

export default CortexaMonitorScene;
