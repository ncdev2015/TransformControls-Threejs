import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import Stats from 'three/examples/jsm/libs/stats.module'
    
export default class Viewer {

    constructor(width, height) {
        // Variables initialization
        this.width = width;
        this.height = height;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
        this.transformControls.name = "transformControls";
        this.grid = new THREE.GridHelper(100, 100);
        this.grid.name = "grid";
        this.axes = new THREE.AxesHelper();
        this.stats = new Stats();
        this.container = document.getElementById("app");

        this.container.appendChild(this.stats.dom);

        this.camera.position.set(3.43, 2.37, 2.75);
        this.camera.lookAt(0, 0, 0);        
        this.renderer.setSize(this.width, this.height);       

        // Scene elements
        let cube = this.createCube(true);
        cube.name = "cube";

        this.transformControls.attach(cube);

        // Adds to scene
        this.scene.add(cube)
        this.scene.add(this.transformControls);
        this.scene.add(this.grid);
        this.scene.add(this.axes)

        this.animate();

        // Events listeners
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 't':
                    this.transformControls.setMode('translate');
                    break;
                case 'r':
                    this.transformControls.setMode('rotate');
                    break;
                case 's':
                    this.transformControls.setMode('scale');
                    break;
                case 'w':
                    this.scene.getObjectByName("cube").material.wireframe = !this.scene.getObjectByName("cube").material.wireframe;
                    break;
                case 'g':
                    this.scene.getObjectByName("grid").visible = !this.scene.getObjectByName("grid").visible;
                    break;
                case ' ':
                    this.transformControls.enabled = !this.transformControls.enabled;
                    break;
                default:
                    break;
            }
        })

        this.transformControls.addEventListener('dragging-changed', (event) => {
            this.controls.enabled = !event.value;
        });
    }

    onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        const render = () => {
            requestAnimationFrame(render);
            this.controls.update();
            this.stats.update();
            this.renderer.render(this.scene, this.camera);
        }
        render();        
    }    

    createCube() {
        // cube basic form
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x289EFF });
        const cube = new THREE.Mesh(geometry, material);
        
        // edges
        const geo = new THREE.EdgesGeometry( cube.geometry );
        const mat = new THREE.LineBasicMaterial( { color: 0x000000 } );
        const wireframe = new THREE.LineSegments(geo, mat);        
        wireframe.renderOrder = 1;
        cube.add(wireframe);
        
        return cube;
    }
}