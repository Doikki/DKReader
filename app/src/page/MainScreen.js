import {TabNavigator} from 'react-navigation';
import DvScreen from "./DvScreen";
import ScScreen from "./ScScreen";
import UsrScreen from "./UsrScreen";
import HomeScreen from "./HomeScreen";
import {
    StyleSheet,
    Image,
} from 'react-native';
import React from 'react';

let home = require('../../img/tab_home.png');
let dv = require('../../img/tab_discovery.png');
let sc = require('../../img/tab_subscribe.png');
let usr = require('../../img/tab_user.png');
let global = require('../global');


const MainTab = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={home}
                    style={[styles.tabImg, {tintColor: tintColor}]}/>
            ),
            title: '主页',
            headerTitle: "水滴阅读",
            headerTitleStyle: {alignSelf: 'center'},
        })
    },
    Dv: {
        screen: DvScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={dv}
                    style={[styles.tabImg, {tintColor: tintColor}]}/>
            ),
            title: '发现',
            headerTitle: "发现",
            headerTitleStyle: {alignSelf: 'center'}
        }
    },
    Sc: {
        screen: ScScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={sc}
                    style={[styles.tabImg, {tintColor: tintColor}]}/>
            ),
            title: '订阅',
            headerTitle: "订阅",
            headerTitleStyle: {alignSelf: 'center'}
        }
    },
    Usr: {
        screen: UsrScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={usr}
                    style={[styles.tabImg, {tintColor: tintColor}]}/>
            ),
            title: '我的',
            headerTitle: "我的",
            headerTitleStyle: {alignSelf: 'center'}
        }
    },
}, {
    swipeEnabled: false,//不能滑动切换
    animationEnabled: false,//不要切换动画
    lazy: true,
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        pressColor: global.lineColor,
        activeTintColor: global.themeColor,
        inactiveTintColor: global.inactiveColor,
        style: {
            height: 50,
            backgroundColor: 'white',
        },
        indicatorStyle: {
            backgroundColor: 'transparent'
        },
        labelStyle: {
            fontSize: 10,
            marginTop: 2
        },
        iconStyle: {
            marginTop: -2
        }
    },
    tabBarPosition: 'bottom',
    backBehavior: true, //直接退出,而不是回到第一个页面
});

export default MainTab;

const styles = StyleSheet.create({
    tabImg: {
        height: 24,
        width: 24,
    },
    title: {
        fontSize: 20,
        color: 'black'
    }
});