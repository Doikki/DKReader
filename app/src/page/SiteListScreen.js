import React, {Component} from 'react';
import {
    ListView,
    RefreshControl
} from 'react-native';
import HttpUtil from "../util/HttpUtil";
import SiteItem from "../component/SiteItem";
import ScManager from "../util/ScManager";

const url = 'http://reader.smartisan.com/index.php';
let global = require('../global');

export default class SiteListScreen extends Component {


    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.title,
    });

    constructor() {
        super();
        this.index = 0;
        this.data = [];
        this.count = 0;
        this.state = {
            dataSource: new ListView.DataSource({//数据源
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),

            isLoading: true
        }

    }

    componentDidMount() {
        this.initData();
    }

    initData() {
        ScManager.getScIdList(idList => {
            this.getData(idList);
        });
    }

    getData(idList) {

        let {params} = this.props.navigation.state;

        let p = '';

        switch (params.action) {
            case "site/search":
                p = {
                    r: params.action,
                    cate_id: params.id,
                    page_size: global.pageSize,
                    offset: this.index
                };
                break;
            case "myCenter/recommendList":
                p = {
                    r: params.action,
                    page_size: global.pageSize,
                    offset: this.index
                };
                break;
        }


        HttpUtil.get(url, p, (responseData) => {

            if (responseData.code !== 0) {
                this.setState({isLoading: false});
                return;
            }
            let data = responseData.data.list;
            this.count = Number(responseData.data.count);
            data.map((item) => {
                let isSc = false;
                for (let i = 0; i < idList.length; i++) {
                    if (item.id === idList[i]) {
                        isSc = true;
                        break;
                    }
                }
                item.isSc = isSc;
                this.data.push(item);
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data),
                isLoading: false
            })
        });
    }

    render() {
        return (<ListView
            style={{backgroundColor: 'white'}}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            onEndReachedThreshold={100}//触发ListView滑动到最后一个item回调的阈值
            onEndReached={this._onEndReached.bind(this)}//ListView滑动到最后一个item回调，可以用来实现下拉加载
            refreshControl={//下拉刷新
                <RefreshControl
                    refreshing={this.state.isLoading}
                    colors={[global.themeColor]}
                    onRefresh={() => {
                        this.index = 0;
                        this.data = [];
                        this.initData();
                    }}
                />}
        />)
    }

    _onEndReached() {
        if (this.state.isLoading) return;
        if (this.count === this.data.length) return;
        this.setState({
            isLoading: true
        });
        this.index++;
        this.initData();
    }

    renderRow(rowData) {
        return <SiteItem
            showMark={this.props.navigation.state.params.showMark}
            siteInfo={rowData}
            isSc={rowData.isSc}
            onItemPress={() => {
                this.props.navigation.navigate('Site', {id: rowData.id, title: rowData.name});
            }}/>
    }
}