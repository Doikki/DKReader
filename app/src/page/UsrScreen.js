import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity
} from 'react-native';

let global = require('../global');

export default class UsrScreen extends Component {


    render() {
        return (<ScrollView style={{backgroundColor: 'white'}}>
            <View>


                <TouchableOpacity style={styles.item} onPress={() => {
                    this.props.navigation.navigate('MySc', {title: "我的订阅"});
                }}>
                    <Text style={styles.text}>订阅列表</Text>

                </TouchableOpacity>

                <View style={styles.line}/>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.text}>我的收藏</Text>

                </TouchableOpacity>

                <View style={styles.line}/>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.text}>文章字号</Text>

                </TouchableOpacity>

                <View style={styles.line}/>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.text}>分享</Text>

                </TouchableOpacity>

                <View style={styles.line}/>
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.text}>清除缓存</Text>

                </TouchableOpacity>

                <View style={styles.line}/>

                <TouchableOpacity style={styles.item} onLongPress={() => {
                    this.props.navigation.navigate('Test');
                }}>
                    <Text style={styles.text}>关于</Text>

                </TouchableOpacity>
            </View>

        </ScrollView>)
    }
}

const styles = StyleSheet.create({
    text: {
        alignItems: 'center',
        fontSize: 16,
        color: 'black',
        paddingLeft: 10,

    },
    line: {
        width: global.screenWidth,
        height: 0.5,
        backgroundColor: global.lineColor
    },
    item: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    }
});