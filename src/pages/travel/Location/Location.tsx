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
  return (
    <section key={key} className="location-item">
      <h2 className="location-title">{locName}</h2>
      <p className="date">{new Date(time).toLocaleString("en-US")}</p>
      <p className="latitude">Latitude: {lat}</p>
      <p className="longitude">Longitude: {lng}</p>
    </section>
  )
}

export default location
