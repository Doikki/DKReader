import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    RefreshControl,
    Button,
    View
} from 'react-native';
import NewsItem from "../component/NewsItem";
import HttpUtil from "../util/HttpUtil";

let global = require('../global');

const BASE_URL = 'http://reader.smartisan.com/index.php';

export default class HomeScreen extends Component {

    constructor() {
        super();
        this.list = [];
        this.index = 0;
        this.state = {
            dataSource: new ListView.DataSource({//数据源
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoading: true,
            isError: false
        }
    }

    render() {
        if (this.state.isError) {
            return this.renderError();
        } else {
            return this.renderListView();
        }
    }

    renderListView() {
        return (<ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderData.bind(this)} // 渲染listView的每一个item，必须实现
            onEndReachedThreshold={100}//触发ListView滑动到最后一个item回调的阈值
            onEndReached={this._onEndReached.bind(this)}//ListView滑动到最后一个item回调，可以用来实现下拉加载
            style={styles.listView}
            refreshControl={//下拉刷新
                <RefreshControl
                    refreshing={this.state.isLoading}
                    colors={[global.themeColor]}
                    onRefresh={() => this.onRefresh()}
                />}
        />)
    }

    renderData(result) {
        return (
            <NewsItem itemData={result} {...this.props}/>
        );
    }

    _onEndReached() {
        if (this.state.isLoading) return;
        this.setState({
            isLoading: true
        });
        this.index++;
        this.getHomeData();
    }

    onRefresh() {
        this.index = 0;
        this.list = [];
        this.getHomeData();
    }

    renderError() {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, padding: 10}}>Something Happened...</Text>
            <Button title="retry" onPress={() => {
                this.getHomeData();
            }}/>
        </View>
    }

    componentDidMount() {
        this.getHomeData();
    }

    getHomeData() {
        global.storage.getIdsForKey(global.scKey).then(data => {

            let params = {
                r: 'line/show',
                offset: this.index,
                page_size: global.pageSize
            };
            if (data.length > 0) {
                let ids = '1,';
                data.map(item => {
                    ids = ids + item + ',';
                });
                params = {
                    r: 'visitor/getList',
                    offset: this.index,
                    page_size: global.pageSize,
                    site_ids: ids
                };
            }

            HttpUtil.get(BASE_URL, params, (responseData) => {
                if (responseData.code !== 0) {
                    this.setState({isLoading: false, isError: true});
                    return;
                }
                let data = responseData.data.list;
                data.map((item) => {
                    this.list.push(item);
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.list),
                    isLoading: false
                });
            });
        });

    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: global.listViewBackgroundColor,
    },
});