import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, ToastAndroid, FlatList, Image } from 'react-native';
import {URL, API, IMG, SESSION_ID} from '../publics/config'
import Axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class DetailList extends React.Component {
    state = {
       list : [],
       id: this.props.route.params.id
    }

    async componentDidMount() {
        let id = this.state.id
        await Axios.get(`${URL}/3/list/${id}?api_key=${API}&language=en-US`)
        .then(res => {
            this.setState({list : res.data})
        })
    }
    async componentDidUpdate() {
        let id = this.state.id
        await Axios.get(`${URL}/3/list/${id}?api_key=${API}&language=en-US`)
        .then(res => {
            this.setState({list : res.data})
        })
    }
    removeItem = async (id) => {
        let data = {
            media_id : id
        }
        await Axios.post(`${URL}/3/list/${this.state.id}/remove_item?api_key=${API}&session_id=${SESSION_ID}`, data, {headers : {"Content-Type" : "application/json;charset=utf-8"}})
        .then(res => {
            ToastAndroid.show("Success remove item", ToastAndroid.SHORT);
            this.componentDidMount()
        })
    }

    month = (dates) => {
        dates += ''
        let mS = "Jan,Feb,Mar,Apr,Mey,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
        let y = dates.substring(0, 4)
        let m = mS[Number(dates.substring(5, 7)) - 1];
        let d = dates.substring(8, 10)
        return m+' '+d+', '+y
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                
                <View style={{flexDirection: 'row', width: '100%', backgroundColor: '#FFFFFF', alignItems: 'center', marginBottom: 20, elevation: 20}}>
                    <View style={{marginLeft: 10, marginVertical: 10}}>
                        <Text style={{fontSize: 16, fontWeight:'bold'}}>{this.state.list.name}</Text>
                        <Text style={{fontSize: 12}}>{this.state.list.item_count} items</Text>
                        <Text style={{fontSize: 12}}>{this.state.list.description}</Text>
                    </View>
                    <View style={{justifyContent: 'center' , position: 'absolute', right: 10, flexDirection: 'row', bottom: 7}}>
                        <TouchableOpacity style={{borderColor: '#393534', borderWidth: 2, backgroundColor: '#FFFFFF', height: 35, paddingHorizontal: 10, borderRadius: 20, alignContent: 'center', justifyContent: 'center', elevation: 10, marginRight:5}} onPress={() => this.props.navigation.navigate("CreateList", {id: this.state.id})}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#393534'}}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderColor: '#393534', borderWidth: 2, backgroundColor: '#FFFFFF', height: 35, paddingHorizontal: 10, borderRadius: 20, alignContent: 'center', justifyContent: 'center', elevation: 10}} onPress={() => this.props.navigation.navigate("AddItemList", {id: this.state.id})}>
                            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#393534'}}>Add Item</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={this.state.list.items}
                    keyExtractor={item => item.id}
                    columnWrapperStyle={{justifyContent: 'center'}}
                    numColumns={2}
                    renderItem={({ item }) => 
                        <View style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}}  >
                            <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                            <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                                <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: 1})}>
                                <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.title ? item.title : item.name}</Text>
                                <Text style={{color: '#adadad', textAlign: 'center'}}>{(item.release_date !== '' && item.first_air_date !== '') ? this.month(item.release_date ? item.release_date : item.first_air_date) : null}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right:0}} onPress={() => this.removeItem(item.id)}>
                                <Icon name="cancel" color="#FFFFFF" size={30} />
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        );
    }
}