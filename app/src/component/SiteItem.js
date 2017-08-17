import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
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
        this.token = PubSub.subscribe(this.props.siteInfo.name, (msg, data) => {
            this.setState({isSc: data});
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    componentDidMount() {
        this.setState({isSc: this.props.isSc});
    }

    /**
     * props改变时调用
     * @param nextProps 即将被设置的props，旧的props还是可通过this.props获取
     */
    componentWillReceiveProps(nextProps) {
        this.setState({isSc: nextProps.siteInfo.isSc})
    }

    render() {
        let {siteInfo, showMark} = this.props;
        let mark = showMark && siteInfo.cate_info && siteInfo.cate_info[0] ? <Text
            style={styles.mark}>{siteInfo.cate_info[0].name}</Text> : null;
        return <View>
            <TouchableNativeFeedback onPress={() => {
                if (this.props.onItemPress) this.props.onItemPress();
            }}>
                <View style={{alignItems: 'center', flexDirection: 'row', padding: 10}}>
                    <Image source={{uri: siteInfo.pic}} style={styles.siteIconStyle}/>
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: 'black'}}>{siteInfo.name}</Text>
                            {mark}
                        </View>
                        <Text style={{fontSize: 12, marginTop: 2}}>{siteInfo.brief}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.onSc();
                    }}>
                        <Text style={styles.scBtn}>{this.state.isSc ? "已订阅" : "订阅"}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableNativeFeedback>
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