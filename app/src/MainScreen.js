import {TabNavigator} from 'react-navigation';
import DvScreen from "./discovery/DvScreen";
import ScScreen from "./subscribe/ScScreen";
import UsrScreen from "./user/UsrScreen";
import HomeScreen from "./home/HomeScreen";
import {
    StyleSheet,
    Image
} from 'react-native';
import React, {Component} from 'react';

let home_n = require('../img/home_n.png');
let home_s = require('../img/home_s.png');
let dv_n = require('../img/discovery_n.png');
let dv_s = require('../img/discovery_s.png');
let sc_n = require('../img/subscribe_n.png');
let sc_s = require('../img/subscribe_s.png');
let usr_n = require('../img/user_n.png');
let usr_s = require('../img/user_s.png');


const MainTab = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? home_s : home_n}
                    style={styles.tabImg}/>
            ),
            title: "滴水阅读"
        }
    },
    Dv: {
        screen: DvScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? dv_s : dv_n}
                    style={styles.tabImg}/>
            ),
            title: "发现"
        }
    },
    Sc: {
        screen: ScScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? sc_s : sc_n}
                    style={styles.tabImg}
                    resizeMode='contain'/>
            ),
            title: "订阅"
        }
    },
    Usr: {
        screen: UsrScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? usr_s : usr_n}
                    style={styles.tabImg}/>
            ),
            title: "我的"
        }
    },
}, {
    swipeEnabled: false,//不能滑动切换
    animationEnabled: false,//不要切换动画
    lazy: true,
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            marginBottom: -2,
            backgroundColor: '#FCFCFC',
        },
        tabStyle: {}
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
});