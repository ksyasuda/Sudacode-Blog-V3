import React from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "./LeafletMap.css"

interface MapProps {
  lat: number
  lng: number
  zoom: number
}

const LeafletMap: React.FC<MapProps> = ({ lat, lng, zoom }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{
        position: "relative",
        border: "1px solid hotpink",
        zIndex: 100,
      }}
      className="leaflet-map"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default LeafletMap
