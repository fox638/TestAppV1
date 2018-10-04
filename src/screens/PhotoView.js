import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

export default class PhotoView extends Component {
  
  render() {
      const uri = this.props.navigation.getParam('uri')
    return (
      <Image source={{uri}} style={styles.backgroundImage}/>
    )
  }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    }
})
