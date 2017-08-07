import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    Image,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
    View,
    ToastAndroid
} from 'react-native';

let list = [];
let index = 0;
let {width, height} = Dimensions.get('window');//解构赋值，获取屏幕宽高

export default class HomeScreen extends Component {

    constructor() {
        super();
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
        let pic1 = result.prepic1 === "" ? (<Image/>) : (<Image
            style={styles.image}
            source={{uri: result.prepic1}}/>);
        let pic2 = result.prepic2 === "" ? (<Image/>) : (<Image
            style={styles.image}
            source={{uri: result.prepic2}}/>);
        let pic3 = result.prepic3 === "" ? (<Image/>) : (<Image
            style={styles.image}
            source={{uri: result.prepic3}}/>);
        // const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Web', {url: result.url, title: result.title});
                    // ToastAndroid.show(result.title, ToastAndroid.SHORT);
                }}>
                <View style={styles.container}>
                    <Text style={styles.title} numberOfLines={2}>{result.title}</Text>
                    <Text numberOfLines={3} style={styles.brief}>{result.brief}</Text>
                    <View style={styles.image_container}>
                        {pic1}{pic2}{pic3}
                    </View>
                </View>
                <View style={styles.divider}/>
            </TouchableOpacity>
        );
    }

    _onEndReached() {
        console.log("滑到底部了~");
        // ToastAndroid.show("滑到底部了~", ToastAndroid.SHORT);
        if (this.state.isLoading) return;
        this.setState({
            isLoading: true
        });
        index++;
        this.getMoviesFromApiAsync();
    }

    onRefresh() {
        index = 0;
        list = [];
        this.getMoviesFromApiAsync();
    }

    renderError() {
        return (<Text style={styles.loading}>ERROR</Text>)
    }

    componentDidMount() {
        this.getMoviesFromApiAsync();
    }

    getMoviesFromApiAsync() {
        return fetch(`http://reader.smartisan.com/index.php?r=line/show&offset=${index}&page_size=10`)
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.data.list;
                data.map((item) => {
                    list.push(item);
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(list),
                    isLoading: false
                });
            })
            .catch((error) => {
                this.setState({
                    isError: true
                });
                index--;
                console.error(error);
            })
            .done();
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 10
    },
    image_container: {
        flexDirection: 'row',
    },
    image: {
        height: 80,
        width: 80,
        margin: 3
    },
    title: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
    },
    brief: {
        paddingTop: 5,
        paddingBottom: 5
    },
    listView: {
        backgroundColor: '#F5FCFF',
    },
    divider: {
        backgroundColor: '#D3D3D3',
        height: 1,
        width: width
    }

});