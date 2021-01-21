import React from "react"

import "./Location.css"

interface LocationData {
  lat: number
  lng: number
  locName: string
  shortName?: string
  time: number
  key: number
}

const location: React.FC<LocationData> = ({
  lat,
  lng,
  locName,
  shortName,
  time,
  key,
}) => {
  const latitude = lat ? lat.toFixed(2) : "ERROR: latitude undefined"
  const longitude = lng ? lng.toFixed(2) : "ERROR: longitude undefined"
  return (
    <section key={key} className="location-item">
      <h2 className="location-title">{locName}</h2>
      <p className="date">{new Date(time).toLocaleString("en-US")}</p>
      <p className="latitude">Latitude: {latitude}</p>
      <p className="longitude">Longitude: {longitude}</p>
    </section>
  )
}

export default location
