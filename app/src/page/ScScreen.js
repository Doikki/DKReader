import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity, // 不透明触摸
    ToastAndroid,
    Dimensions,
    ScrollView,
    RefreshControl,
    TouchableWithoutFeedback
} from 'react-native';
import HttpUtil from "../util/HttpUtil";
import ViewPager from 'react-native-viewpager';
import SiteItem from "../component/SiteItem";
import LoadingView from "../component/LoadingView";

let global = require('../global');

// 一些常亮设置
const cols = 2;
const cellWH = global.screenWidth / cols;
const url = 'http://reader.smartisan.com/index.php?r=myCenter/show&site_ids=1,1780,600,1843';

export default class ScScreen extends Component {

    constructor() {
        super();
        // 创建数据源
        let dsSite = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dsCate = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dsBanner = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSourceCate: dsCate,
            dataSourceSite: dsSite,
            dataSourceBanner: dsBanner,
            isLoading: true
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        HttpUtil.get(url, '', (responseData) => {

            let site = responseData.data.site;
            let cate = responseData.data.cate;
            let banner = responseData.data.banner;

            this.setState({
                dataSourceCate: this.state.dataSourceCate.cloneWithRows(cate),
                dataSourceSite: this.state.dataSourceSite.cloneWithRows(site),
                dataSourceBanner: this.state.dataSourceBanner.cloneWithPages(banner),
                isLoading: false
            });

        });
    }

    render() {
        return this.state.isLoading ? <LoadingView/> : <ScrollView
            style={{backgroundColor: 'white'}}
            refreshControl={//下拉刷新
                <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={() => {this.getData()}}
                />}>
            <View>
                <View style={{margin: 10}}>
                    <ViewPager
                        renderPage={this.renderBanner.bind(this)}
                        dataSource={this.state.dataSourceBanner}
                        isLoop={true}
                        autoPlay={true}/>
                </View>
                <View style={styles.line}/>
                <Text style={styles.title}>编辑推荐站点</Text>
                <View style={styles.line}/>
                <ListView
                    dataSource={this.state.dataSourceSite}
                    renderRow={this.renderSite.bind(this)}/>
                <View style={styles.line}/>
                <Text style={styles.title}>站点分类</Text>
                <View style={styles.line}/>
                <ListView
                    dataSource={this.state.dataSourceCate}
                    renderRow={this.renderCate.bind(this)}
                    contentContainerStyle={styles.listViewStyle}
                />
                <View style={styles.line}/>
            </View>
        </ScrollView>
    }


    renderSite(rowData) {
        return (
            <SiteItem pic={rowData.pic} name={rowData.name} brief={rowData.brief} onItemPress={() => {
                this.props.navigation.navigate('Site', {id: rowData.id, title: rowData.name});

            }}/>

        );
    }

    // 返回cell
    renderCate(rowData) {
        return (
            <View style={styles.innerViewStyle}>
                <View style={styles.cateLine}/>
                <View>
                    <View style={styles.cateBottomLine}/>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Cate', {title: rowData.name, id: rowData.id});
                    }}>
                        <View style={{paddingLeft: 10, height: 60, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={{uri: rowData.icon}} style={styles.cateIconStyle}/>
                            <Text style={styles.cateName}>{rowData.name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.cateBottomLine}/>
                </View>
                <View style={styles.cateLine}/>
            </View>

        );
    }

    renderBanner(data) {
        return (<TouchableWithoutFeedback onPress={() => {
            this.props.navigation.navigate('Site', {id: data.id, title: data.name});
        }}>
            <Image style={{height: 160, width: global.screenWidth}} source={{uri: data.banner}}/>
        </TouchableWithoutFeedback>)
    }
}

const styles = StyleSheet.create({
    listViewStyle: {
        // 主轴方向
        flexDirection: 'row',
        // 一行显示不下,换一行
        flexWrap: 'wrap',
        // 侧轴方向
        alignItems: 'center', // 必须设置,否则换行不起作用
    },

    innerViewStyle: {
        flexDirection: 'row',
        width: cellWH,
        // 文字内容居中对齐
    },

    siteIconStyle: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    cateIconStyle: {
        width: 24,
        height: 24,
        marginRight: 10
    },

    title: {
        backgroundColor: '#ebebeb',
        fontSize: 14,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10
    },

    line: {
        width: global.screenWidth,
        height: 0.5,
        backgroundColor: global.dividerColor
    },

    siteLine: {
        width: global.screenWidth - 70,
        height: 0.5,
        backgroundColor: global.dividerColor,
        marginLeft: 60,
        marginRight: 10
    },

    cateLine: {
        width: 0.2,
        backgroundColor: global.dividerColor
    },

    cateBottomLine: {
        width: global.screenWidth / 2,
        height: 0.2,
        backgroundColor: global.dividerColor
    },

    cateName: {
        flex: 1,
        fontSize: 16
    },

    scBtn: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 12
    }

});