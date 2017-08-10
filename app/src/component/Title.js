import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

let global = require('../global');

export default class Title extends Component {


    render() {
        return (
            <View>
                <Image/>
                <TouchableWithoutFeedback onLongPress={() => {
                    this.props.onTitleLongPress();
                }}>
                    <View style={{width: global.screenWidth, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, color: 'black',fontWeight: '600',}}>{this.props.title}</Text>
                    </View>

                </TouchableWithoutFeedback>
            </View>
            )
    }
}