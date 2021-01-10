import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, useMap, Map } from "react-leaflet"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { navigate } from "gatsby"
import LeafletMap from "../components/LeafletMap/LeafLetMap"

import "./travel.css"

interface MapData {
  lat: number
  lng: number
  locName: string
  shortName: string
  place_id: string
  opacity: number
  counter: number
}

const travel: React.FC = () => {
  const [mapData, setMapdata] = useState<MapData>({
    lat: 37,
    lng: -100,
    locName: null,
    shortName: null,
    place_id: null,
    opacity: 1,
    counter: 0,
  })
  const [zoom, setZoom] = useState(3)
  const [markers, setMarkers] = useState<JSX.Element[]>([])
  const [markerCount, setMarkerCount] = useState(0)
  const [theMap, setTheMap] = useState<Map>(null)

  const setMarker = (lat: number, lng: number) => {
    const newMarker = <Marker position={[lat, lng]} key={markerCount} />
    setMarkerCount(prev => prev + 1)
    setMarkers(prev => [...prev, newMarker])
    theMap.setView([lat, lng], 14)
  }

  const moveMarker = () => {
    const newMarker = (
      <Marker position={[mapData.lat, mapData.lng]} key={markerCount} />
    )
    setMarkerCount(prev => prev + 1)
    setMarkers(prev => {
      let temp = [...prev]
      prev.pop()
      prev.push(newMarker)
      return temp
    })
  }

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const lat = +position.coords.latitude.toFixed(2)
          const lng = +position.coords.longitude.toFixed(2)
          document.getElementById("lat").innerText =
            "Latitude: " + lat.toString()
          document.getElementById("lng").innerText =
            "Longitude: " + lng.toString()
          const url = "https://sudacode-travelapi.herokuapp.com/"
          const geocodingUrl = url + `geocode-location/${lat},${lng}`
          const response = await axios.get(geocodingUrl)
          let address
          if (response.data.results.length === 0) {
            address = response.data.plus_code.compound_code
          } else {
            address = response.data.results[0].formatted_address
          }
          const temp = address.split(",")
          let shortName
          if (temp.length === 4) {
            shortName = temp[1]
          } else if (temp.length < 4) {
            shortName = temp[0]
          }
          const id =
            response.data.results[0].place_id ||
            response.data.plus_code.global_code
          setMapdata(prev => ({
            lat: lat,
            lng: lng,
            locName: address,
            place_id: id,
            shortName: shortName,
            opacity: 1,
            counter: prev.counter,
          }))
          if (markers.length < 1) setMarker(lat, lng)
          else moveMarker()
        }
      )
    } else {
      alert("geolocation not available")
    }
  }

  const handleSearch = async () => {
    const data = document.getElementById("searchbox")
    const temp = data.innerText.split(" ")
    let address = temp[0]
    for (let i = 1; i < temp.length; ++i) {
      address += "+" + temp[i]
    }
    const url = "https://sudacode-travelapi.herokuapp.com/"
    const addr = url + `geocode-address/${address}`
    const response = await axios.get(addr)
    let lat, lng, name, place_id, shortName
    if (response.data) {
      lat = response.data.results[0].geometry.location.lat
      lng = response.data.results[0].geometry.location.lng
      name = response.data.results[0].formatted_address
      place_id = response.data.results[0].place_id
      const tempName: string[] = name.split(",")
      if (tempName.length === 4) {
        shortName = tempName[1]
      } else if (tempName.length < 4) {
        shortName = temp[0]
      }
    }
    setMapdata(prev => ({
      ...prev,
      lat: lat,
      lng: lng,
      name: name,
      place_id: place_id,
      shortName: shortName,
    }))
  }

  const handleSend = async () => {
    if (markers.length > 1) return
    const time = Date.now()
    const data = {
      locName: mapData.locName,
      shortName: mapData.shortName,
      place_id: mapData.place_id,
      lat: mapData.lat,
      lng: mapData.lng,
      time: time,
    }
    const post_url =
      "https://gatsby-websitev2.firebaseio.com/all-locations.json"
    let response
    try {
      response = await axios.post(post_url, data)
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Layout showBackground>
      <SEO
        title="Travel"
        description="A travel app created with React.js and Node.js using Express and Nedb for the backend"
      />
      <h2 style={{ color: "dodgerblue", fontFamily: "Open Sans" }}>
        Sudacode Travel Page
      </h2>
      <div className="map-container">
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
      </div>
      <div className="travel-content">
        <div className="travel-buttons">
          <Button variant="contained" color="primary" onClick={getLocation}>
            Current Location
          </Button>
          <Button variant="contained" color="primary">
            Zoom
          </Button>
        </div>
        <p className="travel-loc" id="lat">
          Latitude: {mapData.lat.toFixed(2)}
        </p>
        <p className="travel-loc" id="lng">
          Longitude: {mapData.lng.toFixed(2)}
        </p>
      </div>
    </Layout>
  )
}

export default travel
