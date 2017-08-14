import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';

let global = require('../global');

export default class SiteItem extends Component {

    static defaultProps={
        showMark: true,
    };

    static propTypes={
        showMark:PropTypes.bool,
    };


    render() {
        let mark = this.props.showMark ? <Text
            style={styles.mark}>{this.props.cateName}</Text> : null;
        return <View>
            <TouchableOpacity onPress={() => {
                if (this.props.onItemPress) this.props.onItemPress();
            }}>
                <View style={{alignItems: 'center', flexDirection: 'row', padding: 10}}>
                    <Image source={{uri: this.props.pic}} style={styles.siteIconStyle}/>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: 'black'}}>{this.props.name}</Text>
                            {mark}
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
        borderColor: global.lineColor,
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
        marginRight: 10,
        borderRadius: 20
    },
    siteLine: {
        width: global.screenWidth - 70,
        height: 0.5,
        backgroundColor: global.lineColor,
        marginLeft: 60,
        marginRight: 10
    },
    mark: {
        marginLeft: 10,
        paddingLeft: 4,
        paddingRight: 4,
        fontSize: 10,
        borderRadius: 4,
        borderColor: global.lineColor,
        borderWidth: 0.5
    },
});