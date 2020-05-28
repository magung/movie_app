import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import {URL, API, IMG} from '../publics/config'
import Axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class VideoScreen extends React.Component {

    state = {
        items : [],
        img : ''
    }

    async componentDidMount(){
        let {id, tv, movie, img} = this.props.route.params;
        this.setState({img})
        // let tv = this.props.navigation.params('tv');
        // let movie = this.props.navigation.params('movie');
        if(tv !== undefined && tv == 1) {
            await Axios.get(`${URL}/3/tv/${id}/videos?api_key=${API}&language=en-US`)
            .then(res => {
                this.setState({items : res.data.results})
            })
        } else if (movie == 1 && movie !== undefined) {
            await Axios.get(`${URL}/3/movie/${id}/videos?api_key=${API}&language=en-US`)
            .then(res => {
                this.setState({items : res.data.results})
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <FlatList
                    style={{width: '100%', padding: 10}}
                    data={this.state.items}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                    <TouchableOpacity style={{width: '100%', height: 200, backgroundColor: '#FF7314', marginVertical: 5, justifyContent: 'center', alignItems:'center'}} onPress={()=> this.props.navigation.navigate('PlayVideo', {key: item.key})} >
                        <ImageBackground source={{uri: IMG+this.state.img}} style={{width: '100%', height: 200, opacity: 0.5}}>
                        </ImageBackground>
                        <Icon name="videocam" size={100} color="#FFFFFF" style={{position:'absolute'}} />
                        <Text style={{fontWeight: 'bold', fontSize: 17, color: '#FFFFFF', position: 'absolute', bottom: 5, left: 5}} numberOfLines={2}>{item.name}</Text>
                    </TouchableOpacity>
                    }
                />
            </View>
        );
    }
  }