import React, {Component} from 'react';
import {
    ListView,
    Image,
    ScrollView,
    View,
    Text,
    WebView
} from 'react-native';

let global = require('../global');

export default class AboutScreen extends Component {

    static navigationOptions = () => ({
        headerTitle: '关于',
    });

    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({//数据源
                rowHasChanged: (row1, row2) => row1 !== row2,
            }).cloneWithRows(require('../../data/os.json')),
        }
    }


    render() {

        return <ScrollView style={{backgroundColor: 'white'}}>
            <View>
                <View style={{paddingTop: 20, paddingBottom: 20, alignItems: 'center'}}>
                    <Image style={{width: 90, height: 90}} source={require('../../img/ic_launcher.png')}/>
                    <Text style={{fontSize: 18, color: 'black', paddingTop: 10}}>水滴阅读 - 程序猿的骄傲与喜悦</Text>
                    <Text style={{fontSize: 12, color: 'gray', paddingTop: 10}}>version 1.0</Text>

                </View>
                <View style={{width: global.screenWidth, height: 0.5, backgroundColor: global.lineColor}}/>
                <Text style={{fontSize: 12, color: 'gray', paddingTop: 10, paddingLeft: 10}}>简介</Text>
                <Text style={{fontSize: 14, color: 'black', padding: 10}}>
                    一个小而美的阅读客户端，接口数据全部来自”锤子阅读“APP。
                </Text>
                <Text style={{fontSize: 14, color: 'black', padding: 10}}>
                    我的 GitHub: https://github.com/DevlinChiu</Text>
                <Text style={{fontSize: 14, color: 'black', padding: 10}}>
                    采用React Native编码。理论上支持Android和IOS双平台，但我只在Android真机上测试过，
                    完全开源，如果你觉得不错，可以帮忙分享给你更多的朋友，这是我们最大的动力和支持</Text>

                <View style={{width: global.screenWidth, height: 0.5, backgroundColor: global.lineColor}}/>
                <Text style={{fontSize: 12, color: 'gray', paddingTop: 10, paddingLeft: 10}}>用到的开源库</Text>
                <ListView style={{backgroundColor: 'white'}}
                          dataSource={this.state.dataSource}
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true}/>
            </View>

        </ScrollView>
    }


    renderRow(rowData) {
        return <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 12, color: 'black', paddingTop: 10, paddingLeft: 10}}>{rowData.name}</Text>
            <Text style={{fontSize: 12, color: 'black', paddingTop: 10, paddingLeft: 10}}>{rowData.version}</Text>
        </View>
    }
}