import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    RefreshControl,
} from 'react-native';
import NewsItem from "./NewsItem";

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
        console.log("滑到底部了~");
        // ToastAndroid.show("滑到底部了~", ToastAndroid.SHORT);
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
        return (<Text>ERROR</Text>)
    }

    componentDidMount() {
        this.getHomeData();
    }

    getHomeData() {
        console.log("loading...");
        return fetch(`http://reader.smartisan.com/index.php?r=line/show&offset=${this.index}&page_size=20`)
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.data.list;
                data.map((item) => {
                    this.list.push(item);
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.list),
                    isLoading: false
                });
            })
            .catch((error) => {
                this.setState({
                    isError: true
                });
                this.index--;
                console.error(error);
            })
            .done();
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: '#F5FCFF',
    },
});