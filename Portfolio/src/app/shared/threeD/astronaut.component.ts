import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
selector: 'astronaut-component',
templateUrl: './astronaut.component.html',
styleUrls: ['./astronaut.component.css'],
providers: [
    { provide: Window, useValue: window }
]
})
export class AstronautComponent implements OnInit, AfterViewInit {

@ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private astronaut?: THREE.Group;

  private animationFrameId = 0;

  private clock = new THREE.Clock();

  // Used by the Rig
  private mouseX = 0;
  private mouseY = 0;

  // Used to smoothly move the model
  private targetRotationX = 0;
  private targetRotationY = 0;

  ngAfterViewInit(): void {
    this.initThree();
    this.loadAstronaut();
    this.animate();
  }

ngOnInit(){
}

private initThree(): void {
    const container = this.canvasContainer.nativeElement;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // --------------------------------------------------
    // Scene
    // --------------------------------------------------

    this.scene = new THREE.Scene();

    // --------------------------------------------------
    // Camera
    // React:
    // <Canvas camera={{ position: [0, 1, 3] }}>
    // --------------------------------------------------

    this.camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      100
    );

    this.camera.position.set(0, 1, 3);

    // --------------------------------------------------
    // Renderer
    // --------------------------------------------------

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    this.renderer.setSize(width, height);

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(this.renderer.domElement);

    // --------------------------------------------------
    // Lighting
    // --------------------------------------------------

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      2
    );

    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      3
    );

    directionalLight.position.set(2, 5, 3);

    this.scene.add(directionalLight);
  }

  private loadAstronaut(): void {
    const loader = new GLTFLoader();

    loader.load(
      'assets/models/tenhun_falling_spaceman_fanart.glb',

      (gltf) => {
        this.astronaut = gltf.scene;

        const isMobile = window.innerWidth < 768;

        // React:
        // scale={isMobile && 0.23}
        //
        // Angular equivalent

        const scale = isMobile ? 0.23 : 1;

        this.astronaut.scale.set(
          scale,
          scale,
          scale
        );

        // React:
        // position={isMobile && [0, -1.5, 0]}

        if (isMobile) {
          this.astronaut.position.set(
            0,
            -1.5,
            0
          );
        }

        this.scene.add(this.astronaut);

        console.log('Astronaut loaded');
      },

      // Loading progress
      (progress) => {
        if (progress.total > 0) {
          const percentage =
            (progress.loaded / progress.total) * 100;

          console.log(
            `Loading astronaut: ${percentage.toFixed(0)}%`
          );
        }
      },

      // Error
      (error) => {
        console.error(
          'Failed to load astronaut:',
          error
        );
      }
    );
  }

  private animate = (): void => {
    this.animationFrameId =
      requestAnimationFrame(this.animate);

    const elapsedTime = this.clock.getElapsedTime();

    // ----------------------------------------------
    // Float
    // ----------------------------------------------
    //
    // React Three Fiber:
    //
    // <Float>
    //   <Astronaut />
    // </Float>
    //
    // We reproduce the floating effect manually.
    // ----------------------------------------------

    if (this.astronaut) {

      const floatY =
        Math.sin(elapsedTime * 1.5) * 0.08;

      const floatRotation =
        Math.sin(elapsedTime * 0.8) * 0.03;

      const baseY =
        window.innerWidth < 768
          ? -1.5
          : 0;

      this.astronaut.position.y =
        baseY + floatY;

      this.astronaut.rotation.z =
        floatRotation;

      // ----------------------------------------------
      // Rig
      // ----------------------------------------------
      //
      // Smoothly follow mouse movement.
      // ----------------------------------------------

      this.astronaut.rotation.y +=
        (this.targetRotationY -
          this.astronaut.rotation.y) * 0.05;

      this.astronaut.rotation.x +=
        (this.targetRotationX -
          this.astronaut.rotation.x) * 0.05;
    }

    this.renderer.render(
      this.scene,
      this.camera
    );
  };

  // --------------------------------------------------
  // Rig / Mouse
  // --------------------------------------------------

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {

    // Convert mouse position to -1 → +1

    this.mouseX =
      (event.clientX / window.innerWidth) * 2 - 1;

    this.mouseY =
      (event.clientY / window.innerHeight) * 2 - 1;

    this.targetRotationY =
      this.mouseX * 0.25;

    this.targetRotationX =
      this.mouseY * 0.15;
  }

  // --------------------------------------------------
  // Resize
  // --------------------------------------------------

  @HostListener('window:resize')
  onResize(): void {

    if (!this.camera || !this.renderer) {
      return;
    }

    const container =
      this.canvasContainer.nativeElement;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect =
      width / height;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      width,
      height
    );
  }

  // --------------------------------------------------
  // Cleanup
  // --------------------------------------------------

  ngOnDestroy(): void {

    cancelAnimationFrame(
      this.animationFrameId
    );

    this.renderer?.dispose();

    if (this.astronaut) {
      this.astronaut.traverse((object) => {

        if (
          object instanceof THREE.Mesh
        ) {
          object.geometry.dispose();

          if (Array.isArray(object.material)) {
            object.material.forEach(
              material => material.dispose()
            );
          } else {
            object.material.dispose();
          }
        }
      });
    }
  }


}