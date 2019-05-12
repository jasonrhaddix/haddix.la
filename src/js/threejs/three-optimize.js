import * as THREE from 'three'
import { TweenMax } from "gsap"


const MESH_PARTICLE = require('@/assets/3d/point.png')


var windowFocused = false,
	appState = true,
	introComplete = false

var SCREEN_WIDTH = window.innerWidth,
	SCREEN_HEIGHT = window.innerHeight

// var _screenWidth;
var _screenSize
var camera_zPos = 70

var sp_scene,
	sp_camera,
	sp_renderer,
	sp_rendererDom

var sp_d1_light,
	sp_d2_light

var sp_sphere_1_solid, 
	sp_sphere_1_solid_faces,
	sp_sphere_1_solid_vertices,
	sp_sphere_1_wire

var sp_sphere_1_geom

// var sp_sphere_1_solid_scale = 16,
	// sp_sphere_1_wire_scale = 16.1;


var sp_sphere_2_wire,
	sp_sphere_2_wire_vertices,
	sp_sphere_2_particles

var sp_sphere_2_geom

// var sp_sphere_2_wire_scale = 20;




(() => {
	sp_initMediaQueries()

	sp_initWorld()
	sp_initGeom_Sphere_1()
	sp_initGeom_Sphere_2()

	setTimeout( function() { 
		sp_initDisplay()
		sp_initEvents()
	}, 750)

	setTimeout( function() {
		sp_initAnimate()		
	}, 10)

	setTimeout(() => {
		introComplete = true
	}, 2000)

	setTimeout( function() { 
		sp_InitTwitch() 
	}, 5000 );
})()





function sp_initDisplay()
{
	sp_scene.add(sp_d1_light)
	sp_scene.add(sp_d2_light)

	sp_scene.add(sp_sphere_1_solid)
	sp_scene.add(sp_sphere_1_wire)
	sp_scene.add(sp_sphere_2_wire)

	sp_scene.add(sp_sphere_2_particles)
	sp_scene.add(sp_camera)
}




function sp_initEvents()
{
	window.addEventListener('resize', sp_initResize, false)
    document.addEventListener('mousemove', sp_initMouseMove, false)
}




function sp_initResize()
{
	sp_initMediaQueries()

	sp_camera.position.set(0 ,-2, camera_zPos)

    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight

    if (SCREEN_HEIGHT > 600) {
		sp_camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT
		sp_camera.updateProjectionMatrix()
		sp_renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT )
	} else {
		sp_camera.aspect = SCREEN_WIDTH / 600
		sp_camera.updateProjectionMatrix()
		sp_renderer.setSize( SCREEN_WIDTH, 600 )
	} 
}




function sp_initWorld()
{
	sp_scene = new THREE.Scene()

	sp_camera = new THREE.PerspectiveCamera( 40, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000 )
	sp_camera.position.x = 0
	sp_camera.position.y = -2
	sp_camera.position.z = camera_zPos
	sp_camera.updateProjectionMatrix()

	sp_renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance", scale:1, antialias:true, alpha:true })
	sp_renderer.setPixelRatio( window.devicePixelRatio )
	sp_renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT )
	
	sp_rendererDom = sp_renderer.domElement


	// Lights
	//// Directional Light 1
	sp_d1_light = new THREE.DirectionalLight( 0xFFFFFF, 1.4 )
	sp_d1_light.position.set( 0, 2, -0.2 )
	sp_d1_light.target.position.set( 0, 0, 0 )

	//// Directional Light 2
	sp_d2_light = new THREE.DirectionalLight( 0xFFFFFF, 1.4 )
	sp_d2_light.position.set( 0, -2, -0.2 )
	sp_d2_light.target.position.set( 0, 0, 0 )
}





function sp_initGeom_Sphere_1()
{
	sp_sphere_1_geom = new THREE.IcosahedronGeometry(16, 2)
	
	sp_sphere_1_solid = new THREE.Mesh(...[
		sp_sphere_1_geom,
		new THREE.MeshLambertMaterial({
				color: 0x070707,
				vertexColors:THREE.FaceColors
		})
	])



	sp_sphere_1_solid_vertices = sp_sphere_1_solid.geometry.vertices
	sp_sphere_1_solid_faces = sp_sphere_1_solid.geometry.faces

	sp_sphere_1_solid.geometry.colorsNeedUpdate = true
	sp_sphere_1_solid.geometry.verticesNeedUpdate = true



	var i = 0; 
    while( i < sp_sphere_1_solid_vertices.length )
    {
		sp_sphere_1_solid_vertices[i].originalY = sp_sphere_1_solid_vertices[i].y
		sp_sphere_1_solid_vertices[i].multiplyScalar( THREE.Math.randFloat( 0.9, 1.1, ))
		++i
    }



	sp_sphere_1_wire = new THREE.Mesh(...[
		sp_sphere_1_geom,
		new THREE.MeshLambertMaterial({
				color: 0xDA5200,
				vertexColors: THREE.FaceColors,
				wireframe: true
		})
	])

	sp_sphere_1_wire.scale.set(1.01, 1.01, 1.01)
}





function sp_initGeom_Sphere_2()
{
	sp_sphere_2_geom = new THREE.IcosahedronGeometry(20, 2);

	sp_sphere_2_wire = new THREE.Mesh(...[
		sp_sphere_2_geom,
		new THREE.MeshLambertMaterial({
				color: 0x3100bd,
				wireframe: true
		})
	])

	sp_sphere_2_wire_vertices = sp_sphere_2_wire.geometry.vertices;

	/*var i = 0; 
    while( i < sp_sphere_2_wire_vertices.length )
    {
    	sp_sphere_2_wire_vertices[i].originalY = sp_sphere_2_wire_vertices[i].y;
    	sp_sphere_2_wire_vertices[i].multiplyScalar( THREE.Math.randFloat( 0.8, 1.2, ));

    	++i
    }*/

	var textureLoader = new THREE.TextureLoader()
		textureLoader.load( MESH_PARTICLE, function(texture)
		{
			var sp_sphere_2_particles_point_geom = new THREE.Geometry()

			for (var i = 0; i < sp_sphere_2_wire_vertices.length; ++i) {
				sp_sphere_2_particles_point_geom.vertices.push( sp_sphere_2_geom.vertices[i] )

				var xPos = sp_sphere_2_particles_point_geom.vertices[i].x
				var yPos = sp_sphere_2_particles_point_geom.vertices[i].y
				var zPos = sp_sphere_2_particles_point_geom.vertices[i].z

				sp_sphere_2_particles_point_geom.vertices[i].setX( xPos )
				sp_sphere_2_particles_point_geom.vertices[i].setY( yPos )
				sp_sphere_2_particles_point_geom.vertices[i].setZ( zPos )
			}

			var sp_sphere_2_wire_point_mat = new THREE.PointsMaterial({ size:2.5, sizeAttenuation:false, map:texture, transparent:true, opacity: 1 })

			sp_sphere_2_particles_point_geom.scale( 1.3, 1.3, 1.3 )

			sp_sphere_2_particles = new THREE.Points( sp_sphere_2_particles_point_geom, sp_sphere_2_wire_point_mat )
			sp_sphere_2_particles.sortParticles = true
			sp_sphere_2_particles.scale.set( 1.005, 1.005, 1.005 )
		})
}





function sp_initAnimate( time )
{	
	try {
		appState = (document.getElementById('threeContainer').dataset.focus === 'true') ? true : false
	} catch(err){
		appState = false
	}
	
	// windowFocused = ( appState && document.hasFocus() ) ? true : false;
	// windowFocused = (!introComplete || appState && document.hasFocus()) ? true : false
	
	requestAnimationFrame( sp_initAnimate )
	if (appState) sp_initRender( time )
	// if (windowFocused) sp_initRender( time )
}





function sp_initRender (time )
{
	// var motionRate = Date.now() * 0.00003;
	var motionRate = time * 0.00002
    var x = motionRate * 2
    var y = motionRate * 1.65
    var z = motionRate

    try {
		sp_sphere_1_solid.rotation.set( x, y, z )
		sp_sphere_1_wire.rotation.set( x, y, z )
		sp_sphere_1_solid.geometry.verticesNeedUpdate = true
		sp_sphere_1_solid.geometry.elementsNeedUpdate = true
		sp_sphere_1_solid.geometry.colorsNeedUpdate = true
	} catch(err){/**/}
		
	try {
		sp_sphere_2_wire.rotation.set( y, z, x )
		sp_sphere_2_particles.rotation.set( y, z, x )
		// meshSphere_2_Wire.verticesNeedUpdate = true;
		// meshSphere_2_Wire.colorsNeedUpdate = true;
    } catch(err){/**/}

	sp_renderer.clear()
    sp_renderer.render( sp_scene, sp_camera )
}





function sp_InitTwitch()
{
	var i = 0

	if(document.hasFocus())
		loop()
	
    function loop()
    {
		TweenMax.fromTo(sp_sphere_1_solid_faces[i].color, 0.75, {r: 5, g: 5, b: 5},{r: 1, g:1, b: 1})  
           
        var temp = sp_sphere_1_solid_faces[i]

        var tempA = sp_sphere_1_solid_vertices[temp.a]
        var tempB = sp_sphere_1_solid_vertices[temp.b]
        var tempC = sp_sphere_1_solid_vertices[temp.c]
        
        let tweenA = TweenMax.to( tempA, 0.5, { y : tempA.y + THREE.Math.randFloat( -1, 1 ), ease: Power4.easeOut } )
        let tweenB = TweenMax.to( tempB, 0.5, { y : tempB.y + THREE.Math.randFloat( -1, 1 ), ease: Power4.easeOut } )
        let tweenC = TweenMax.to( tempC, 0.5, { y : tempC.y + THREE.Math.randFloat( -1, 1 ), ease: Power4.easeOut } )

        tweenA = TweenMax.to( tempA, 0.5, { y : tempA.originalY, delay: 0.5, ease: Power4.easeOut } )
        tweenB = TweenMax.to( tempB, 0.5, { y : tempB.originalY, delay: 0.5, ease: Power4.easeOut } )
        tweenC = TweenMax.to( tempC, 0.5, { y : tempC.originalY, delay: 0.5, ease: Power4.easeOut } )

        if( i < sp_sphere_1_solid_faces.length-1)
        {
            i++
            setTimeout( loop, 0.0005 * i )

        }
    }
    
    setTimeout( sp_InitTwitch, 5000 ) 
}







function sp_initMouseMove( event )
{
    event.preventDefault()

    var three_Mouse = new THREE.Vector2()
    three_Mouse.x = ( event.clientX / SCREEN_WIDTH ) * 2 - 1
    three_Mouse.y = - ( event.clientY / SCREEN_HEIGHT ) * 2 + 1  

    var three_Raycaster = new THREE.Raycaster( sp_camera.position )
    three_Raycaster.setFromCamera( three_Mouse, sp_camera )

    var intersects = three_Raycaster.intersectObject( sp_sphere_1_solid )


    if ( intersects.length > 0 ) {

        sp_sphere_1_solid.geometry.colorsNeedUpdate = true
        
        var i = 0
        while( i < intersects.length ) {
            TweenMax.fromTo(sp_sphere_1_solid_faces[intersects[i].faceIndex].color, 0.75, {r: 5, g: 0, b: 20},{r: 1, g: 1, b: 1})  
               
            try {    
                TweenMax.fromTo(sp_sphere_1_solid_faces[intersects[i].faceIndex+1].color, 0.75, {r: 5, g: 5, b: 10},{r: 1, g: 1, b: 1})   
            } catch(error) { /* */}

            try {    
                TweenMax.fromTo(sp_sphere_1_solid_faces[intersects[i].faceIndex+2].color, 0.75, {r : 2,g :2, b : 2},{r : 1,g :1, b : 1})          
            } catch(error){}

            /*try {    
                TweenMax.fromTo(sp_sphere_1_solid_faces[intersects[i].faceIndex-1].color, 0.75, {r : 4,g :4, b : 4},{r : 1,g :1, b : 1})   
            } catch(error){}*/

            /*try {    
                TweenMax.fromTo(sp_sphere_1_solid_faces[intersects[i].faceIndex-2].color, 0.75, {r : 2,g :2, b : 2},{r : 1,g :1, b : 1})          
            } catch(error){}*/


            if (intersects[i].distance > 30) {
                let temp = sp_sphere_1_solid_faces[intersects[i].faceIndex]

                let tempA = sp_sphere_1_solid_vertices[temp.a]
                let tempB = sp_sphere_1_solid_vertices[temp.b]
                let tempC = sp_sphere_1_solid_vertices[temp.c]
                

                let t1 = TweenMax.to( tempA, 0.3, { y : tempA.y + THREE.Math.randFloat( 0.1, 0.3 ), ease: Expo.easeOut } )
                let t2 = TweenMax.to( tempB, 0.3, { y : tempB.y + THREE.Math.randFloat( 0.1, 0.3 ), ease: Expo.easeOut } )
                let t3 = TweenMax.to( tempC, 0.3, { y : tempC.y + THREE.Math.randFloat( 0.1, 0.3 ), ease: Expo.easeOut } )

                t1 = TweenMax.to( tempA, 0.5, { y : tempA.originalY, delay: 0.5, ease: Expo.easeOut } )
                t2 = TweenMax.to( tempB, 0.55, { y : tempB.originalY, delay: 0.5, ease: Expo.easeOut } )
                t3 = TweenMax.to( tempC, 0.55, { y : tempC.originalY, delay: 0.5, ease: Expo.easeOut } )

            }
           
            i++
        }      

    }
   
    three_Mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    three_Mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
}






function sp_initMediaQueries() {
	// _screenWidth = window.innerWidth;

	var mqls = [
		window.matchMedia( 'screen and (min-width: 768px) and (max-width: 768px)' ),  // ipad-portrait
		window.matchMedia( 'screen and (max-width: 379px)' ),                         // xxs
		window.matchMedia( 'screen and (min-width: 380px) and (max-width: 579px)' ),  // xs
		window.matchMedia( 'screen and (min-width: 580px) and (max-width: 767px)' ),  // sm
		window.matchMedia( 'screen and (min-width: 768px) and (max-width: 990px)' ),  // md
		window.matchMedia( 'screen and (min-width: 991px) and (max-width: 1199px)' ), // lg
		window.matchMedia( 'screen and (min-width: 1200px)' )                         // xl
	]

	for (var i = 0; i < mqls.length; ++i) {
		mediaqueryresponse(mqls[i])
	}


	function mediaqueryresponse(mql) {		
		if (mqls[0].matches) {
			_screenSize = 'ipad-portrait'
		}
		else if (mqls[1].matches) {
			_screenSize = 'xxs'
			camera_zPos = 60
		}
		else if (mqls[2].matches) {  
			_screenSize = 'xs'
			camera_zPos = 60
		}
		else if (mqls[3].matches) {
			_screenSize = 'sm'
			camera_zPos = 60
		}
		else if (mqls[4].matches) { 
			_screenSize = 'md'
			camera_zPos = 70
		}
		else if (mqls[5].matches) { 
			_screenSize = 'lg'
			camera_zPos = 70
		}
		else if (mqls[6].matches) { 
			_screenSize = 'xl'
			camera_zPos = 70
		}
		else{
			// console.error( "WINDOW RESIZE | Media Queries | No size found")
		}

	}

}



/*********************************/
/*********************************/
// Easing Functions
/*********************************/
/*********************************/
function easeOutQuad(t) {
	return t * (2-t)
}







export default sp_rendererDom;