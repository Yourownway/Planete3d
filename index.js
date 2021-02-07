const scene = new THREE.Scene({ background: "red" });
// scene.background({ color: "red" });
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.SphereGeometry(0.6, 32, 32);

const planet = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture("./img/earth.jpg"),
  bumpMap: THREE.ImageUtils.loadTexture("./img/earth_bump.jpg"),

  bumpScale: 0.01,
  specularMap: THREE.ImageUtils.loadTexture("./img/water.png"),
  specular: new THREE.Color("rgba(255, 255, 255, .1"),
  shininess: 2,
});
const geometryMoon = new THREE.SphereGeometry(0.2, 32, 32);
let arrayMoon = [],
  arrayMeshMoon = [],
  distance = 1;
for (let i = 0; i <= 3; i++) {
  arrayMoon.push(
    new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture("./img/moon.jpg"),
      bumpMap: THREE.ImageUtils.loadTexture("./img/moon_bump.jpg"),

      bumpScale: 0.01,
      specular: new THREE.Color("blue"),
      shininess: 2,
    })
  );

  arrayMeshMoon.push(new THREE.Mesh(geometryMoon, arrayMoon[i]));
  arrayMeshMoon[i].lookAt(0, 0, 0);
}

const coulds = new THREE.Mesh(
  new THREE.SphereGeometry(0.603, 32, 32),
  new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture("./img/coulds.png"),
    transparent: true,
  })
);
const mesh = new THREE.Mesh(geometry, planet);
// const meshMoon = new THREE.Mesh(geometryMoon, arrayMoon[1]);
mesh.position.set(0, 0, 0);
arrayMeshMoon[0].position.set(-1 * distance, 1 * distance, 0);
arrayMeshMoon[1].position.set(-1 * distance, -1 * distance, 0);
arrayMeshMoon[2].position.set(1 * distance, 1 * distance, 0);
arrayMeshMoon[3].position.set(1 * distance, -1 * distance, 0);

const light = new THREE.DirectionalLight(0xffffff, 0.9);
light.position.set(0, 0, 1);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 2;

scene.add(mesh);

arrayMeshMoon.map((elem) => {
  scene.add(elem);
});

scene.add(coulds);
scene.add(light);

// mouse event to camera
document.addEventListener("mousemove", (e) => {
  console.log(e);
  console.log(camera);

  // camera.position.x = (e.x - window.innerWidth / 2) * 0.005;
  let moonNw = arrayMeshMoon[0];
  // function moonNwInit(moonNw) {}
  moonNw.position.x = (e.x - window.innerWidth / 2) * 0.005;
  moonNw.position.y = (e.y - window.innerHeight / 2) * 0.005;
  camera.lookAt(scene.position);
});

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  mesh.rotation.y += 0.006;

  coulds.rotation.y -= 0.001;
  arrayMeshMoon.map((elem) => {
    elem.rotation.y -= 0.005;
    // elem.rotation.x -= 0.01;
  });
};

animate();
