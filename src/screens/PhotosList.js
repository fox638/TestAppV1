import React, { Component } from 'react'
import { 
    Text, StyleSheet, View,
    ScrollView,
    Image,
    Button
    
 } from 'react-native'
import { connect } from 'react-redux'
import {
    loadPhoto,
    loadingSelector,
    loadedSelector,
    photoListSelector,
    pageLoadSelector
    

} from '../ducks/photos'

import Item from './components/Item'


 
class PhotosList extends Component {

  componentWillMount(){
    const {loaded, loading, loadPhoto} = this.props
    !loading && !loaded && loadPhoto({})
  }
  renderLoadding (){
      return (
        <View style={styles.contener}>
            <Text>Loadding</Text> 
        </View>
      )
  }
  render() {
      const {photos, loadPhoto, navigation} = this.props
      let {page}  = this.props
      if(photos && photos.length == 0 ){
          return this.renderLoadding()
      } else {
        return (
            <View style={styles.contener}>
                <ScrollView>
                    {photos.map(item => <Item item={item} key={item.id} navigation={navigation}/>)}
                    
                    <View style={styles.buttonWrapper}>
                        <Button
                            title="Load more"
                            onPress={()=>{
                                page++
                                loadPhoto({page:page})
                            }   }
                            style={styles.button}
                        />
                    </View>
                    
                </ScrollView>
            </View>
        )
      }
    
  }
}



const styles = StyleSheet.create({
    contener:{
        flex:1,
    },
    buttonWrapper:{
        marginBottom:30
    }   
})

export default connect((state)=>({
    loading:loadingSelector(state),
    loaded:loadedSelector(state),
    photos:photoListSelector(state),
    page:pageLoadSelector(state)
}), {loadPhoto})(PhotosList)
