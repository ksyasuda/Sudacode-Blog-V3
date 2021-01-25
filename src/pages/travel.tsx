import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { Link } from "gatsby"
import Spinner from "../components/UI/Spinner/Spinner"
import TextField from "@material-ui/core/TextField"
import Helmet from "react-helmet"

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
  const [markers, setMarkers] = useState<JSX.Element>(null)
  const [markerCount, setMarkerCount] = useState(0)
  const [theMap, setTheMap] = useState(null)
  const [loading, setLoading] = useState(false)

  // preload the data for all locations

  const setMarker = (lat: number, lng: number) => {
    const newMarker = <Marker position={[lat, lng]} key={markerCount} />
    setMarkerCount(prev => prev + 1)
    setMarkers(newMarker)
    setZoom(14)
    theMap.flyTo([lat, lng], 14, { duration: 1.69 })
  }

  const moveMarker = (lat: number, lng: number) => {
    const newMarker = <Marker position={[lat, lng]} key={markerCount} />
    setMarkerCount(prev => prev + 1)
    setMarkers(newMarker)
    setZoom(14)
    theMap.flyTo([lat, lng], 14, { duration: 1.69 })
  }

  const clearMarkers = () => {
    setMarkers(null)
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
          //   const url =
          //     process.env.TRAVEL_API +
          //     process.env.TRAVEL_API_LOCATION +
          //     `${lat},${lng}`
          const url =
            "https://sudacode-travelapi.herokuapp.com" +
            "/geocode-location/" +
            `${lat},${lng}`
          setLoading(true)
          const response = await axios.get(url)
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
            // const url =
            //   process.env.TRAVEL_API +
            //   process.env.TRAVEL_API_SEARCH +
            //   event.target[0].value
            lat: lat,
            lng: lng,
            locName: address,
            place_id: id,
            shortName: shortName,
            opacity: 1,
            counter: prev.counter,
          }))
          if (!markers) setMarker(lat, lng)
          else moveMarker(lat, lng)
          setLoading(false)
        }
      )
    } else {
      alert("geolocation not available")
    }
  }

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = document.querySelector("form")
    const userInput = event.target[0].value
    if (userInput === undefined) {
      form.reset()
      throw new Error("User Input Not Received")
    }
    // const url =
    //   process.env.TRAVEL_API +
    //   process.env.TRAVEL_API_SEARCH +
    //   event.target[0].value
    const url =
      "https://sudacode-travelapi.herokuapp.com" +
      "/geocode-address/" +
      event.target[0].value
    let response = null
    try {
      setLoading(true)
      response = await axios.get(url)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      throw new Error(err)
    }
    let lat: number,
      lng: number,
      name: string,
      place_id: string,
      shortName: string
    if (response.data) {
      lat = response.data.results[0].geometry.location.lat
      lng = response.data.results[0].geometry.location.lng
      name = response.data.results[0].formatted_address
      place_id = response.data.results[0].place_id
      const tempName: string[] = name.split(",")
      if (tempName.length === 4) {
        shortName = tempName[1]
      } else if (tempName.length < 4) {
        shortName = tempName[0]
      }
      setMapdata(prev => ({
        ...prev,
        lat: lat,
        lng: lng,
        locName: name.trim(),
        place_id: place_id.trim(),
        shortName: shortName.trim(),
      }))
      if (!markers) setMarker(lat, lng)
      else moveMarker(lat, lng)
      document.getElementById("lat").innerText = "Latitude: " + lat.toFixed(2)
      document.getElementById("lng").innerText = "Longitude: " + lng.toFixed(2)
    }
    form.reset()
  }

  const handleSend = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    if (!markers) return
    const time = Date.now()
    const data = {
      locName: mapData.locName,
      shortName: mapData.shortName,
      place_id: mapData.place_id,
      lat: mapData.lat,
      lng: mapData.lng,
      time: time,
    }
    // const url = process.env.TRAVEL_API_DB
    const url =
      "https://sudacode-website-v3-default-rtdb.firebaseio.com/all-locations.json"
    let response
    try {
      setLoading(true)
      response = await axios.post(url, data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      throw new Error(err)
    }
  }

  const handleZoomOut = event => {
    event.preventDefault()
    setZoom(3)
    theMap.flyTo([mapData.lat, mapData.lng], 3, { duration: 1.69 })
  }

  const handleZoom = () => {
    setZoom(16)
    theMap.flyTo([mapData.lat, mapData.lng], 16, { duration: 1.69 })
  }

  return (
    <Layout showBackground>
      <SEO
        title="Travel"
        description="Travel page of my website where I can log places that I have travelled to around the world."
      />
      <Helmet>
        <style>{"body { background-color: #282c34 }"}</style>
      </Helmet>
      <h2 style={{ color: "dodgerblue", fontFamily: "Open Sans" }}>
        Sudacode Travel Page
      </h2>
      <Button
        id="all-location-button"
        style={{ top: "-10px" }}
        variant="text"
        color="secondary"
      >
        <Link id="all-location-link" to="/travel/all-locations">
          To All Locations
        </Link>
      </Button>
      <Spinner
        open={loading}
        onClose={() => function () {}}
        label="spinner"
        describe="spinner"
      />
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
      <section className="travel-content">
        <section className="travel-buttons">
          <Button
            className="travel-button"
            variant="contained"
            color="primary"
            onClick={getLocation}
          >
            Current Location
          </Button>
          <Button
            className="travel-button"
            variant="contained"
            color="primary"
            onClick={handleZoom}
          >
            Zoom In
          </Button>
          <Button
            className="travel-button"
            variant="contained"
            color="primary"
            onClick={handleZoomOut}
          >
            Zoom Out
          </Button>
          <Button
            id="send-button"
            variant="contained"
            color="primary"
            onClick={event => handleSend(event)}
            disabled
          >
            Save Current Location
          </Button>
          <form
            className="search-box"
            noValidate
            autoComplete="on"
            onSubmit={event => handleSearch(event)}
          >
            <TextField id="searchbox" label="Search location" />
            <Button
              id="travel-searchbutton"
              type="submit"
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </form>
        </section>
        <p className="travel-loc" id="lat">
          Latitude: {mapData.lat.toFixed(2)}
        </p>
        <p className="travel-loc" id="lng">
          Longitude: {mapData.lng.toFixed(2)}
        </p>
      </section>
    </Layout>
  )
}

export default travel
