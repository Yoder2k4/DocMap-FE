import React from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import MarkerIcon from './MarkerIcon';

const apiKey = 'fb1725b059fd44308deefe5ba3854e50';

function MapContainer({ markerIndex, locInfo, viewPort, onviewPortChange, focusOnMarker }) {
	const mapStyleUrl = `https://maps.geoapify.com/v1/styles/dark-matter-dark-grey/style.json?apiKey=${apiKey}`;
	return (
		<Map
			{...viewPort}
			style={{ width: '100%', height: '100%' }}
			mapStyle={mapStyleUrl}
			onMove={(e) => onviewPortChange(e.viewState)}
		>
			{locInfo.length > 0 &&
				locInfo.map((loc, index) => (
					<Marker
						key={index}
						longitude={loc.lon}
						latitude={loc.lat}
						onClick={() => focusOnMarker(index)}
					>
						<MarkerIcon
							color={markerIndex === index ? 'yellow' : 'red'}
							size={markerIndex === index ? '4x' : '2x'}
						/>
					</Marker>
				))}
		</Map>
	);
}

export default MapContainer;
