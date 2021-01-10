import React, { useState } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { navigate } from "gatsby"

import "./travel.module.css"

interface MapData {
  lat: number
  lng: number
  zoom: number
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
    zoom: 3,
    locName: null,
    shortName: null,
    place_id: null,
    opacity: 1,
    counter: 0,
  })
  const [markers, setMarkers] = useState<JSX.Element[]>([])
  const [markerCount, setMarkerCount] = useState(0)

  const setMarker = () => {
    const position = [mapData.lat, mapData.lng]
    const newMarker = <Marker position={position} key={markerCount} />
    setMarkerCount(prev => prev + 1)
    setMarkers(prev => [...prev, newMarker])
  }

  const moveMarker = () => {
    const pos = [mapData.lat, mapData.lng]
    const newMarker = <Marker position={pos} key={markerCount} />
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
          const lat = +position.coords.latitude.toFixed(4)
          const lng = +position.coords.longitude.toFixed(4)
          document.getElementById("lat").innerText = lat.toString()
          document.getElementById("lng").innerText = lng.toString()
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
            zoom: prev.zoom,
            locName: address,
            place_id: id,
            shortName: shortName,
            opacity: 1,
            counter: prev.counter,
          }))
          setTimeout(() => {
            if (markers.length < 1) setMarker()
            else moveMarker()
          }, 1)
        }
      )
    } else {
      alert("geolocation not available")
    }
  }

  const setLocation = (
    lat: number,
    lng: number,
    name: string,
    id: string,
    shortName: string
  ) => {
    setMapdata(prev => ({
      ...prev,
      lat: lat,
      lng: lng,
      name: name,
      id: id,
      shortName: shortName,
    }))
    if (markers.length < 1) {
      setMarker()
    } else {
      moveMarker()
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

  const handleZoom = () => {
    if (markers.length < 1) return
    setMapdata(prev => ({
      ...prev,
      zoom: 12,
    }))
  }

  return (
    <Layout showBackground={false}>
      <SEO
        title="Travel"
        description="A travel app created with React.js and Node.js using Express and Nedb for the backend"
      />
      <div>
        {typeof window !== "undefined" ? (
          <MapContainer
            center={[mapData.lat, mapData.lng]}
            zoom={mapData.zoom}
            style={{
              width: "80%",
              position: "relative",
              left: "10%",
              border: "1px solid hotpink",
              zIndex: 100,
            }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        ) : null}
      </div>
    </Layout>
  )
}

export default travel
