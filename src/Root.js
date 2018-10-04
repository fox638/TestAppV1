import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import PhotoList from './screens/PhotosList'
import PhotoView from './screens/PhotoView'

export default createStackNavigator({
    Home:{
        screen: PhotoList
    },
    Photo:{
        screen:PhotoView
    }
})

const styles = StyleSheet.create({})
