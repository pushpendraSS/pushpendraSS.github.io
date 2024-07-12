import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { KeyDisplay } from '../utils';
import { CharacterControls } from './CharacterControls';

class ModalScene {
    constructor(container) {
        this.container = container;
        this.keysPressed = {};
        this.keyDisplayQueue = new KeyDisplay();

        this.initScene();
        this.loadModel();
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
        document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
        document.addEventListener('keyup', (event) => this.onKeyUp(event), false);
    }

    initScene() {
        // SCENE
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa8def0);

        // CAMERA
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 5);

        // RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);

        // CONTROLS
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.minDistance = 5;
        this.orbitControls.maxDistance = 15;
        this.orbitControls.enablePan = false;
        this.orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
        this.orbitControls.update();

        // LIGHTS
        this.addLights();

        // FLOOR
        this.generateFloor();

        // CLOCK
        this.clock = new THREE.Clock();
    }

    addLights() {
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(-60, 100, -10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 50;
        dirLight.shadow.camera.bottom = -50;
        dirLight.shadow.camera.left = -50;
        dirLight.shadow.camera.right = 50;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 200;
        dirLight.shadow.mapSize.width = 4096;
        dirLight.shadow.mapSize.height = 4096;
        this.scene.add(dirLight);
    }

    generateFloor() {
        const textureLoader = new THREE.TextureLoader();
        const sandBaseColor = textureLoader.load("./Sand 002_COLOR.jpg");
        const sandNormalMap = textureLoader.load("./Sand 002_NRM.jpg");
        const sandHeightMap = textureLoader.load("./Sand 002_DISP.jpg");
        const sandAmbientOcclusion = textureLoader.load("./Sand 002_OCC.jpg");

        const WIDTH = 80;
        const LENGTH = 80;

        const geometry = new THREE.PlaneGeometry(WIDTH, LENGTH, 512, 512);
        const material = new THREE.MeshStandardMaterial({
            map: sandBaseColor,
            normalMap: sandNormalMap,
            displacementMap: sandHeightMap,
            displacementScale: 0.1,
            aoMap: sandAmbientOcclusion
        });
        this.wrapAndRepeatTexture(material.map);
        this.wrapAndRepeatTexture(material.normalMap);
        this.wrapAndRepeatTexture(material.displacementMap);
        this.wrapAndRepeatTexture(material.aoMap);

        const floor = new THREE.Mesh(geometry, material);
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI / 2;
        this.scene.add(floor);
    }

    wrapAndRepeatTexture(map) {
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.repeat.x = map.repeat.y = 10;
    }

    loadModel() {
        new GLTFLoader().load('./Soldier.glb', (gltf) => {
            const model = gltf.scene;
            model.traverse((object) => {
                if (object.isMesh) object.castShadow = true;
            });
            this.scene.add(model);

            const gltfAnimations = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap = new Map();
            gltfAnimations.filter(a => a.name !== 'TPose').forEach((a) => {
                animationsMap.set(a.name, mixer.clipAction(a));
            });

            this.characterControls = new CharacterControls(model, mixer, animationsMap, this.orbitControls, this.camera, 'Idle');
        });
    }

    onKeyDown(event) {
        this.keyDisplayQueue.down(event.key);
        if (event.shiftKey && this.characterControls) {
            this.characterControls.switchRunToggle();
        } else {
            this.keysPressed[event.key.toLowerCase()] = true;
        }
    }

    onKeyUp(event) {
        this.keyDisplayQueue.up(event.key);
        this.keysPressed[event.key.toLowerCase()] = false;
    }

    animate() {
        const mixerUpdateDelta = this.clock.getDelta();
        if (this.characterControls) {
            this.characterControls.update(mixerUpdateDelta, this.keysPressed);
        }
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.keyDisplayQueue.updatePosition();
    }
}

export default ModalScene;