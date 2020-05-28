import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {URL, API, IMG} from '../publics/config'
import Axios from 'axios'
// import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'

export default class PlayVideo extends React.Component {

    state = {
        key : '',
        isReady: '',
        status: '',
        quality: '',
        error: ''
    }

    

    async componentDidMount(){
        let {key} = this.props.route.params;
        this.setState({key})




    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: '#000000' }}>
                    <YouTube
                        videoId={this.state.key}
                        apiKey='AIzaSyDEAyQla5_tP3qm52MkK3APaTqCglGKps0'
                        style={{alignSelf: 'stretch', height: (Dimensions.get("window").width * (9/16))}}
                        loop={true}
                        play={true}
                        fullscreen={true}
                        onReady={e => this.setState({ isReady: true })}
                        onChangeState={e => this.setState({ status: e.state })}
                        onChangeQuality={e => this.setState({ quality: e.quality })}
                        onError={e => this.setState({ error: e.error })}
                    />
                    <Text>{this.state.error}</Text>
                </View>

            </SafeAreaProvider>
        );
    }
  }