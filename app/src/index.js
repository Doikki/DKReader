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
import CateScreen from "./page/CateScreen";


const Nav = StackNavigator({
    Main: {screen: MainTab},
    Home: {screen: HomeScreen},
    Web: {screen: WebScreen},
    Sc: {screen: ScScreen},
    Dv: {screen: DvScreen},
    Usr: {screen: UsrScreen},
    Test: {screen: TestScreen},
    Site: {screen: SiteScreen},
    Cate: {screen: CateScreen}
});

export default Nav;

