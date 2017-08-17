import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Share,
    Image
} from 'react-native';

let global = require('../global');

export default class UsrScreen extends Component {


    render() {
        return (<ScrollView style={{backgroundColor: 'white'}}>
            <View>

                <TouchableOpacity style={styles.item} onPress={() => {
                    this.props.navigation.navigate('MySc', {title: "我的订阅"});
                }}>
                    <Image style={{width: 20, height: 20, tintColor: global.themeColor}}
                           source={require('../../img/tab_subscribe.png')}/>
                    <Text style={styles.text}>我的订阅</Text>

                </TouchableOpacity>

                <View style={styles.line}/>
                <TouchableOpacity style={styles.item} onPress={() => {
                    this.props.navigation.navigate('MyFav', {title: "我的收藏"});
                }}>
                    <Image style={{width: 20, height: 20, tintColor: global.themeColor}}
                           source={require('../../img/ic_action_favorite_s.png')}/>
                    <Text style={styles.text}>我的收藏</Text>

                </TouchableOpacity>

                {/*<View style={styles.line}/>*/}
                {/*<TouchableOpacity style={styles.item}>*/}
                {/*<Text style={styles.text}>文章字号</Text>*/}

                {/*</TouchableOpacity>*/}

                <View style={styles.line}/>
                <TouchableOpacity style={styles.item} onPress={() => {
                    Share.share({
                        message: '发现了一款非常美观的App「水滴阅读」，上千个频道任意读，完全开源不收费，太赞了! 推荐~：https://fir.im/8vdc',
                        title: '分享此应用'
                    }, {
                        dialogTitle: '分享此应用',
                    }).then()
                }}>
                    <Image style={{width: 20, height: 20, tintColor: global.themeColor}}
                           source={require('../../img/ic_action_share.png')}/>
                    <Text style={styles.text}>分享此应用</Text>

                </TouchableOpacity>

                {/*<View style={styles.line}/>*/}
                {/*<TouchableOpacity style={styles.item}>*/}
                {/*<Text style={styles.text}>清除缓存</Text>*/}

                {/*</TouchableOpacity>*/}

                <View style={styles.line}/>

                <TouchableOpacity
                    style={styles.item}
                    onLongPress={() => {
                        this.props.navigation.navigate('Test');
                    }}
                    onPress={() => {
                        this.props.navigation.navigate('About');
                    }}>
                    <Image style={{width: 20, height: 20, tintColor: global.themeColor}}
                           source={require('../../img/ic_action_info.png')}/>
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
        alignItems: 'center',
        paddingLeft: 10
    }
});