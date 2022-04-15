import * as THREE from "three";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.setClearColor(0xf0f0f0);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();

function getPoints() {
    const vertices = [];
    const colors = [];
    const numPoints = 100;
    const size = 3.5;
    let x, y, z, r, g, b;
    const colorMulti = 0.9;
    for (let i = 0; i < numPoints; i += 1) {
        x = (Math.random() - 0.5) * size;
        y = (Math.random() - 0.5) * size;
        z = (Math.random() - 0.5) * size;
        r = x * colorMulti;
        g = y * colorMulti;
        b = z * colorMulti;
        vertices.push(x, y, z);
        colors.push(r, g, b);
    }
    // vertices.push(
    //     0, 0, 0, 
    //     0, 2, 0, 
    //     0, 0, 2
    //     );
    return { vertices, colors };
}

function getArtThing({ vertices, colors }) {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial({
        // color: 0x000066,
        vertexColors: true,
        wireframe: false,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
    });
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const mesh = new THREE.Mesh(geometry, material);

    function update() {
        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.002;
    }
    return { mesh, update };
}

const points = getPoints();
const artThing = getArtThing(points);
scene.add(artThing.mesh);

const sunlight = new THREE.DirectionalLight(0xffffff, 0.5);
sunlight.position.set(0, 2, 0);
scene.add(sunlight);

function animate() {
    requestAnimationFrame(animate);

    artThing.update();
    renderer.render(scene, camera);
}
animate();