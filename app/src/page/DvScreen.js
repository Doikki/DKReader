import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CatNewsList from "../component/CatNewsList";

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
                tabBarInactiveTextColor='gray'
                tabBarActiveTextColor='black'
                tabBarBackgroundColor='white'
                tabBarUnderlineColor='red'
                ref="scrollableTabView"
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}
                                                      underlineHeight={2}/>}>
                {this.cat.map((item) => {
                    return <CatNewsList key={item.cate_info.id} {...this.props} catid={item.cate_info.id}
                                        tabLabel={item.cate_info.name}/>
                })}

            </ScrollableTabView> : null;
        if (this.state.isLoading) {
            return <View style={styles.container}>
                <Text style={styles.loading}>Loading...</Text>
                </View>;
        } else {
            return tab;
        }

    }

    componentDidMount() {
        this.getCat();
    }

    getCat() {
        return fetch(`http://reader.smartisan.com/index.php?r=find/GetCateList&cate_ids=`)
            .then((response) => response.json())
            .then((responseData) => {
                this.cat = responseData.data;
                this.cat.unshift({
                    cate_info: {
                        id: 999,
                        name: '精选'
                    }
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
const styles = StyleSheet.create({
    loading: {
        fontSize: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});