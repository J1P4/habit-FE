import axios from 'axios';
import { useState, useEffect } from 'react';


navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // 이후 단계 수행
}, (error) => {
  console.error('Error getting current position:', error);
});


const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        latlng: `${latitude},${longitude}`,
        key: 'AIzaSyCFsJnEaYAZ0r-Ln8haZIzGcP3t2McU3dc'
      }
    });

    const address = response.data.results[0].formatted_address;
    return address;
  } catch (error) {
    console.error('Error getting address from coordinates:', error);
    throw error;
  }
};



export default getAddressFromCoords;