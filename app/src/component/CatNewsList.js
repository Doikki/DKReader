import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    RefreshControl,
    Dimensions,
    Image,
    View,
    Button
} from 'react-native';
import NewsItem from "./NewsItem";
import HttpUtil from "../util/HttpUtil";

let global = require('../global');

export default class CatNewsList extends Component {

    constructor() {
        super();
        this.list = [];
        this.index = 1;
        this.state = {
            dataSource: new ListView.DataSource({//数据源
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoading: true,
            isError: false,
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
        return <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderData.bind(this)} // 渲染listView的每一个item，必须实现
            onEndReachedThreshold={100}//触发ListView滑动到最后一个item回调的阈值
            onEndReached={this._onEndReached.bind(this)}//ListView滑动到最后一个item回调，可以用来实现下拉加载
            style={styles.listView}
            refreshControl={//下拉刷新
                <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.onRefresh()}
                />}
        />
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
        this.getNewsList();
    }

    onRefresh() {
        this.index = 1;
        this.list = [];
        this.getNewsList();
    }

    renderError() {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, padding: 10}}>Something Happened...</Text>
            <Button title="retry" onPress={() => {
                this.setState({isLoading: true, isError: false});
                this.getNewsList();
            }}/>
        </View>
    }

    componentDidMount() {
        this.list = [];
        this.getNewsList();
    }

    getNewsList() {
        let params = {r: 'find/GetArticleList', cate_id: this.props.catid, page_size: 20};
        HttpUtil.get('http://reader.smartisan.com/index.php', params, (responseData) => {
            if (responseData.code !== 0) {
                this.setState({isLoading:false, isError: true});
                return;
            }
            let data = responseData.data.list;
            data.map((item) => {
                this.list.push(item);
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.list),
                isLoading: false,
            });
        });
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: global.listViewBackgroundColor,
    },
});