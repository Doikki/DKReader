import React, {Component} from 'react';
import {
    ListView,
} from 'react-native';
import SiteItem from "../component/SiteItem";
import ScManager from "../util/ScManager";

export default class MyScListScreen extends Component {


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
        ScManager.getScList(data => {
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
        return <SiteItem
            showMark={true}
            siteInfo={rowData}
            isSc={true}
            onItemPress={() => {
            this.props.navigation.navigate('Site', {id: rowData.id, title: rowData.name});
        }}/>
    }
}