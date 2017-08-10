import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions
} from 'react-native';

let global = require('../global');

export default class NewsItem extends Component {

    render() {
        let {itemData} = this.props;
        let pic1 = itemData.prepic1 === "" ? null : <Image
            style={styles.image}
            source={{uri: itemData.prepic1}}/>;
        let pic2 = itemData.prepic2 === "" ? null : <Image
            style={styles.image}
            source={{uri: itemData.prepic2}}/>;
        let pic3 = itemData.prepic3 === "" ? null : <Image
            style={styles.image}
            source={{uri: itemData.prepic3}}/>;
        // const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Web', {url: itemData.origin_url, title: itemData.title, siteImg: itemData.site_info.pic, siteName: itemData.site_info.name, siteInfo: itemData.site_info});
                }}>
                <View style={styles.container}>
                    <Text style={styles.title} numberOfLines={2}>{itemData.title}</Text>
                    <Text numberOfLines={2} style={styles.brief}>{itemData.brief}</Text>
                    <View style={styles.imageContainer}>
                        {pic1}{pic2}{pic3}
                    </View>
                    <View style={styles.siteContainer}>
                        <Image style={styles.siteImg} source={{uri: itemData.site_info.pic}}/>
                        <Text>{itemData.site_info.name}</Text>
                    </View>
                </View>
                <View style={styles.divider}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 10
    },
    imageContainer: {
        flexDirection: 'row',
    },
    image: {
        height: 80,
        width: 80,
        marginRight: 6,
        marginTop: 3,
        marginBottom:3
    },
    title: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
    },
    brief: {
        paddingTop: 5,
        paddingBottom: 5
    },
    divider: {
        backgroundColor: global.dividerColor,
        height: 1,
        width: global.screenWidth
    },
    siteImg: {
        width: 18,
        height: 18,
        marginRight: 6
    },
    siteContainer: {
        marginTop: 4,
        flexDirection: 'row'
    }
});