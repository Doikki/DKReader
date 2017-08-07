import {StackNavigator} from 'react-navigation';
import HomeScreen from "./home/HomeScreen";

import React from 'react';
import MainTab from "./MainScreen";
import ScScreen from "./subscribe/ScScreen";
import DvScreen from "./discovery/DvScreen";
import UsrScreen from "./user/UsrScreen";
import WebScreen from "./home/WebScreen";


const Nav = StackNavigator({
    Main: {screen: MainTab},
    Home: {screen: HomeScreen},
    Web: {screen: WebScreen},
    Sc: {screen: ScScreen},
    Dv: {screen: DvScreen},
    Usr: {screen: UsrScreen}
});

export default Nav;

