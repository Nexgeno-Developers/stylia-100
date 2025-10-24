'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import gsap from 'gsap'
import * as THREE from 'three'
import AnimatedText from '@/components/ui/AnimatedText'

interface LookbookItem {
  id: number
  title: string
  description: string
  image: string
  number: string
}

export const LookbookSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    renderer: THREE.WebGLRenderer
    particles: THREE.Points | null
    material: THREE.ShaderMaterial | null
    texture: THREE.Texture | null
  } | null>(null)

  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, amount: 0.5 })

  const lookbookItems: LookbookItem[] = [
    {
      id: 1,
      number: '01',
      title: 'Explore Curated Lookbook',
      description:
        "Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Industry's",
      image: '/images/lookbook-1.png',
    },
    {
      id: 2,
      number: '02',
      title: 'Explore Curated Lookbook',
      description:
        "Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Industry's",
      image: '/images/lookbook-2.png',
    },
    {
      id: 3,
      number: '03',
      title: 'Explore Curated Lookbook',
      description:
        'Is Simply Dummy Text Of The Printing And Typesetting Industry.',
      image: '/images/lookbook-1.png',
    },
    {
      id: 4,
      number: '04',
      title: 'Explore Curated Lookbook',
      description:
        "Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Industry's",
      image: '/images/lookbook-2.png',
    },
    {
      id: 5,
      number: '05',
      title: 'Explore Curated Lookbook',
      description:
        'Is Simply Dummy Text Of The Printing And Typesetting Industry.',
      image: '/images/lookbook-1.png',
    },
    {
      id: 6,
      number: '06',
      title: 'Explore Curated Lookbook',
      description:
        "Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been Industry's",
      image: '/images/lookbook-2.png',
    },
  ]

  // Particle shader for GPU-accelerated rendering
  const vertexShader = `
    uniform float uTime;
    uniform float uProgress;
    uniform vec2 uResolution;
    attribute vec2 uv2;
    attribute float aRandom;
    varying vec2 vUv;
    varying float vAlpha;

    void main() {
      vUv = uv2;
      
      // Explosion phase (0 to 0.5)
      float explosionPhase = smoothstep(0.0, 0.5, uProgress);
      
      // Reassembly phase (0.5 to 1.0)
      float reassemblyPhase = smoothstep(0.5, 1.0, uProgress);
      
      // Calculate displacement
      vec3 displaced = position;
      
      // Explosion - particles scatter outward in 3D
      if(uProgress < 0.5) {
        float explosionForce = explosionPhase * 2.0;
        vec3 direction = normalize(vec3(
          (uv2.x - 0.5) * 2.0,
          (uv2.y - 0.5) * 2.0,
          (aRandom - 0.5) * 2.0
        ));
        
        displaced += direction * explosionForce * 300.0 * (1.0 + aRandom * 0.5);
        displaced.z += sin(aRandom * 10.0 + uTime * 2.0) * explosionForce * 50.0;
      }
      // Reassembly - particles return to original position
      else {
        float returnProgress = (uProgress - 0.5) * 2.0;
        float easeReturn = 1.0 - pow(1.0 - returnProgress, 3.0); // Cubic ease out
        
        vec3 direction = normalize(vec3(
          (uv2.x - 0.5) * 2.0,
          (uv2.y - 0.5) * 2.0,
          (aRandom - 0.5) * 2.0
        ));
        
        float maxDisplacement = 300.0 * (1.0 + aRandom * 0.5);
        displaced += direction * maxDisplacement * (1.0 - easeReturn);
        displaced.z += sin(aRandom * 10.0 + uTime * 2.0) * 50.0 * (1.0 - easeReturn);
      }
      
      // Fade out after reassembly
    vAlpha = uProgress < 0.7 ? 1.0 : (1.0 - (uProgress - 0.7) * 1.33);
      
      vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Particle size based on distance and progress
      float particleSize = 3.0;
      if(uProgress < 0.5) {
        particleSize = mix(3.0, 2.0, explosionPhase);
      } else {
        particleSize = mix(2.0, 3.0, reassemblyPhase);
      }
      
      gl_PointSize = particleSize * (300.0 / -mvPosition.z);
    }
  `

  const fragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vAlpha;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      
      // Circular particle shape
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      float circle = 1.0 - smoothstep(0.4, 0.5, dist);
      
      gl_FragColor = vec4(texColor.rgb, texColor.a * circle * vAlpha);
    }
  `

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    )
    camera.position.z = 500

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles: null,
      material: null,
      texture: null,
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      if (sceneRef.current?.material) {
        sceneRef.current.material.uniforms.uTime.value = Date.now() * 0.001
      }
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = canvas.offsetWidth
      const newHeight = canvas.offsetHeight

      camera.left = newWidth / -2
      camera.right = newWidth / 2
      camera.top = newHeight / 2
      camera.bottom = newHeight / -2
      camera.updateProjectionMatrix()

      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      scene.clear()
    }
  }, [])

  // Create particles from image
  const createParticlesFromImage = (imageSrc: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!sceneRef.current) {
        resolve()
        return
      }

      const { scene, renderer } = sceneRef.current

      // Clean up previous particles
      if (sceneRef.current.particles) {
        scene.remove(sceneRef.current.particles)
        sceneRef.current.particles.geometry.dispose()
        if (sceneRef.current.material) sceneRef.current.material.dispose()
        if (sceneRef.current.texture) sceneRef.current.texture.dispose()
      }

      // Load image texture
      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(imageSrc, (texture: any) => {
        const img = texture.image
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!

        // Adjust resolution for performance (lower = faster, higher = more particles)
        const resolution = 1.5 // Adjust this value (1 = full resolution, 2 = half, etc.)
        canvas.width = img.width / resolution
        canvas.height = img.height / resolution

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        const particles = []
        const uvs = []
        const randoms = []

        const width = canvas.width
        const height = canvas.height
        const containerWidth = canvasRef.current?.offsetWidth || 800
        const containerHeight = canvasRef.current?.offsetHeight || 600

        // Sample pixels (skip some for performance)
        const step = 2 // Sample every 2nd pixel
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const index = (y * width + x) * 4
            const alpha = imageData.data[index + 3]

            // Only create particles for visible pixels
            if (alpha > 50) {
              // Position relative to container center
              const px = (x / width - 0.5) * containerWidth * 0.8
              const py = -(y / height - 0.5) * containerHeight * 0.8

              particles.push(px, py, 0)
              uvs.push(x / width, 1 - y / height)
              randoms.push(Math.random())
            }
          }
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(particles, 3)
        )
        geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(uvs, 2))
        geometry.setAttribute(
          'aRandom',
          new THREE.Float32BufferAttribute(randoms, 1)
        )

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uResolution: {
              value: new THREE.Vector2(containerWidth, containerHeight),
            },
          },
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })

        const points = new THREE.Points(geometry, material)
        scene.add(points)

        if (sceneRef.current) {
          sceneRef.current.particles = points
          sceneRef.current.material = material
          sceneRef.current.texture = texture
        }

        resolve()
      })
    })
  }

  // Transition animation
  const transitionToIndex = async (newIndex: number) => {
    if (isTransitioning || newIndex === activeIndex) return

    setIsTransitioning(true)

    // Phase 1: Explode current image particles
    await createParticlesFromImage(lookbookItems[activeIndex].image)

    if (sceneRef.current?.material) {
      // Explode current image (0 to 0.5)
      await gsap.to(sceneRef.current.material.uniforms.uProgress, {
        value: 0.5,
        duration: 1.2, // SLOW explosion duration
        ease: 'power1.in',
      })

      // Clean up old particles
      if (sceneRef.current?.particles && sceneRef.current?.scene) {
        sceneRef.current.scene.remove(sceneRef.current.particles)
      }
    }

    // Phase 2: Reassemble next image particles
    await createParticlesFromImage(lookbookItems[newIndex].image)

    if (sceneRef.current?.material) {
      // Start at exploded state
      sceneRef.current.material.uniforms.uProgress.value = 0.5

      // Reassemble (0.5 to 1.0)
      await gsap.to(sceneRef.current.material.uniforms.uProgress, {
        value: 1,
        duration: 1.5, // Reassembly duration
        ease: 'back.out(1.4)', // B
        onUpdate: function () {
          if (this.progress() > 0.3) {
            setActiveIndex(newIndex)
          }
        },
        onComplete: () => {
          setIsTransitioning(false)

          if (sceneRef.current?.particles && sceneRef.current?.scene) {
            sceneRef.current.scene.remove(sceneRef.current.particles)
          }
        },
      })
    }
  }

  const handlePrevious = () => {
    const newIndex =
      activeIndex === 0 ? lookbookItems.length - 1 : activeIndex - 1
    transitionToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex =
      activeIndex === lookbookItems.length - 1 ? 0 : activeIndex + 1
    transitionToIndex(newIndex)
  }

  const handleNumberClick = (index: number) => {
    transitionToIndex(index)
  }

  const nextIndex = activeIndex < lookbookItems.length - 1 ? activeIndex + 1 : 0

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full bg-[#00000012] overflow-hidden flex items-center"
    >
      <div className="h-full container mx-auto flex items-center">
        <div className="grid grid-cols-12 h-full w-full">
          {/* Column 1: Number Navigation */}
          <div className="col-span-1 flex flex-col items-center justify-center gap-8 sm:gap-12 py-16 sm:py-24">
            {lookbookItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleNumberClick(index)}
                disabled={isTransitioning}
                className={`font-bold text-2xl sm:text-3xl lg:text-4xl transition-all duration-300 ${
                  index === activeIndex
                    ? 'text-black scale-150'
                    : 'text-[#0000004D] scale-90'
                } ${isTransitioning ? 'pointer-events-none' : 'cursor-pointer'}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.number}
              </motion.button>
            ))}
          </div>

          {/* Column 2-5: Active Image with Particle Overlay */}
          <div className="col-span-3 relative flex items-center justify-center bg-white">
            {/* Base Image */}
            <motion.div
              key={`base-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <img
                src={lookbookItems[activeIndex].image}
                alt={lookbookItems[activeIndex].title}
                className="w-full h-full object-cover "
              />
            </motion.div>

            {/* Three.js Particle Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ opacity: isTransitioning ? 1 : 0 }}
            />
          </div>

          {/* Column 6-9: Center Content */}
          <div className="col-span-5 relative  pl-6 lg:pl-10 py-16 sm:py-24">
            <div className="flex flex-col items-start justify-between h-[60%]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${activeIndex}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-sm xl:text-lg text-black leading-[195%] mb-4 max-w-md"
                >
                  {lookbookItems[activeIndex].description}
                </motion.p>
              </AnimatePresence>

              <h2
                ref={headingRef}
                className="text-5xl lg:text-6xl xl:text-[80px] font-semibold text-black leading-tight"
              >
                <AnimatedText text="Explore" isVisible={isInView} />
                <span className="font-normal">
                  <AnimatedText text="Curated" isVisible={isInView} />
                </span>
                <br />
                <span className="font-normal">
                  {' '}
                  <AnimatedText text="Lookbook" isVisible={isInView} />
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-6 my-10">
              <motion.button
                onClick={handlePrevious}
                disabled={isTransitioning}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className={
                  isTransitioning
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              >
                <ArrowLeft className="w-10 h-10 lg:w-12 lg:h-12 text-black" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={isTransitioning}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className={
                  isTransitioning
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              >
                <ArrowRight className="w-10 h-10 lg:w-12 lg:h-12 text-black" />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 text-black font-medium cursor-pointer text-xl lg:text-3xl"
            >
              <span className="relative">
                Shop Now
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </span>
              <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8" />
            </motion.button>
          </div>

          {/* Column 10-12: Next Preview */}
          <div className="col-span-3 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`next-${nextIndex}`}
                initial={{ x: 100, opacity: 0, scale: 0.9 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -50, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative w-full h-1/2"
              >
                <img
                  src={lookbookItems[nextIndex].image}
                  alt={lookbookItems[nextIndex].title}
                  className="w-full object-contain"
                />
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                  viewport={{ once: true }}
                  className="text-black text-sm mt-0 leading-[195%]"
                >
                  {lookbookItems[nextIndex].description}
                </motion.p>
                <div className="absolute -top-3 -left-3 text-black font-bold text-5xl">
                  {lookbookItems[nextIndex].number}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
