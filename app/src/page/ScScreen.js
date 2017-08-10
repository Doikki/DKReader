import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

let global = require('../global');

export default class ScScreen extends Component {

    constructor(){
        super();
        this.state = {
            text:'',
            data:''
        }
    }


    render() {
        return (
            <Text>订阅</Text>
            )
    }

}