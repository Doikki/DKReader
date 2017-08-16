import React, {Component} from 'react';
import {
    ListView,
    View,
    Text,
    Image,
    TouchableNativeFeedback
} from 'react-native';
import ScManager from "../util/ScManager";
let global = require('../global');

export default class MyFavListScreen extends Component {


    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.title,
    });

    constructor() {
        super();
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
        ScManager.getFavList(data => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data)
            });
        })
    }

    render() {
        return (<ListView
            style={{backgroundColor: 'white'}}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections={true}
        />)
    }


    renderRow(rowData) {
        return <View>
            <TouchableNativeFeedback onPress={() => {
                this.props.navigation.navigate('Web', {data: rowData});
            }}>
                <View style={{padding: 10}}>
                    <Text numberOfLines={1} style={{fontSize: 16, color: 'black',}}>{rowData.title}</Text>
                    <View style={{flexDirection: 'row', marginTop: 4}}>
                        <Image style={{width: 16, height: 16, borderRadius: 10}} source={{uri: rowData.site_info.pic}}/>
                        <Text style={{fontSize: 12, marginLeft: 4}}>{rowData.site_info.name}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
            <View style={{width: global.screenWidth, height: 0.5, backgroundColor: global.lineColor}}/>
            </View>

    }
}