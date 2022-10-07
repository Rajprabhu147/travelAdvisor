import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ sw: 0, ne: 0});


  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // const [currentWeatherData, setCurrentWeatherData] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if(bounds.sw && bounds.ne) {
      setIsLoading(true);


      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setIsLoading(false);
        })
    }
  }, [type, coordinates, bounds]);

  // const onLoad = (autoC) => setAutocomplete(autoC);

  // const onPlaceChanged = () => {
  //     const lat = autocomplete.getPlace().geometry.location.lat();
  //     const lng = autocomplete.getPlace().geometry.location.lng();

  //     setCoordinates({lat, lng});
  // }

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading} 
            childClicked={childClicked}
            places={filteredPlaces.length ? filteredPlaces : places} 
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}

          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alingItems: 'center' }}>
          <Map 
            setCoordinates={setCoordinates} 
            setBounds={setBounds} 
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            // currentWeatherData={currentWeatherData}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App;