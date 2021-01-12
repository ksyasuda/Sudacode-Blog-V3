import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import { Link } from "gatsby"
import Location from "./Location/Location"
import axios from "axios"
import SEO from "../../components/seo"
import Layout from "../../components/layout"
import Button from "@material-ui/core/Button"
import Spinner from "../../components/UI/Spinner/Spinner"
import Helmet from "react-helmet"

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
  const [weather, setWeather] = useState("")
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState<AllLocationData[]>([])

  useEffect(() => {
    const url = "https://sudacode-travelapi.herokuapp.com/v2/loc"
    setLoading(true)
    axios
      .get(url)
      .then(res => {
        setAllLocationData([...res.data])
        createMarkers(res.data)
        setLoading(false)
        createLocationData(res.data)
      })
      .catch(err => {
        throw new Error(err)
      })
  }, [])

  const createLocationData = (data: AllLocationData[]) => {
    let temp = []
    let counter = 0
    for (let elt of data) {
      const { lat, lng, locName, shortName, time } = elt
      temp.push(
        <Location
          lat={lat}
          lng={lng}
          locName={locName}
          shortName={shortName}
          time={time}
          key={counter}
        />
      )
    }
    setLocations(temp)
  }

  const getWeather = (lat: number, lng: number) => {
    const url = `https://sudacode-travelapi.herokuapp.com/weather/${lat},${lng}`
    axios
      .get(url)
      .then(res => {
        const temp = res.data.current.feels_like
        const desc = res.data.current.weather[0].description
        const message = `The temperature is currently ${temp} degrees with ${desc}`
        setWeather(message)
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  const createMarkers = (data: AllLocationData[]) => {
    let tMarkers: JSX.Element[] = []
    let counter = 0
    for (let item of data) {
      tMarkers.push(
        <Marker position={[item.lat, item.lng]} key={counter++}></Marker>
      )
    }
    setMarkers(tMarkers)
  }

  return (
    <Layout showBackground>
      <SEO
        description="All the locations that I have traveled to around the world."
        title="All Locations"
      />
      <Helmet>
        <style>{"body { background-color: #282c34 }"}</style>
      </Helmet>
      <h2>All Locations</h2>
      <Button id="to-travel-button" variant="text" color="secondary">
        <Link to="/travel/" id="to-travel-link">
          To Travel
        </Link>
      </Button>
      <Spinner
        open={loading}
        onClose={() => setLoading(false)}
        label="spinner"
        describe="spinner"
      />
      <section className="all-location-container">
        <MapContainer
          id="allLocation-map"
          worldCopyJump={true}
          center={[mapData.lat, mapData.lng]}
          zoom={zoom}
          scrollWheelZoom
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
      </section>
      <section id="locations-container">{locations}</section>
    </Layout>
  )
}

export default allLocations
