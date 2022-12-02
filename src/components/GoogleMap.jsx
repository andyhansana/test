import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";
import { usePosition } from "use-position";

const containerStyle = {
    width: '800px',
    height: '600px'
  };
  
  const center = {
    lat: 41.8781, lng: -87.6298
  };
  
  function GoogleMapComp() {
    const [oLat, setLat] = useState(center.lat);
    const [oLng, setLng] = useState(center.lng);
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

  const { latitude, longitude, error } = usePosition();

  const findCurrentPosition = () => {
    setCurrentPosition({
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    });
    setShowMarker(true);
    /* Save current position to database here */
  };

  const removeSavedParkingLocation = () => {
    setShowMarker(false);
    /* Delete saved parking in database */
  };

  /* uncomment this later, but you want to fetch the position in the database here */
  useEffect(() => {
    // if(Databse has saved position) {
    //   setCurrentPosition(whatever the db position is here)
    // } else
    if (latitude && longitude && !error) {
      // Fetch weather data here.
      setCurrentPosition({
        lat: center.lat,
        lng: center.lng,

      });
      setShowMarker(false)
    }
  }, [latitude, longitude, error]);

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        {showMarker && <MarkerF position={currentPosition} />}
      </GoogleMap>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <button
          onClick={() => {
            findCurrentPosition();
          }}
        >
          I Just Parked!
        </button>
        <button
          onClick={() => {
            removeSavedParkingLocation();
          }}
        >
          I'm No Longer Parked
        </button>
      </div>
    </>
  );
}

export default React.memo(GoogleMapComp);