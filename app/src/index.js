import {StackNavigator} from 'react-navigation';
import HomeScreen from "./page/HomeScreen";

import React from 'react';
import MainTab from "./page/MainScreen";
import ScScreen from "./page/ScScreen";
import DvScreen from "./page/DvScreen";
import UsrScreen from "./page/UsrScreen";
import WebScreen from "./page/WebScreen";
import TestScreen from "./page/TestScreen";
import SiteScreen from "./page/SiteScreen";
import SiteListScreen from "./page/SiteListScreen";
import MyScListScreen from "./page/MyScListScreen";
import MyFavListScreen from "./page/MyFavListScreen";
import AboutScreen from "./page/AboutScreen";


const Nav = StackNavigator({
    Main: {screen: MainTab},
    Home: {screen: HomeScreen},
    Web: {screen: WebScreen},
    Sc: {screen: ScScreen},
    Dv: {screen: DvScreen},
    Usr: {screen: UsrScreen},
    Test: {screen: TestScreen},
    Site: {screen: SiteScreen},
    SiteList: {screen: SiteListScreen},
    MySc: {screen: MyScListScreen},
    MyFav: {screen: MyFavListScreen},
    About: {screen: AboutScreen}
});

export default Nav;

