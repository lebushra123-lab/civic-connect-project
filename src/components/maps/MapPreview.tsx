import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapPreviewProps {
	center?: [number, number];
	zoom?: number;
	height?: number;
}

const MapPreview: React.FC<MapPreviewProps> = ({ center = [31.5204, 74.3587], zoom = 13, height = 200 }) => {
	const mapProps = {
		center,
		zoom,
		style: { height: '100%', width: '100%' },
		scrollWheelZoom: false,
		attributionControl: false
	} as any;
	return (
		<div style={{ height, width: '100%', borderRadius: 12, overflow: 'hidden' }}>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			<MapContainer {...mapProps}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Marker position={center as any}>
					<Popup>Location</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default MapPreview;
