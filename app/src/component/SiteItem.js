import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';

let global = require('../global');

export default class SiteItem extends Component {


    render() {
        return <View>
            <TouchableOpacity onPress={() => {
                if (this.props.onItemPress) this.props.onItemPress();
            }}>
                <View style={{alignItems: 'center', flexDirection: 'row', padding: 10}}>
                    <Image source={{uri: this.props.pic}} style={styles.siteIconStyle}/>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, color: 'black'}}>{this.props.name}</Text>
                        </View>
                        <Text>{this.props.brief}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                    }}>
                        <Text style={styles.scBtn}>订阅</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <View style={styles.siteLine}/>
        </View>
    }
}

const styles = StyleSheet.create({
    scBtn: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 12
    },
    siteIconStyle: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    siteLine: {
        width: global.screenWidth - 70,
        height: 0.5,
        backgroundColor: global.dividerColor,
        marginLeft: 60,
        marginRight: 10
    },
});