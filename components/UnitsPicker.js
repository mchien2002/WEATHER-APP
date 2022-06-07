import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({unitsSystem, setUnitsSystem}) {
  return (
    <View style = {styles.unitsSystem }>
        {/* Chọn đơn vị nhiệt độ */}
        <Picker 
          selectedValue={unitsSystem} 
          onValueChange={(item) => setUnitsSystem(item)} 
          mode="dropdown" 
          itemStyle={{fontSize: 12}}
        >
            <Picker.Item label = "C°" value = "metric" />
            <Picker.Item label = "F°" value = "imperial" />
        </Picker>
    </View>
  )
};

const styles = StyleSheet.create({
  unitsSystem: {
    position: 'absolute',
    height: 50, 
    width: 100,
    left: 20,
    ...Platform.select({
        ios: {
          top: -30,
        },
        android: {
          top: 30,
        }
    })
  }
});
