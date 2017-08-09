import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    WebView
} from 'react-native';

export default class WebScreen extends Component {

    // static navigationOptions = () => ({
    //     gesturesEnabled: true,
    // });


    render() {
        return (<WebView
            startInLoadingState={true}
            source={{uri: this.props.navigation.state.params.url}}/>)
    }
}