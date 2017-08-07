import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    WebView
} from 'react-native';

export default class WebScreen extends Component {

    render() {
        return (<WebView source={{uri: this.props.navigation.state.params.url}}/>)
    }
}