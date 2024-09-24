import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";

//Scene
const scene = new THREE.Scene();

//Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / window.innerWidth; // Divided by innerwidth so the value ranges from 0 to 1
  cursor.y = e.clientY / window.innerHeight; // Divided by innerHeight so the value ranges from 0 to 1
  // console.log(cursor.x, "x mouse");
});

//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const geometry = new THREE.PlaneBufferGeometry(1, 1, 64, 64);
const material = new THREE.RawShaderMaterial({
  side: THREE.DoubleSide,
  wireframe: true,
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms: {
    u_amplitude: { value: 5.0 },
    u_time: { value: 0.0 },
    u_color: { value: new THREE.Color("purple") },
    u_colortime: { value: 0 },
    u_cursorcolor: { value: new THREE.Vector2(cursor.x, cursor.y) },
  },
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const amount = geometry.attributes.position.count;
const newAttributeArray = new Float32Array(amount);
for (let i = 0; i < amount; i++) {
  newAttributeArray[i] = Math.random();
}
geometry.setAttribute(
  "a_modulus",
  new THREE.BufferAttribute(newAttributeArray, 1)
);

console.log(geometry);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(aspect.width, aspect.height);

//EffectComposer
const effectComposer = new EffectComposer(renderer);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
effectComposer.setSize(aspect.width, aspect.height);

//RenderPass
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

//PASSES
//GlitchPass
// const glitchPass = new GlitchPass();
// effectComposer.addPass(glitchPass);

//DotScreenPass
// const dotScreenPass = new DotScreenPass();
// effectComposer.addPass(dotScreenPass);

//FilmPass
// const filmPass = new FilmPass();
// effectComposer.addPass(filmPass);

//AfterImagePass
// const afterImagePass = new AfterimagePass();
// effectComposer.addPass(afterImagePass);

//LuminosityShader
// const luminosityShader = new ShaderPass(LuminosityShader);
// effectComposer.addPass(luminosityShader);

//RGBShift SHader
// const rgbshiftShader = new ShaderPass(RGBShiftShader);
// effectComposer.addPass(rgbshiftShader);

//-------------------------------------------------------------

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //update u_time
  material.uniforms.u_time.value = elapsedTime;

  //update u_colortime
  material.uniforms.u_colortime.value = elapsedTime;

  //cursor
  material.uniforms.u_cursorcolor.value.x = cursor.x;
  material.uniforms.u_cursorcolor.value.y = cursor.y;
  //Update Controls
  orbitControls.update();

  //Renderer
  // renderer.render(scene, camera);
  effectComposer.render();

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
