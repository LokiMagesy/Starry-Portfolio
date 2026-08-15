import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'astronaut-component',
  templateUrl: './astronaut.component.html',
  styleUrl: './astronaut.component.css'
})
export class AstronautComponent
  implements AfterViewInit, OnDestroy {

  @ViewChild('canvasContainer', { static: true })
  private canvasContainer!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private astronaut: THREE.Group | null = null;

  // GLTF animation
  private mixer: THREE.AnimationMixer | null = null;
  private animationAction: THREE.AnimationAction | null = null;

  private readonly timer = new THREE.Timer();

  private animationFrameId = 0;

  // Mouse rotation
  private targetRotationX = 0;
  private targetRotationY = 0;

  // Equivalent to React:
  // position={props.position || [1.3, -1, 0]}
  private readonly targetPosition = new THREE.Vector3(
    1.3,
    -1,
    0
  );

  // Equivalent to React spring
  private currentY = 5;
  private targetY = -1;
private frameCount = 0;
  ngAfterViewInit(): void {
    this.initThree();
    this.loadAstronaut();
    this.animate(this.frameCount);
  }

  // ==================================================
  // THREE
  // ==================================================

  private initThree(): void {

    const container =
      this.canvasContainer.nativeElement;

    const width =
      Math.max(container.clientWidth, 1);

    const height =
      Math.max(container.clientHeight, 1);

    this.scene =
      new THREE.Scene();

    this.camera =
      new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        100
      );

    this.camera.position.set(
      0,
      1,
      3
    );

    this.camera.lookAt(
      0,
      0,
      0
    );

    this.renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });

    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    this.renderer.setSize(
      width,
      height
    );

    this.renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    container.appendChild(
      this.renderer.domElement
    );

    // --------------------------------------------------
    // Lighting
    // --------------------------------------------------

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        2
      );

    this.scene.add(
      ambientLight
    );

    const directionalLight =
      new THREE.DirectionalLight(
        0xffffff,
        3
      );

    directionalLight.position.set(
      2,
      5,
      3
    );

    this.scene.add(
      directionalLight
    );
  }

  // ==================================================
  // GLTF
  // ==================================================

  private loadAstronaut(): void {

    const loader =
      new GLTFLoader();

    loader.load(

      '/models/tenhun_falling_spaceman_fanart.glb',

      (gltf) => {

        console.log(
          '[GLTF] Loaded:',
          gltf
        );

        // ----------------------------------------------
        // Main group
        // ----------------------------------------------

        this.astronaut =
          gltf.scene;

        // ----------------------------------------------
        // React:
        //
        // rotation={[-Math.PI / 2, -0.2, 2.2]}
        // ----------------------------------------------

        this.astronaut.rotation.set(
          -Math.PI / 2,
          -0.2,
          2.2
        );

        // ----------------------------------------------
        // React:
        //
        // scale={props.scale || 0.3}
        // ----------------------------------------------

        this.astronaut.scale.setScalar(
          0.3
        );

        // ----------------------------------------------
        // React:
        //
        // position={props.position || [1.3, -1, 0]}
        // ----------------------------------------------

        this.astronaut.position.set(
          this.targetPosition.x,
          this.currentY,
          this.targetPosition.z
        );

        // ----------------------------------------------
        // Add to scene
        // ----------------------------------------------

        this.scene.add(
          this.astronaut
        );

        // ----------------------------------------------
        // GLTF animations
        // ----------------------------------------------

        if (gltf.animations.length > 0) {

          console.log(
            '[GLTF] Animations:',
            gltf.animations
          );

          this.mixer =
            new THREE.AnimationMixer(
              this.astronaut
            );

          const clip =
            gltf.animations[0];

          console.log(
            '[GLTF] Playing animation:',
            clip.name
          );

          this.animationAction =
            this.mixer.clipAction(
              clip
            );

          this.animationAction
            .reset()
            .play();
        } else {

          console.warn(
            '[GLTF] No animations found'
          );
        }

        console.log(
          '[GLTF] Astronaut added:',
          this.astronaut
        );
      },

      (progress) => {

        if (progress.total > 0) {

          const percentage =
            (
              progress.loaded /
              progress.total
            ) * 100;

          console.log(
            `[GLTF] Loading: ${percentage.toFixed(0)}%`
          );
        }
      },

      (error) => {

        console.error(
          '[GLTF] Failed:',
          error
        );
      }
    );
  }

  // ==================================================
  // ANIMATION LOOP
  // ==================================================

  private animate = (timestamp: number): void => {

    this.animationFrameId =
      requestAnimationFrame(
        this.animate
      );

    this.timer.update(timestamp);

    const elapsedTime =
      this.timer.getElapsed();

    // --------------------------------------------------
    // GLTF animation
    // --------------------------------------------------

    if (this.mixer) {

      const delta =
        this.timer.getDelta();

      this.mixer.update(
        delta
      );
    }

    // --------------------------------------------------
    // Spring-like Y movement
    //
    // React:
    // const yPosition = useMotionValue(5);
    // const ySpring = useSpring(yPosition, {
    //   damping: 30
    // });
    // ySpring.set(-1);
    // --------------------------------------------------

    if (this.astronaut) {

      // Simple critically-damped-ish interpolation
      // approximating the React spring.
      this.currentY +=
        (
          this.targetY -
          this.currentY
        ) * 0.05;

      this.astronaut.position.y =
        this.currentY;

      // ------------------------------------------------
      // Mouse rig
      // ------------------------------------------------

      this.astronaut.rotation.y +=
        (
          this.targetRotationY -
          this.astronaut.rotation.y
        ) * 0.05;

      this.astronaut.rotation.x +=
        (
          this.targetRotationX -
          this.astronaut.rotation.x
        ) * 0.05;
    }

    // --------------------------------------------------
    // Render
    // --------------------------------------------------

    this.renderer.render(
      this.scene,
      this.camera
    );
  };

  // ==================================================
  // MOUSE
  // ==================================================

  @HostListener(
    'window:mousemove',
    ['$event']
  )
  onMouseMove(
    event: MouseEvent
  ): void {

    const mouseX =
      (event.clientX /
        window.innerWidth) * 2 - 1;

    const mouseY =
      (event.clientY /
        window.innerHeight) * 2 - 1;

    this.targetRotationY =
      mouseX * 0.25;

    this.targetRotationX =
      mouseY * 0.15;
  }

  // ==================================================
  // RESIZE
  // ==================================================

  @HostListener('window:resize')
  onResize(): void {

    if (
      !this.camera ||
      !this.renderer
    ) {
      return;
    }

    const container =
      this.canvasContainer.nativeElement;

    const width =
      Math.max(
        container.clientWidth,
        1
      );

    const height =
      Math.max(
        container.clientHeight,
        1
      );

    this.camera.aspect =
      width / height;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      width,
      height
    );
  }

  // ==================================================
  // CLEANUP
  // ==================================================

  ngOnDestroy(): void {

    cancelAnimationFrame(
      this.animationFrameId
    );

    this.timer.dispose();

    this.animationAction?.stop();

    this.mixer?.stopAllAction();

    if (this.astronaut) {

      this.astronaut.traverse(
        (object) => {

          if (
            object instanceof THREE.Mesh
          ) {

            object.geometry.dispose();

            if (
              Array.isArray(
                object.material
              )
            ) {

              object.material.forEach(
                material =>
                  material.dispose()
              );

            } else {

              object.material.dispose();
            }
          }
        }
      );

      this.scene.remove(
        this.astronaut
      );

      this.astronaut = null;
    }

    this.renderer?.dispose();

    this.renderer?.domElement.remove();
  }
}