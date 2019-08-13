<template>
    <div>
        <GmapMap ref="mapRef"
            :center="{ lat: mapOptions.lat, lng: mapOptions.lng }"
            :zoom="12"
            style="width: 100%; height: 500px"
            :options="{
                styles: mapStyles,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false
            }">
            <GmapMarker
                :position="{ lat: mapOptions.lat, lng: mapOptions.lng }"
                :icon="markerOptions"
            />
        </GmapMap>
    </div>
</template>

<script>
export default {
	name: 'google-map',

	data: () => ({
		mapOptions: {
			lat: 33.7714398,
			lng: -118.1503778
		},
		markerOptions: {
			url: require('@/assets/app/images/map-marker.svg'),
			// size: {width: 60, height: 90, f: 'px', b: 'px',},
			scaledSize: { width: 60, height: 75, f: 'px', b: 'px' }
		},
		mapStyles: require('@/config/mapstyles.json')
	}),

	mounted () {

	}
}
</script>
