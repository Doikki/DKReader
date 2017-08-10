import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';

let global = require('../global');

/**
 * 测试界面
 */
export default class TestScreen extends Component {

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
                <Button title='取出' onPress={() => {global.storage.getIdsForKey('sc').then((data) => {
                    let ids = '';
                    data.map(item =>{
                       ids = ids + item + ',';
                    });
                    this.setState({
                        data: ids
                    })
                })}}/>
                <Button title='清除' onPress={() => {
                    // global.storage.remove({key: 'sc'});
                    global.storage.clearMapForKey('sc');
                }}/>
            </View>
            )
    }

}