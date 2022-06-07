import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../utils'
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherDetail({currentWeather, unitsSystem}) {
    const {
        main: {feels_like, humidity, pressure},
        wind: {speed}
    } = currentWeather

    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/s`
  return (
    <View style={styles.weatherDetail}>
        <View style={styles.weatherDetailRow}>
            <View style={{...styles.weatherDetailBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                <View style={styles.weatherDetailRow}>
                    <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />            
                    <View style={styles.weatherDetailItems}>
                        <Text>Nhiệt độ: </Text>
                        <Text style={styles.textSeconday}>{feels_like} °</Text>
                    </View>
                </View>
            </View>            
            <View style={{...styles.weatherDetailBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                <View style={styles.weatherDetailRow}>
                    <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />            
                    <View style={styles.weatherDetailItems}>
                        <Text>Độ ẩm: </Text>
                        <Text style={styles.textSeconday}>{humidity} %</Text>
                    </View>
                </View>
            </View> 
        </View>
        <View style={{...styles.weatherDetailRow, borderTopWidth: 1, borderColor: BORDER_COLOR}}>
            <View style={{...styles.weatherDetailBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                <View style={styles.weatherDetailRow}>
                <MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOR} />            
                    <View style={styles.weatherDetailItems}>
                        <Text>Tốc độ gió: </Text>
                        <Text style={styles.textSeconday}>{windSpeed}</Text>
                    </View>
                </View>
            </View>            
            <View style={{...styles.weatherDetailBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
                <View style={styles.weatherDetailRow}>
                    <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />            
                    <View style={styles.weatherDetailItems}>
                        <Text>Áp suất: </Text>
                        <Text style={styles.textSeconday}>{pressure} hPa</Text>
                    </View>
                </View>
            </View> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    weatherDetail: {
        marginTop: 'auto',
        borderWidth: 1,
        margin: 15,
        borderRadius: 10,
        borderColor: BORDER_COLOR,
    },
    weatherDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }, 
    weatherDetailBox: {
        flex: 1,
        padding: 20,
    }, 
    weatherDetailItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    textSeconday: {
        fontSize: 15,
        fontWeight: '700',
        color: SECONDARY_COLOR,
        marginTop: 7,
      }
})