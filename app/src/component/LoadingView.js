import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class LoadingView extends Component {


    render() {
        return <View style={styles.container}>
            <Text style={styles.loading}>Loading...</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    loading: {
        fontSize: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});