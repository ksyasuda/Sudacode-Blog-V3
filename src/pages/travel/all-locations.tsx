import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import axios from "axios"
import SEO from "../../components/seo"
import Layout from "../../components/layout"
import Button from "@material-ui/core/Button"
import Spinner from "../../components/UI/Spinner/Spinner"

import "./all-locations.css"

interface AllLocationData {
  lat: number
  lng: number
  locName: string
  place_id: string
  shortName: string
  time: number
}

const allLocations: React.FC = () => {
  const [mapData, setMapData] = useState({
    lat: 37,
    lng: -100,
  })
  const [zoom, setZoom] = useState(3)
  const [theMap, setTheMap] = useState(null)
  const [allLocationData, setAllLocationData] = useState<AllLocationData[]>([])
  const [markers, setMarkers] = useState<JSX.Element[]>([])

  useEffect(() => {
    const url = "https://sudacode-travelapi.herokuapp.com/loc"
    axios
      .get(url)
      .then(res => {
        setAllLocationData([...res.data])
        createMarkers(res.data)
      })
      .catch(err => {
        throw new Error(err)
      })
  }, [])

  const createMarkers = (data: AllLocationData[]) => {
    let tMarkers: JSX.Element[] = []
    let counter = 0
    for (let item of data) {
      tMarkers.push(<Marker position={[item.lat, item.lng]} key={counter++} />)
    }
    setMarkers(tMarkers)
  }

  return (
    <Layout showBackground>
      <SEO
        description="All the locations that I have traveled to around the world."
        title="All Locations"
      />
      <MapContainer
        className="leaflet-map"
        center={[mapData.lat, mapData.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{
          position: "relative",
          border: "1px solid hotpink",
          zIndex: 100,
        }}
        whenCreated={map => {
          setTheMap(map)
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </Layout>
  )
}

export default allLocations
