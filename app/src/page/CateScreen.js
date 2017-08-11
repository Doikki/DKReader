import React, {Component} from 'react';
import {
    ListView,
    RefreshControl
} from 'react-native';
import HttpUtil from "../util/HttpUtil";
import SiteItem from "../component/SiteItem";

const url = 'http://reader.smartisan.com/index.php';
let global = require('../global');


export default class CateScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.title,
    });

    constructor() {
        super();
        this.index = 0;
        this.data = [];
        this.state = {
            dataSource: new ListView.DataSource({//数据源
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),

            isLoading: true
        }

    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let params = {r: "site/search", cate_id: this.props.navigation.state.params.id, page_size: global.pageSize, offset: this.index};
        HttpUtil.get(url, params, (responseData) => {

            if (responseData.code !== 0) {
                this.setState({isLoading: false});
                return;
            }
            let data = responseData.data.list;
            data.map((item) => {
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
                    onRefresh={() => {
                        this.index = 0;
                        this.data = [];
                        this.getData();
                    }}
                />}
        />)
    }

    _onEndReached() {
        if (this.state.isLoading) return;
        if (this.data.length % global.pageSize !== 0) return;
        this.setState({
            isLoading: true
        });
        this.index++;
        this.getData();
    }

    renderRow(rowData) {
        return <SiteItem pic={rowData.pic} name={rowData.name} brief={rowData.brief} onItemPress={() => {
            this.props.navigation.navigate('Site', {id: rowData.id, title: rowData.name});
        }}/>
    }
}

