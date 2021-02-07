const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
const root = new THREE.Object3D();
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const planet = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture("../img/earth.jpg"),
  bumpMap: THREE.ImageUtils.loadTexture("../img/earth_bump.jpg"),

  bumpScale: 0.01,
  specularMap: THREE.ImageUtils.loadTexture("../img/water.png"),
  specular: new THREE.Color("white"),
});

const coulds = new THREE.Mesh(
  new THREE.SphereGeometry(0.503, 32, 32),
  new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("../img/coulds.png"),
    transparent: true,
  })
);
const mesh = new THREE.Mesh(geometry, planet);
mesh.position.set(0, 0, 0);

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 2;

scene.add(mesh);
scene.add(coulds);
scene.add(light);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  mesh.rotation.y += 0.001;
  could.rotation.y += 0.01;
};

animate();
