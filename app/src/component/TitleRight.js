import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TouchableNativeFeedback,
    Share
} from 'react-native';
import ScManager from "../util/ScManager";

let global = require('../global');

export default class TitleRight extends Component {

    constructor() {
        super();
        this.state = {
            isFav: false
        };
    }

    componentDidMount() {
        ScManager.getFavIdList(data => {
            if (data.length > 0) {
                data.map((item) => {
                    if (this.props.artInfo.id === item) {
                        this.setState({isFav: true});
                    }
                });
            }
        })
    }

    render() {
        let artInfo = this.props.artInfo;
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => {
                    if (this.state.isFav) {
                        ScManager.removeFavArtById(artInfo.id);
                        this.setState({isFav: false})
                    } else {
                        ScManager.addFavArt(artInfo);
                        this.setState({isFav: true})
                    }
                }}>
                <Image style={{height: 20, width: 20, marginRight: 20}}
                       source={this.state.isFav ? require('../../img/ic_action_favorite_s.png') : require('../../img/ic_action_favorite_n.png')}/>


            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                Share.share({
                    message: artInfo.title + artInfo.origin_url,
                    title: artInfo.title
                }, {
                    dialogTitle: '分享文章',
                }).then()
            }}>
                <Image
                    style={{height: 20, width: 20, marginRight: 20}}
                    source={require('../../img/ic_action_share.png')}/>
            </TouchableOpacity>
        </View>


    }
}