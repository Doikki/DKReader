import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import ScManager from "../util/ScManager";
import {PubSub} from 'pubsub-js';

let global = require('../global');

export default class SiteItem extends Component {

    static defaultProps = {
        showMark: true,
        isSc: false
    };

    static propTypes = {
        showMark: PropTypes.bool,
        isSc: PropTypes.bool,
    };

    constructor() {
        super();
        this.state = {
            isSc: false
        };
    }

    componentWillMount() {
        console.log('mount...');
        this.token = PubSub.subscribe(this.props.siteInfo.name, (msg, data) => {
            console.log(msg);
            console.log(data.toString());
            this.setState({isSc: data});
        });
    }

    componentWillUnmount() {
        console.log('unmount...');
        PubSub.unsubscribe(this.token);
    }

    componentDidMount() {
        this.setState({isSc: this.props.isSc});
    }

    componentWillReceiveProps() {
        this.setState({isSc: this.props.isSc});
    }


    render() {
        let mark = this.props.showMark ? <Text
            style={styles.mark}>{this.props.cateName}</Text> : null;
        return <View>
            <TouchableOpacity onPress={() => {
                if (this.props.onItemPress) this.props.onItemPress();
            }}>
                <View style={{alignItems: 'center', flexDirection: 'row', padding: 10}}>
                    <Image source={{uri: this.props.pic}} style={styles.siteIconStyle}/>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: 'black'}}>{this.props.name}</Text>
                            {mark}
                        </View>
                        <Text style={{fontSize: 12, marginTop: 2}}>{this.props.brief}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.onSc();
                    }}>
                        <Text style={styles.scBtn}>{this.state.isSc ? "已订阅" : "订阅"}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <View style={styles.siteLine}/>
        </View>
    }

    onSc() {
        let siteInfo = this.props.siteInfo;
        if (this.state.isSc) {
            ScManager.removeScSiteById(siteInfo.id);
            this.setState({isSc: false});
        } else {
            ScManager.addScSite(siteInfo);
            this.setState({isSc: true});
        }

        this.forceUpdate();
    }
}

const styles = StyleSheet.create({
    scBtn: {
        borderWidth: 0.5,
        borderColor: global.lineColor,
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 12
    },
    siteIconStyle: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20
    },
    siteLine: {
        width: global.screenWidth - 70,
        height: 0.5,
        backgroundColor: global.lineColor,
        marginLeft: 60,
        marginRight: 10
    },
    mark: {
        marginLeft: 10,
        paddingLeft: 4,
        paddingRight: 4,
        fontSize: 10,
        borderRadius: 4,
        borderColor: global.lineColor,
        borderWidth: 0.5
    },
});