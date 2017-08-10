import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    WebView,
    Image,
    View,
    Button,
    TouchableOpacity
} from 'react-native';

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
        global.storage
            .getIdsForKey(global.scKey)
            .then(data => {
                if (data.length > 0) {
                    data.map(item => {
                        if (params.siteInfo.id === item) {
                            this.setState({isSc: true});
                        }
                    })
                }
            })
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
                        javaScriptEnabled={false}
                        startInLoadingState={true}
                        source={{uri: params.url}}/>
                </View>
            </View>
        )
    }

    onSc(params) {
        let id = params.siteInfo.id;
        if (this.state.isSc) {
            global.storage.remove({key: global.scKey, id: id});
            this.setState({isSc: false});
        } else {
            global.storage.save({
                key: global.scKey,
                id: id,
                data: params.siteInfo
            });
            this.setState({isSc: true});
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
    },
    siteName: {
        flex: 1,
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