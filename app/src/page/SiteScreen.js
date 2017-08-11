import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import CommonNewsList from "../component/CommonNewsList";

export default class SiteScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.title,
    });


    render() {
        const {params} = this.props.navigation.state;

        return (<CommonNewsList {...this.props} siteId={params.id} action={"article/getList"}/>)
    }
}