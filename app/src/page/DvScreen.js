import React, {Component} from 'react';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CommonNewsList from "../component/CommonNewsList";
import LoadingView from "../component/LoadingView";

let global = require('../global');

export default class DvScreen extends Component {

    constructor() {
        super();
        this.cat = [];
        this.state = {
            isLoading: true,
        }
    }

    render() {
        let tab = this.cat.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor='white'
                tabBarActiveTextColor={global.themeColor}
                tabBarInactiveTextColor={global.inactiveColor}
                tabBarUnderlineStyle={{backgroundColor: global.themeColor}}
                renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}
                                                      underlineHeight={2}/>}>
                {this.cat.map((item) => {
                    return <CommonNewsList key={item.id} {...this.props} catId={item.id}
                                           tabLabel={item.name} action={"find/GetArticleList"}/>
                })}

            </ScrollableTabView> : null;
        if (this.state.isLoading) {
            return <LoadingView/>;
        } else {
            return tab;
        }

    }

    componentDidMount() {
        this.getCat();
    }

    getCat() {
        return fetch(`http://reader.smartisan.com/index.php?r=find/getInterestList`)
            .then((response) => response.json())
            .then((responseData) => {
                this.cat = responseData.data;
                this.cat.unshift({
                    id: 999,
                    name: '精选'
                });
                this.setState({
                    isLoading: false,
                })
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    }
}