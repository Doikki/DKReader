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
                    this.props.navigation.navigate('Web', {url: itemData.origin_url, title: itemData.title});
                }}>
                <View style={styles.container}>
                    <Text style={styles.title} numberOfLines={2}>{itemData.title}</Text>
                    <Text numberOfLines={3} style={styles.brief}>{itemData.brief}</Text>
                    <View style={styles.image_container}>
                        {pic1}{pic2}{pic3}
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
    image_container: {
        flexDirection: 'row',
    },
    image: {
        height: 80,
        width: 80,
        margin: 3
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
    }
});