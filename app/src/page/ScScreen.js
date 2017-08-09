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
            <View>
                <TextInput onChangeText={(text) => {
                    this.setState({
                        text: text
                    });
                }}/>
                <Button title='保存' onPress={() => {global.storage.save({
                    key: 'data',
                    data: this.state.text
                })}}/>
                <Text>{this.state.data}</Text>
                <Button title='取出' onPress={() => {global.storage.load({
                    key: 'data'
                }).then((data) => {
                    this.setState({
                        data: data
                    })
                })}}/>
                <Button title='清除' onPress={() => {
                    global.storage.remove({key: 'data'});
                }}/>
            </View>
            )
    }

}