import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity, // 不透明触摸
    ScrollView,
    RefreshControl,
    TouchableWithoutFeedback
} from 'react-native';
import Swiper from 'react-native-swiper';
import HttpUtil from "../util/HttpUtil";
import SiteItem from "../component/SiteItem";
import LoadingView from "../component/LoadingView";
import ScManager from "../util/ScManager";

let global = require('../global');

// 一些常亮设置
const cols = 2;
const cellWH = global.screenWidth / cols;
const url = 'http://reader.smartisan.com/index.php?r=myCenter/show';

export default class ScScreen extends Component {

    constructor() {
        super();
        // 创建数据源
        let dsSite = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dsCate = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.scIds = [];

        this.state = {
            dataSourceCate: dsCate,
            dataSourceSite: dsSite,
            dataSourceBanner: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {

        ScManager.getScIdList(idList => {
            let params = '';

            if (idList.length > 0) {
                let ids = '';
                idList.map(item => {
                    this.scIds.push(item);
                    ids = ids + item + ',';
                });

                params = {site_ids: ids}
            }

            HttpUtil.get(url, params, (responseData) => {

                let site = responseData.data.site;
                let cate = responseData.data.cate;
                let banner = responseData.data.banner;

                let temp = [];
                site.map((item) => {
                    let isSc = false;
                    for (let i = 0; i < idList.length; i++) {
                        if (item.id === idList[i]) {
                            isSc = true;
                            break;
                        }
                    }
                    item.isSc = isSc;
                    temp.push(item);
                });

                this.setState({
                    dataSourceCate: this.state.dataSourceCate.cloneWithRows(cate),
                    dataSourceSite: this.state.dataSourceSite.cloneWithRows(temp),
                    dataSourceBanner: banner,
                    isLoading: false
                });

            });

        });

    }

    render() {
        let banner = this.state.dataSourceBanner.length > 0 ? <View>
            <Swiper
                autoplay={true}
                autoplayTimeout={4}
                showsButtons={false}
                paginationStyle={{
                    bottom: 18
                }}
                dot={<View style={{
                    backgroundColor: 'white',
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    margin: 4
                }}/>}
                activeDot={<View style={{
                    backgroundColor: global.themeColor,
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    margin: 4
                }}/>}
                style={{width: global.screenWidth, height: 180}}>
                {this.state.dataSourceBanner.map((data, key) => {
                    return <TouchableWithoutFeedback key={key} onPress={() => {
                        this.props.navigation.navigate('Site', {id: data.id, title: data.name});
                    }}>
                        <View style={{width: global.screenWidth, height: 180}}>
                            <Image style={{height: 160, width: global.screenWidth - 20, borderRadius: 6, margin: 10,backgroundColor:'red', resizeMode: 'stretch'}}
                                     source={{uri: data.banner}}/>
                        </View>

                    </TouchableWithoutFeedback>
                })}
            </Swiper>
            <View style={styles.line}/>
        </View> : null;
        let site = <View>
            <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.navigate('SiteList', {
                    title: '编辑推荐站点',
                    action: "myCenter/recommendList",
                    showMark: true
                });
            }}>
                <View style={styles.reContainer}>
                    <Text style={styles.reTitle}>编辑推荐站点</Text>
                    <Image style={styles.moreIcon} source={require('../../img/more.png')}/>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.line}/>
            <ListView
                dataSource={this.state.dataSourceSite}
                renderRow={this.renderSite.bind(this)}/>
            <View style={styles.line}/>
        </View>;
        let cate = <View>
            <Text style={styles.siteTitle}>站点分类</Text>
            <View style={styles.line}/>
            <ListView
                dataSource={this.state.dataSourceCate}
                renderRow={this.renderCate.bind(this)}
                contentContainerStyle={styles.listViewStyle}
            />
            <View style={styles.line}/>
        </View>;
        return this.state.isLoading ? <LoadingView/> : <ScrollView
            style={{backgroundColor: 'white'}}
            refreshControl={//下拉刷新
                <RefreshControl
                    refreshing={this.state.isLoading}
                    colors={[global.themeColor]}
                    onRefresh={() => {
                        this.getData()
                    }}
                />}>
            <View>
                {banner}
                {site}
                {cate}
            </View>
        </ScrollView>
    }


    renderSite(rowData) {
        return (
            <SiteItem
                siteInfo={rowData}
                showMark={true}
                onItemPress={() => {
                    // ToastAndroid.show('点击了' + rowID, ToastAndroid.SHORT);
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
                        this.props.navigation.navigate('SiteList', {
                            title: rowData.name,
                            id: rowData.id,
                            action: "site/search",
                            showMark: false
                        });
                    }}>
                        <View style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            height: 60,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image source={{uri: rowData.icon}} style={styles.cateIconStyle}/>
                            <Text style={styles.cateName}>{rowData.name}</Text>
                            <Image style={styles.moreIcon} source={require('../../img/more.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.cateBottomLine}/>
                </View>
                <View style={styles.cateLine}/>
            </View>

        );
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

    siteTitle: {
        backgroundColor: '#ebebeb',
        fontSize: 16,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10
    },

    reTitle: {
        flex: 1,
        fontSize: 16,
    },

    line: {
        width: global.screenWidth,
        height: 0.5,
        backgroundColor: global.lineColor
    },

    siteLine: {
        width: global.screenWidth - 70,
        height: 0.5,
        backgroundColor: global.lineColor,
        marginLeft: 60,
        marginRight: 10
    },

    cateLine: {
        width: 0.2,
        backgroundColor: global.lineColor
    },

    cateBottomLine: {
        width: global.screenWidth / 2,
        height: 0.2,
        backgroundColor: global.lineColor
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
    },

    moreIcon: {
        width: 8,
        height: 12
    },

    reContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ebebeb',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10,
        paddingRight: 10
    }
});