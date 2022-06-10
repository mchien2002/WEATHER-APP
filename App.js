import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Truy cập vị trí hiện tại của người dùng
import * as Location from 'expo-location'

// Giới thiệu về useState: https://viblo.asia/p/reactjs-usestate-trong-react-hooks-yMnKMbzQZ7P
import React, { useEffect, useState }   from 'react'
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import { colors } from './utils';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetail from './components/WeatherDetail';
import {WEAHTER_API_KEY} from '@env'


const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'


export default function App() {

  // EXPO LOCATION
  const [errorMessage, setErrorMessage] = useState(null) 
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  // LOAD SCREEN
  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null) 
    try{
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return
      }

      // Tọa độ của người dùng
      const location = await Location.getCurrentPositionAsync()
      const {latitude, longitude} = location.coords

      // CALL API
      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEAHTER_API_KEY}`
      
      const response = await fetch(weatherURL)
      
      const result = await response.json()

      if (response.ok){
        setCurrentWeather(result)
      }
      else{
        setErrorMessage(result.message)
      }
    }

    catch(error){
      setErrorMessage(error.message)
    }
  }

  if (currentWeather){
    
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem = {unitsSystem} setUnitsSystem = {setUnitsSystem} />
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetail currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    );
  }
  else if (errorMessage){
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text >{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar style="auto" />
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
});
