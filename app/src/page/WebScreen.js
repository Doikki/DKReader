import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    WebView,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import ScManager from "../util/ScManager";
import {PubSub} from 'pubsub-js';

let global = require('../global');

export default class WebScreen extends Component {

    constructor() {
        super();
        this.state = {
            isSc: false
        };
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        ScManager.getScIdList(data => {
            if (data.length > 0) {
                data.map((item) => {
                    if (params.siteInfo.id === item) {
                        this.setState({isSc: true});
                    }
                });
            }
        });
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                <View style={styles.scContainer}>
                    <Image style={styles.siteImg} source={{uri: params.siteImg}}/>
                    <Text style={styles.siteName}>{params.siteName}</Text>
                    <TouchableOpacity onPress={() => {
                        this.onSc(params)
                    }}>
                        <Text style={styles.scBtn}>{this.state.isSc ? '已订阅' : '订阅'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.webContainer}>
                    <WebView
                        javaScriptEnabled={true}
                        startInLoadingState={true}
                        source={{uri: params.url}}/>
                </View>
            </View>
        )
    }

    onSc(params) {
        let siteInfo = params.siteInfo;
        if (this.state.isSc) {
            ScManager.removeScSiteById(siteInfo.id);
            this.setState({isSc: false});
            PubSub.publish(siteInfo.name, false);
        } else {
            ScManager.addScSite(siteInfo);
            this.setState({isSc: true});
            PubSub.publish(siteInfo.name, true);
        }

    }
}


const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
    },
    scContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    sc: {
        flex: 0
    },
    siteImg: {
        width: 18,
        height: 18,
        marginRight: 6,
        borderRadius: 9
    },
    siteName: {
        flex: 1,
    },
    scBtn: {
        borderWidth: 0.5,
        borderColor: global.lineColor,
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 12
    }
});