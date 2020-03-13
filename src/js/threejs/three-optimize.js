import * as THREE from 'three'
import { TweenMax } from 'gsap'

const MESH_PARTICLE = require('@/assets/3d/point.png')

// eslint-disable-next-line no-unused-vars
var introComplete = false
var appState = true
// var windowFocused = false

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight

// eslint-disable-next-line no-unused-vars
var _screenSize
// var _screenWidth;
var cameraZPos = 70

var spScene,
	spCamera,
	spRenderer,
	spRendererDom

var spD1Light,
	spD2Light

var spSphere1Solid,
	spSphere1SolidFaces,
	spSphere1SolidVertices,
	spSphere1Wire

var spSphere1Geom

// var spSphere1Solid_scale = 16,
// spSphere1Wire_scale = 16.1;

var spSphere2Wire,
	spSphere2WireVertices,
	spSphere2Particles

var spSphere2Geom

// var spSphere2Wire_scale = 20;

(() => {
	spInitMediaQueries()

	spInitWorld()
	spInitGeomSphere1()
	spInitGeomSphere2()

	setTimeout(function () {
		spInitDisplay()
		spInitEvents()
	}, 750)

	setTimeout(function () {
		spInitAnimate()
	}, 20)

	setTimeout(() => {
		introComplete = true
	}, 2000)

	setTimeout(function () {
		spInitTwitch()
	}, 5000)
})()

function spInitDisplay () {
	spScene.add(spD1Light)
	spScene.add(spD2Light)

	spScene.add(spSphere1Solid)
	spScene.add(spSphere1Wire)
	spScene.add(spSphere2Wire)

	spScene.add(spSphere2Particles)
	spScene.add(spCamera)
}

function spInitEvents () {
	window.addEventListener('resize', spInitResize, false)
	document.addEventListener('mousemove', spInitMouseMove, false)
}

function spInitResize () {
	spInitMediaQueries()

	spCamera.position.set(0, -2, cameraZPos)

	SCREEN_WIDTH = window.innerWidth
	SCREEN_HEIGHT = window.innerHeight

	if (SCREEN_HEIGHT > 600) {
		spCamera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT
		spCamera.updateProjectionMatrix()
		spRenderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
	} else {
		spCamera.aspect = SCREEN_WIDTH / 600
		spCamera.updateProjectionMatrix()
		spRenderer.setSize(SCREEN_WIDTH, 600)
	}
}

function spInitWorld () {
	spScene = new THREE.Scene()

	spCamera = new THREE.PerspectiveCamera(40, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000)
	spCamera.position.x = 0
	spCamera.position.y = -2
	spCamera.position.z = cameraZPos
	spCamera.updateProjectionMatrix()

	spRenderer = new THREE.WebGLRenderer({ powerPreference: 'high-performance', scale: 1, antialias: true, alpha: true })
	spRenderer.setPixelRatio(window.devicePixelRatio)
	spRenderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

	spRendererDom = spRenderer.domElement

	// Lights
	/// / Directional Light 1
	spD1Light = new THREE.DirectionalLight(0xFFFFFF, 1.4)
	spD1Light.position.set(0, 2, -0.2)
	spD1Light.target.position.set(0, 0, 0)

	/// / Directional Light 2
	spD2Light = new THREE.DirectionalLight(0xFFFFFF, 1.4)
	spD2Light.position.set(0, -2, -0.2)
	spD2Light.target.position.set(0, 0, 0)
}

function spInitGeomSphere1 () {
	spSphere1Geom = new THREE.IcosahedronGeometry(16, 2)

	spSphere1Solid = new THREE.Mesh(...[
		spSphere1Geom,
		new THREE.MeshLambertMaterial({
			color: 0x070707,
			vertexColors: THREE.FaceColors
		})
	])

	spSphere1SolidVertices = spSphere1Solid.geometry.vertices
	spSphere1SolidFaces = spSphere1Solid.geometry.faces

	spSphere1Solid.geometry.colorsNeedUpdate = true
	spSphere1Solid.geometry.verticesNeedUpdate = true

	var i = 0
	while (i < spSphere1SolidVertices.length) {
		spSphere1SolidVertices[i].originalY = spSphere1SolidVertices[i].y
		spSphere1SolidVertices[i].multiplyScalar(THREE.Math.randFloat(0.9, 1.1))
		++i
	}

	spSphere1Wire = new THREE.Mesh(...[
		spSphere1Geom,
		new THREE.MeshLambertMaterial({
			color: 0xFF0099, // 0xDA5200
			vertexColors: THREE.FaceColors,
			wireframe: true
		})
	])

	spSphere1Wire.scale.set(1.005, 1.005, 1.005)
}

function spInitGeomSphere2 () {
	spSphere2Geom = new THREE.IcosahedronGeometry(20, 2)

	spSphere2Wire = new THREE.Mesh(...[
		spSphere2Geom,
		new THREE.MeshLambertMaterial({
			color: 0x3100bd,
			wireframe: true
		})
	])

	spSphere2WireVertices = spSphere2Wire.geometry.vertices

	/* var i = 0;
    while( i < spSphere2WireVertices.length )
    {
    	spSphere2WireVertices[i].originalY = spSphere2WireVertices[i].y;
    	spSphere2WireVertices[i].multiplyScalar( THREE.Math.randFloat( 0.8, 1.2, ));

    	++i
    } */

	var textureLoader = new THREE.TextureLoader()
	textureLoader.load(MESH_PARTICLE, function (texture) {
		var spSphere2ParticlesPointGeom = new THREE.Geometry()

		for (var i = 0; i < spSphere2WireVertices.length; ++i) {
			spSphere2ParticlesPointGeom.vertices.push(spSphere2Geom.vertices[i])

			var xPos = spSphere2ParticlesPointGeom.vertices[i].x
			var yPos = spSphere2ParticlesPointGeom.vertices[i].y
			var zPos = spSphere2ParticlesPointGeom.vertices[i].z

			spSphere2ParticlesPointGeom.vertices[i].setX(xPos)
			spSphere2ParticlesPointGeom.vertices[i].setY(yPos)
			spSphere2ParticlesPointGeom.vertices[i].setZ(zPos)
		}

		var spSphere2WirePointMat = new THREE.PointsMaterial({ size: 2.5, sizeAttenuation: false, map: texture, transparent: true, opacity: 1 })

		spSphere2ParticlesPointGeom.scale(1.3, 1.3, 1.3)

		spSphere2Particles = new THREE.Points(spSphere2ParticlesPointGeom, spSphere2WirePointMat)
		spSphere2Particles.sortParticles = true
		spSphere2Particles.scale.set(1.005, 1.005, 1.005)
	})
}

function spInitAnimate (time) {
	try {
		appState = (document.getElementById('threeContainer').dataset.focus === 'true')
	} catch (err) {
		appState = false
	}

	// windowFocused = ( appState && document.hasFocus() ) ? true : false;
	// windowFocused = (!introComplete || appState && document.hasFocus()) ? true : false

	requestAnimationFrame(spInitAnimate)
	if (appState) spInitRender(time)
	// if (windowFocused) spInitRender( time )
}

function spInitRender (time) {
	// var motionRate = Date.now() * 0.00003;
	var motionRate = time * 0.00002
	var x = motionRate * 2
	var y = motionRate * 1.65
	var z = motionRate

	try {
		spSphere1Solid.rotation.set(x, y, z)
		spSphere1Wire.rotation.set(x, y, z)
		spSphere1Solid.geometry.verticesNeedUpdate = true
		spSphere1Solid.geometry.elementsNeedUpdate = true
		spSphere1Solid.geometry.colorsNeedUpdate = true
	} catch (err) { /**/ }

	try {
		spSphere2Wire.rotation.set(y, z, x)
		spSphere2Particles.rotation.set(y, z, x)
		// meshSphere_2_Wire.verticesNeedUpdate = true;
		// meshSphere_2_Wire.colorsNeedUpdate = true;
	} catch (err) { /**/ }

	spRenderer.clear()
	spRenderer.render(spScene, spCamera)
}

function spInitTwitch () {
	var i = 0

	if (document.hasFocus()) { loop() }

	function loop () {
		TweenMax.fromTo(spSphere1SolidFaces[i].color, 0.75, { r: 255, g: 91, b: 0 }, { r: 1, g: 1, b: 1 })

		var temp = spSphere1SolidFaces[i]

		var tempA = spSphere1SolidVertices[temp.a]
		// var tempB = spSphere1SolidVertices[temp.b]
		// var tempC = spSphere1SolidVertices[temp.c]

		TweenMax.to(tempA, 0.5, { y: tempA.y + THREE.Math.randFloat(-1, 1), ease: Power4.easeOut })
		// TweenMax.to(tempB, 0.5, { y: tempB.y + THREE.Math.randFloat(-1, 1), ease: Power4.easeOut })
		// TweenMax.to(tempC, 0.5, { y: tempC.y + THREE.Math.randFloat(-1, 1), ease: Power4.easeOut })

		TweenMax.to(tempA, 0.5, { y: tempA.originalY, delay: 0.5, ease: Power4.easeOut })
		// TweenMax.to(tempB, 0.5, { y: tempB.originalY, delay: 0.5, ease: Power4.easeOut })
		// TweenMax.to(tempC, 0.5, { y: tempC.originalY, delay: 0.5, ease: Power4.easeOut })

		if (i < spSphere1SolidFaces.length - 1) {
			i++
			setTimeout(loop, 0.0005 * i)
		}
	}

	setTimeout(spInitTwitch, 8000)
}

function spInitMouseMove (event) {
	event.preventDefault()

	var threeMouse = new THREE.Vector2()
	threeMouse.x = (event.clientX / SCREEN_WIDTH) * 2 - 1
	threeMouse.y = -(event.clientY / SCREEN_HEIGHT) * 2 + 1

	var threeRaycaster = new THREE.Raycaster(spCamera.position)
	threeRaycaster.setFromCamera(threeMouse, spCamera)

	var intersects = threeRaycaster.intersectObject(spSphere1Solid)

	if (intersects.length > 0) {
		spSphere1Solid.geometry.colorsNeedUpdate = true

		var i = 0
		while (i < intersects.length) {
			TweenMax.fromTo(spSphere1SolidFaces[intersects[i].faceIndex].color, 0.75, { r: 66, g: 0, b: 198 }, { r: 1, g: 1, b: 1 })

			/* try {
				TweenMax.fromTo(spSphere1SolidFaces[intersects[i].faceIndex + 1].color, 0.75, { r: 255, g: 91, b: 0 }, { r: 1, g: 1, b: 1 })
			} catch (error) {}

			try {
				TweenMax.fromTo(spSphere1SolidFaces[intersects[i].faceIndex + 2].color, 0.75, { r: 255, g: 91, b: 0 }, { r: 1, g: 1, b: 1 })
			} catch (error) {} */

			/* try {
                TweenMax.fromTo(spSphere1SolidFaces[intersects[i].faceIndex-1].color, 0.75, {r : 4,g :4, b : 4},{r : 1,g :1, b : 1})
            } catch(error){} */

			/* try {
                TweenMax.fromTo(spSphere1SolidFaces[intersects[i].faceIndex-2].color, 0.75, {r : 2,g :2, b : 2},{r : 1,g :1, b : 1})
            } catch(error){} */

			if (intersects[i].distance > 30) {
				let temp = spSphere1SolidFaces[intersects[i].faceIndex]

				let tempA = spSphere1SolidVertices[temp.a]
				// let tempB = spSphere1SolidVertices[temp.b]
				// let tempC = spSphere1SolidVertices[temp.c]

				TweenMax.to(tempA, 0.3, { y: tempA.y + THREE.Math.randFloat(0.1, 0.3), ease: Expo.easeOut })
				// TweenMax.to(tempB, 0.3, { y: tempB.y + THREE.Math.randFloat(0.1, 0.3), ease: Expo.easeOut })
				// TweenMax.to(tempC, 0.3, { y: tempC.y + THREE.Math.randFloat(0.1, 0.3), ease: Expo.easeOut })

				TweenMax.to(tempA, 0.5, { y: tempA.originalY, delay: 0.5, ease: Expo.easeOut })
				// TweenMax.to(tempB, 0.55, { y: tempB.originalY, delay: 0.5, ease: Expo.easeOut })
				// TweenMax.to(tempC, 0.55, { y: tempC.originalY, delay: 0.5, ease: Expo.easeOut })
			}

			i++
		}
	}

	threeMouse.x = (event.clientX / window.innerWidth) * 2 - 1
	threeMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

function spInitMediaQueries () {
	// _screenWidth = window.innerWidth;

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
			cameraZPos = 60
		} else if (mqls[2].matches) {
			_screenSize = 'xs'
			cameraZPos = 60
		} else if (mqls[3].matches) {
			_screenSize = 'sm'
			cameraZPos = 60
		} else if (mqls[4].matches) {
			_screenSize = 'md'
			cameraZPos = 70
		} else if (mqls[5].matches) {
			_screenSize = 'lg'
			cameraZPos = 70
		} else if (mqls[6].matches) {
			_screenSize = 'xl'
			cameraZPos = 70
		} else {
			// console.error( "WINDOW RESIZE | Media Queries | No size found")
		}
	}
}

/*********************************/
/*********************************/
// Easing Functions
/*********************************/
/*********************************/
/* function easeOutQuad (t) {
	return t * (2 - t)
} */

export default spRendererDom
