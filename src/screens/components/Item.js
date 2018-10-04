import React, { Component } from 'react'
import { 
    Text, StyleSheet, View,
    Image,
    TouchableWithoutFeedback
    
 } from 'react-native'
import {connect} from 'react-redux'



const Item = ({item, navigation}) => {
    const {userName, smallImageLink, title, fullImageLink} = item
    const {navigate} = navigation
    return(
        <TouchableWithoutFeedback onPress={()=>navigate('Photo', { uri:fullImageLink })}>
            <View style={styles.item}>
                <View style={styles.itemImageWrapper}>
                    <Image source={{
                        uri:smallImageLink
                    }}
                    style = {styles.itemImage}
                    />
                </View>
                <View style={styles.itemDescription}>
                    <View style={styles.itemAutorWrapper}>
                        <Text style={styles.itemAutorText}>{userName}</Text>
                    </View>
                    <View style={styles.itemDescriptionWrapper}>
                        <Text style={styles.itemDescriptionText}>{title ? title:'No description' }</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        
    ) 
}

export default connect(null, {})(Item)


const styles = StyleSheet.create({
    item:{
        backgroundColor:'#ffffff',
        height: 120,
        flexDirection:"row",
        paddingVertical:10,
        marginBottom:5
    },
    itemImageWrapper:{
        flex:2,
    },
    itemImage:{
        width: null,
        height: null,
        flex:1,
        resizeMode:"contain"
    },
    itemDescription:{
        flex: 4,
        flexDirection:"column",
        paddingHorizontal: 10,
    },
    itemAutorWrapper:{
        flex:2,
    },
    itemAutorText:{
        fontWeight:"700",
        fontSize:20,
    },
    itemDescriptionWrapper:{
        flex:3,
    },
    itemDescriptionText:{
        fontWeight:"400",
        fontSize:16,
    }


    

})
