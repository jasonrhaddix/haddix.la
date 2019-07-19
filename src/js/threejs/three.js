import * as THREE from 'three'
// var OrbitControls = require('three-orbit-controls')(THREE);
import { TweenMax } from 'gsap'
// import TWEEN from "tween.js";

const SHADOW_MAP_WIDTH = 2048
const SHADOW_MAP_HEIGHT = 1024
var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
const MESH_SPHERE = require('@/assets/3d/sphere_geom.json3d')
const MESH_PARTICLE = require('../assets/3d/point.png')
var _screenWidth
var _screenSize
var camera_zPos = 70

var three_Camera, three_Scene, three_Renderer, three_RendererDOM
var three_JSONLoader
var three_Controls

var three_ShadowMapCamera = new THREE.PerspectiveCamera(10, 1, 1200, 2500)

var meshSphere_1_Solid // meshPlaneInners
var meshSphere_1_Solid_Mat
var meshSphere_1_Solid_Faces
var meshSphere_1_Solid_Vertices
var meshSphere_1_Wire // meshPlane
var meshSphere_1_Solid_Scale = 17
var meshSphere_1_Wire_Scale = 17.1

var meshSphere_2_Wire // meshPlane
var meshSphere_2_Wire_Mat
var meshSphere_2_Wire_Vertices
var meshSphere_2_Particles // meshPlane2Inner
var meshSphere_2_Particles_PointGeom // pointGeometry
var meshSphere_2_Wire_Scale = 20

var meshSphere_3_Wire // meshPlane
var meshSphere_3_Wire_Vertices
var meshSphere_3_Particles // meshPlane2Inner
var meshSphere_3_Particles_PointGeom // pointGeometry2
var meshSphere_3_Wire_Scale = 120

var windowFocused = false
var appState = true
var introComplete = false

initThreeJS()

function initThreeJS () {
  medieQueries_Init()

  initThreeJS_World()
  iniThreeJS_Geometry()
  // initThreeJS_Controls();

  setTimeout(function () {
    initThreeJS_Display()
    initThreeJS_Render()
  }, 1000)

  setTimeout(function () {
    initThreeJS_Animate()
    // animateIntro();
  }, 750)

  setTimeout(function () {
    twitch_Inner()
  }, 6000)
}

function initThreeJS_Display () {
  // document.getElementById('three-container').appendChild( three_Renderer.domElement );
  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('mousemove', onDocumentMouseDown, false)
}

function initThreeJS_World () {
  // Scene
  three_Scene = new THREE.Scene()

  // Camera
  three_Camera = new THREE.PerspectiveCamera(40, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000)
  three_Camera.position.x = 0
  three_Camera.position.y = -2
  three_Camera.position.z = camera_zPos
  three_Camera.fov = 2 * Math.atan((SCREEN_WIDTH / three_Camera.aspect) / (2 * 1100)) * (180 / Math.PI)
  three_Camera.updateProjectionMatrix()

  // Renderer
  three_Renderer = new THREE.WebGLRenderer({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, scale: 1, antialias: true, alpha: true })
  three_Renderer.setPixelRatio(window.devicePixelRatio)
  three_Renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
  three_Renderer.autoClear = false
  three_Renderer.shadowMap.enabled = true
  three_Renderer.shadowMap.type = THREE.PCFShadowMap

  three_RendererDOM = three_Renderer.domElement

  // Lights
  /// / Ambient Light
  var three_A1_Light = new THREE.AmbientLight(0xFFFFFF, 0.1)

  /// / Directional Light 1
  var three_D1_Light = new THREE.DirectionalLight(0xFFFFFF, 1.4)
  three_D1_Light.position.set(0, 2, -0.2)
  three_D1_Light.target.position.set(0, 0, 0)
  three_D1_Light.castShadow = true
  three_D1_Light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(10, 1, 1200, 2500))
  three_D1_Light.shadow.mapSize.width = SHADOW_MAP_WIDTH
  three_D1_Light.shadow.mapSize.height = SHADOW_MAP_HEIGHT

  /// / Directional Light 2
  var three_D2_Light = new THREE.DirectionalLight(0xFFFFFF, 1.4)
  three_D2_Light.position.set(0, -2, -0.2)
  three_D2_Light.target.position.set(0, 0, 0)
  three_D2_Light.castShadow = true
  three_D2_Light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(10, 1, 1200, 2500))
  three_D2_Light.shadow.mapSize.width = SHADOW_MAP_WIDTH
  three_D2_Light.shadow.mapSize.height = SHADOW_MAP_HEIGHT

  /// / Point Light 1
  /* var three_P1_Light = new THREE.PointLight( 0xFFFFFF, 0.5, 80 );
	three_P1_Light.position.set( 0, -25, 10 );
	three_P1_Light.castShadow = true;
	three_P1_Light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 10, 1, 1200, 2500 ) );
	three_P1_Light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
	three_P1_Light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

	//// Point Light 2
	var three_P2_Light = new THREE.PointLight( 0xFFFFFF, 0.5, 80 );
	three_P2_Light.position.set( 0, 25, -10 );
	three_P2_Light.castShadow = true;
	three_P2_Light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 10, 1, 1200, 2500 ) );
	three_P2_Light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
	three_P2_Light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

	//// Point Light 3
	var three_P3_Light = new THREE.PointLight( 0xFFFFFF, 0.5, 80 );
	three_P3_Light.position.set( 0, 25, 10 );
	three_P3_Light.castShadow = true;
	three_P3_Light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 10, 1, 1200, 2500 ) );
	three_P3_Light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
	three_P3_Light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
*/
  /// / Light Represntation
  /* var three_LightRep = new THREE.SphereGeometry( 2, 16, 6 );
	var three_LightRep_Mesh = new THREE.Mesh( three_LightRep, new THREE.MeshBasicMaterial({ color:0x00CCFF, wireframe:true }) )
	three_LightRep_Mesh.position.copy( three_P3_Light.position ); */

  // Add components to scene
  three_Scene.add(three_Camera)

  // three_Scene.add( three_A1_Light );
  three_Scene.add(three_D1_Light)
  // three_Scene.add( three_D2_Light );
  // three_Scene.add( three_P1_Light );
  // three_Scene.add( three_P2_Light );
  // three_Scene.add( three_P3_Light );

  // three_Scene.add( three_LightRep_Mesh );
}

function animateIntro () {
  // TweenMax.to( meshSphere_2_Wire_Mat, 2, { opacity: 0, ease: Power4.easeOut, delay: 0, onComplete: function(){ introComplete = true } });
  // new TWEEN.Tween( meshSphere_1_Solid.material ).to( { opacity: 1 }, 1000 ).start();
}

/* function initThreeJS_Controls()
{
	three_Controls = new OrbitControls( three_Camera );
} */

function iniThreeJS_Geometry () {
  three_JSONLoader = new THREE.JSONLoader()

  // meshSphere_1
  three_JSONLoader.load(MESH_SPHERE, function (geometry) {
    var meshSphere_1_Solid_Mat = new THREE.MeshLambertMaterial({ color: 0x070707, vertexColors: THREE.FaceColors })
    meshSphere_1_Solid_Mat.flatShading = true

    meshSphere_1_Solid = new THREE.Mesh(geometry, meshSphere_1_Solid_Mat)
    meshSphere_1_Solid.scale.set(meshSphere_1_Solid_Scale, meshSphere_1_Solid_Scale, meshSphere_1_Solid_Scale)
    three_Scene.add(meshSphere_1_Solid)

    meshSphere_1_Solid_Vertices = geometry.vertices

    geometry.colorsNeedUpdate = true
    geometry.verticesNeedUpdate = true

    meshSphere_1_Solid_Faces = meshSphere_1_Solid.geometry.faces

    meshSphere_1_Solid.castShadow = true
    meshSphere_1_Solid.receiveShadow = true

    var i = 0
    while (i < meshSphere_1_Solid_Vertices.length) {
        	meshSphere_1_Solid_Vertices[i].originalY = meshSphere_1_Solid_Vertices[i].y
        	meshSphere_1_Solid_Vertices[i].multiplyScalar(THREE.Math.randFloat(0.9, 1.1))

        	++i
    }

    var meshSphere_1_Wire_Mat = new THREE.MeshLambertMaterial({ color: 0xDA5200, vertexColors: THREE.FaceColors, wireframe: true, wireframeLinewidth: 10 })
    meshSphere_1_Wire = new THREE.Mesh(geometry, meshSphere_1_Wire_Mat)
    meshSphere_1_Wire.scale.set(meshSphere_1_Wire_Scale, meshSphere_1_Wire_Scale, meshSphere_1_Wire_Scale)
    three_Scene.add(meshSphere_1_Wire)

    // geometry.computeFaceNormals();
    meshSphere_1_Solid.geometry.computeVertexNormals()
    	meshSphere_1_Solid.geometry.computeFaceNormals()
  })

  // meshSphere_2
  three_JSONLoader.load(MESH_SPHERE, function (geometry) {
    meshSphere_2_Wire_Mat = new THREE.MeshLambertMaterial({ color: 0x3100bd, vertexColors: THREE.VertexColors, wireframe: true })
    meshSphere_2_Wire = new THREE.Mesh(geometry, meshSphere_2_Wire_Mat)
    meshSphere_2_Wire.scale.set(meshSphere_2_Wire_Scale, meshSphere_2_Wire_Scale, meshSphere_2_Wire_Scale)

    three_Scene.add(meshSphere_2_Wire)

    var meshSphere_2_Wire_Vertices = geometry.vertices
    var meshSphere_Faces = meshSphere_2_Wire.geometry.faces

    var i = 0
    while (i < meshSphere_2_Wire_Vertices.length) {
      meshSphere_2_Wire_Vertices[i].originalY = meshSphere_2_Wire_Vertices[i].y

      ++i
    }

    var textureLoader = new THREE.TextureLoader()
    textureLoader.load(MESH_PARTICLE, function (texture) {
      var sprite = event.content
      var meshSphere_2_Particles_PointGeom = new THREE.Geometry()

      for (var i = 0; i < meshSphere_2_Wire_Vertices.length; ++i) {
        meshSphere_2_Particles_PointGeom.vertices.push(geometry.vertices[i])

        var xPos = meshSphere_2_Particles_PointGeom.vertices[i].x
        var yPos = meshSphere_2_Particles_PointGeom.vertices[i].y
        var zPos = meshSphere_2_Particles_PointGeom.vertices[i].z

        meshSphere_2_Particles_PointGeom.vertices[i].setX(xPos)
        meshSphere_2_Particles_PointGeom.vertices[i].setY(yPos)
        meshSphere_2_Particles_PointGeom.vertices[i].setZ(zPos)
      }

      var meshSphere_2_Wire_Point_Mat = new THREE.PointsMaterial({ size: 5, sizeAttenuation: false, map: texture, transparent: true, opacity: 1 })

      meshSphere_2_Particles_PointGeom.scale(1.3, 1.3, 1.3)

      meshSphere_2_Particles = new THREE.Points(meshSphere_2_Particles_PointGeom, meshSphere_2_Wire_Point_Mat)
      // meshSphere_2_Particles.geometry.scale( meshSphere_2_Wire_Scale, meshSphere_2_Wire_Scale, meshSphere_2_Wire_Scale );
      meshSphere_2_Particles.sortParticles = true
        	meshSphere_2_Particles.scale.set(meshSphere_2_Wire_Scale, meshSphere_2_Wire_Scale, meshSphere_2_Wire_Scale)

      three_Scene.add(meshSphere_2_Particles)
    })

		 meshSphere_2_Wire.geometry.computeVertexNormals()
		 meshSphere_2_Wire.geometry.computeFaceNormals()
  })

  // meshSphere_3
  /* three_JSONLoader.load( MESH_SPHERE, function( geometry )
	{
		var meshSphere_3_Wire_Mat = new THREE.MeshLambertMaterial({ color:0x1c006b, vertexColors:THREE.VertexColors, wireframe:true, opacity: 1 });
		meshSphere_3_Wire = new THREE.Mesh( geometry, meshSphere_3_Wire_Mat );

		meshSphere_3_Wire.scale.set( 100, 100, 100 );
		three_Scene.add( meshSphere_3_Wire );

		var meshSphere_3_Wire_Vertices = geometry.vertices;

		var textureLoader = new THREE.TextureLoader();
		textureLoader.load( MESH_PARTICLE, function( texture )
		{
			var sprite = event.content;
			var meshSphere_3_Particles_PointGeom = new THREE.Geometry();

			for( var i = 0; i < meshSphere_3_Wire_Vertices.length; ++i )
			{
				meshSphere_3_Particles_PointGeom.vertices.push( geometry.vertices[i] );

				var xPos = geometry.vertices[i].x;
				var yPos = geometry.vertices[i].y;
				var zPos = geometry.vertices[i].z;

				meshSphere_3_Particles_PointGeom.vertices[i].setX( xPos );
				meshSphere_3_Particles_PointGeom.vertices[i].setY( yPos );
				meshSphere_3_Particles_PointGeom.vertices[i].setZ( zPos );
			}

			var meshSphere_3_Wire_Point_Mat = new THREE.PointsMaterial({ size:2, sizeAttenuation:false, map:texture, transparent:true, opacity:0.0 })

			meshSphere_3_Particles_PointGeom.scale( 1, 1, 1 );

			meshSphere_3_Particles = new THREE.Points( meshSphere_3_Particles_PointGeom, meshSphere_3_Wire_Point_Mat );
			meshSphere_3_Particles.geometry.scale( meshSphere_3_Wire_Scale, meshSphere_3_Wire_Scale, meshSphere_3_Wire_Scale );
			meshSphere_3_Particles.sortParticles = true;

			three_Scene.add( meshSphere_3_Particles );
		})

		meshSphere_3_Wire.geometry.computeVertexNormals();
		meshSphere_3_Wire.geometry.computeFaceNormals();
	}); */
}

function initThreeJS_Animate (time) {
  try {
    appState = (document.getElementById('threeContainer').dataset.focus === 'true')
  } catch (err) {
    appState = false
  }

  windowFocused = !!((appState && document.hasFocus()))
  // windowFocused = ( !introComplete || appState && document.hasFocus() ) ? true : false;

  requestAnimationFrame(initThreeJS_Animate)
  if (windowFocused) initThreeJS_Render(time)
}

function initThreeJS_Render (time) {
  // var motionRate = Date.now() * 0.00003;
  var motionRate = time * 0.00002
  var x = motionRate * 2
  var y = motionRate * 1.65
  var z = motionRate

  try {
	    meshSphere_1_Solid.rotation.set(x, y, z)
	    meshSphere_1_Wire.rotation.set(x, y, z)

	     // meshSphere_1_Wire.scale.set( 17.1 + (motionRate*10), 17.1 + (motionRate*10), 17.1 + (motionRate*10))

	    meshSphere_1_Solid.geometry.verticesNeedUpdate = true
	    meshSphere_1_Solid.geometry.elementsNeedUpdate = true
	    meshSphere_1_Solid.geometry.colorsNeedUpdate = true
  } catch (err) { console.warn('Cannot load meshSphere_1_...') }

  try {
	    meshSphere_2_Wire.rotation.set(y, z, x)
	    meshSphere_2_Particles.rotation.set(y, z, x)

	    meshSphere_2_Wire.verticesNeedUpdate = true
	    meshSphere_2_Wire.colorsNeedUpdate = true
  } catch (err) { console.warn('Cannot load meshSphere_2_...') }

  // meshSphere_2_Particles.verticesNeedUpdate = true;
  // meshSphere_2_Particles.colorsNeedUpdate = true;
  // meshSphere_2_Particles.geometry.computeVertexNormals();

  // var y = motionRate * 0.6;
  // meshSphere_3_Wire.rotation.set( 0, y, 0 );
  // meshSphere_3_Particles.rotation.set( 0, y, 0 );

  /* meshSphere_3_Wire.verticesNeedUpdate = true;
    meshSphere_3_Wire.colorsNeedUpdate = true;
    meshSphere_3_Wire.geometry.computeVertexNormals();

    meshSphere_3_Particles.verticesNeedUpdate = true;
    meshSphere_3_Particles.colorsNeedUpdate = true;
    meshSphere_3_Particles.geometry.computeVertexNormals(); */

  // three_Camera.lookAt( three_Scene.position );

  three_Renderer.clear()
  three_Renderer.render(three_Scene, three_Camera)
}

function onWindowResize () {
  medieQueries_Init()

  three_Camera.position.set(0, -2, camera_zPos)

  SCREEN_WIDTH = window.innerWidth
  SCREEN_HEIGHT = window.innerHeight

  if (SCREEN_HEIGHT > 600) {
	    three_Camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT
	    three_Camera.updateProjectionMatrix()
	    three_Renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
  } else {
    	three_Camera.aspect = SCREEN_WIDTH / 600
	    three_Camera.updateProjectionMatrix()
	    three_Renderer.setSize(SCREEN_WIDTH, 600)
  }

  /* if( SCREEN_WIDTH < 450 )
    {
    	three_Camera.position.z = 100;
    } else {
    	three_Camera.position.z = 65;

    } */
}

function onDocumentMouseDown (event) {
  event.preventDefault()

  var three_Mouse = new THREE.Vector2()
  three_Mouse.x = (event.clientX / SCREEN_WIDTH) * 2 - 1
  three_Mouse.y = -(event.clientY / SCREEN_HEIGHT) * 2 + 1

  var three_Raycaster = new THREE.Raycaster(three_Camera.position)
  three_Raycaster.setFromCamera(three_Mouse, three_Camera)

  var intersects = three_Raycaster.intersectObject(meshSphere_1_Solid)

  if (intersects.length > 0) {
    meshSphere_1_Solid.geometry.colorsNeedUpdate = true

    var i = 0
    while (i < intersects.length) {
      var faceTween1 = TweenMax.fromTo(meshSphere_1_Solid_Faces[intersects[i].faceIndex].color, 0.75, { r: 5, g: 0, b: 20 }, { r: 1, g: 1, b: 1 })

      try {
        var faceTween2 = TweenMax.fromTo(meshSphere_1_Solid_Faces[intersects[i].faceIndex + 1].color, 0.75, { r: 5, g: 5, b: 0 }, { r: 1, g: 1, b: 1 })
      } catch (error) {}

      /* try {
                TweenMax.fromTo(meshSphere_1_Solid_Faces[intersects[i].faceIndex+2].color, 0.75, {r : 2,g :2, b : 2},{r : 1,g :1, b : 1})
            } catch(error){} */

      /* try {
                TweenMax.fromTo(meshSphere_1_Solid_Faces[intersects[i].faceIndex-1].color, 0.75, {r : 4,g :4, b : 4},{r : 1,g :1, b : 1})
            } catch(error){} */

      /* try {
                TweenMax.fromTo(meshSphere_1_Solid_Faces[intersects[i].faceIndex-2].color, 0.75, {r : 2,g :2, b : 2},{r : 1,g :1, b : 1})
            } catch(error){} */

      if (intersects[i].distance > 30) {
        var temp = meshSphere_1_Solid_Faces[intersects[i].faceIndex]

        var tempA = meshSphere_1_Solid_Vertices[temp.a]
        var tempB = meshSphere_1_Solid_Vertices[temp.b]
        var tempC = meshSphere_1_Solid_Vertices[temp.c]

        var t1 = TweenMax.to(tempA, 0.3, { y: tempA.y + THREE.Math.randFloat(0.01, 0.03), ease: Expo.easeOut })
        var t2 = TweenMax.to(tempB, 0.3, { y: tempB.y + THREE.Math.randFloat(0.01, 0.03), ease: Expo.easeOut })
        var t3 = TweenMax.to(tempC, 0.3, { y: tempC.y + THREE.Math.randFloat(0.01, 0.03), ease: Expo.easeOut })

        t1 = TweenMax.to(tempA, 0.65, { y: tempA.originalY, delay: 0.5, ease: Expo.easeOut })
        t2 = TweenMax.to(tempB, 0.65, { y: tempB.originalY, delay: 0.5, ease: Expo.easeOut })
        t3 = TweenMax.to(tempC, 0.65, { y: tempC.originalY, delay: 0.5, ease: Expo.easeOut })
      }

      i++
    }
  }

  three_Mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  three_Mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function twitch_Inner () {
  // meshSphere_1_Solid.geometry.colorsNeedUpdate = true;

  var i = 0

  if (document.hasFocus()) loop()
  function loop () {
    TweenMax.fromTo(meshSphere_1_Solid_Faces[i].color, 0.75, { r: 5, g: 5, b: 5 }, { r: 1, g: 1, b: 1 })

    var temp = meshSphere_1_Solid_Faces[i]

    var tempA = meshSphere_1_Solid_Vertices[temp.a]
    var tempB = meshSphere_1_Solid_Vertices[temp.b]
    var tempC = meshSphere_1_Solid_Vertices[temp.c]

    var tweenA = TweenMax.to(tempA, 0.5, { y: tempA.y + THREE.Math.randFloat(-0.1, 0.1), ease: Power4.easeOut })
    var tweenB = TweenMax.to(tempB, 0.5, { y: tempB.y + THREE.Math.randFloat(-0.1, 0.1), ease: Power4.easeOut })
    var tweenC = TweenMax.to(tempC, 0.5, { y: tempC.y + THREE.Math.randFloat(-0.1, 0.1), ease: Power4.easeOut })

    tweenA = TweenMax.to(tempA, 0.65, { y: tempA.originalY, delay: 0.5, ease: Power4.easeOut })
    tweenB = TweenMax.to(tempB, 0.65, { y: tempB.originalY, delay: 0.5, ease: Power4.easeOut })
    tweenC = TweenMax.to(tempC, 0.65, { y: tempC.originalY, delay: 0.5, ease: Power4.easeOut })

    if (i < meshSphere_1_Solid_Faces.length - 1) {
      i++
      setTimeout(loop, 0.0005 * i)
    }
  }

  setTimeout(twitch_Inner, 20000)
}

function medieQueries_Init () {
  _screenWidth = window.innerWidth

  var mqls = [
    window.matchMedia('screen and (min-width: 768px) and (max-width: 768px)'), // ipad-portrait
			    window.matchMedia('screen and (max-width: 379px)'), // xxs
			    window.matchMedia('screen and (min-width: 380px) and (max-width: 579px)'), // xs
			    window.matchMedia('screen and (min-width: 580px) and (max-width: 767px)'), // sm
			    window.matchMedia('screen and (min-width: 768px) and (max-width: 990px)'), // md
			    window.matchMedia('screen and (min-width: 991px) and (max-width: 1199px)'), // lg
			    window.matchMedia('screen and (min-width: 1200px)') // xl
  ]

  for (var i = 0; i < mqls.length; ++i) {
	    mediaqueryresponse(mqls[i])
  }

  function mediaqueryresponse (mql) {
	    if (mqls[0].matches) {
	    	_screenSize = 'ipad-portrait'
	    } else if (mqls[1].matches) {
	    	_screenSize = 'xxs'
	    	camera_zPos = 100
	    } else if (mqls[2].matches) {
	    	_screenSize = 'xs'
	    	camera_zPos = 100
	    } else if (mqls[3].matches) {
	    	_screenSize = 'sm'
	    	camera_zPos = 80
	    } else if (mqls[4].matches) {
	    	_screenSize = 'md'
	    	camera_zPos = 70
	    } else if (mqls[5].matches) {
	    	_screenSize = 'lg'
	    	camera_zPos = 70
	    } else if (mqls[6].matches) {
	    	_screenSize = 'xl'
	    	camera_zPos = 70
	    } else {
	    	console.log('WINDOW RESIZE | Media Queries | No size found')
	    }
  }
}

export default three_RendererDOM
