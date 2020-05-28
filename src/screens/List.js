import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import {URL, API, ACCOUNT_ID, SESSION_ID, IMG_HOME} from '../publics/config'
import Axios from 'axios'
export default class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lists : [],
            refreshing: false,
            img_home: ''
        }

    }
    
    async componentDidMount(){
        await Axios.get(`${URL}/3/account/${ACCOUNT_ID}/lists?api_key=${API}&language=en-US&session_id=${SESSION_ID}&page=1`)
        .then(res => {
            this.setState({lists : res.data.results})
        })
        let img_home = IMG_HOME[Math.floor(Math.random()*IMG_HOME.length)]
        this.setState({img_home})
    }
    async componentDidUpdate(){
        await Axios.get(`${URL}/3/account/${ACCOUNT_ID}/lists?api_key=${API}&language=en-US&session_id=${SESSION_ID}&page=1`)
        .then(res => {
            this.setState({lists : res.data.results})
        })
    }
    onRefresh = async () => {
        this.setState({refreshing: true})
        await Axios.get(`${URL}/3/account/${ACCOUNT_ID}/lists?api_key=${API}&language=en-US&session_id=${SESSION_ID}&page=1`)
        .then(res => {
            this.setState({lists : res.data.results})
            this.setState({refreshing: false})
        })
    }
    redirect = (id) => {
        if(this.state.needRefresh){
            return ToastAndroid.show("please refresh now", ToastAndroid.SHORT);
        }
        this.props.navigation.navigate("DetailList", {id : id})
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', width: '100%', backgroundColor: '#FFFFFF', height: 60, alignItems: 'center', elevation: 10, marginBottom: 5}}>
                    <Text style={{fontSize: 25, fontWeight:'bold', position: 'absolute', left: 10}}>My Lists</Text>
                    <TouchableOpacity style={{borderColor: '#393534', borderWidth: 2, backgroundColor: '#FFFFFF', height: 35, paddingHorizontal: 10, borderRadius: 20, position: 'absolute', alignContent: 'center', justifyContent: 'center', right: 10}} onPress={() => this.props.navigation.navigate('CreateList')}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, color: '#393534'}}>Create List</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.lists}
                    style={{width: '100%'}}
                    keyExtractor={(item, index) => index}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    renderItem={({ item }) => 
                        <TouchableOpacity style={{alignItems: 'center',width: '97%', margin: 5, backgroundColor: '#393534', borderRadius: 10}} 
                            onPress={() => this.redirect(item.id)}>
                            <Image source={{uri: this.state.img_home}} style={{width: '100%', height: '100%',opacity: 0.5, position: 'absolute',resizeMode: 'cover', backgroundColor: '#393534',borderRadius: 10}}/>
                            <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20, color: '#FFFFFF'}}>{item.name}</Text>
                            <Text style={{color: '#ebebeb', textAlign: 'center'}}>{item.item_count} items</Text>
                            <Text style={{color: '#ebebeb', textAlign: 'center', marginBottom: 10}}  numberOfLines={3}>{item.description}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}