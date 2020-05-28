import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, Picker, ScrollView, ToastAndroid } from 'react-native';
import {URL, API, IMG, SESSION_ID, ACCOUNT_ID} from '../publics/config'
import Axios from 'axios'
export default class AddItemList extends React.Component {
    state = {
        search :'',
        films: [],
        lists: [],
        list: '',
        selectM: []
    }
    async componentDidMount(){
        let id = this.props.route.params.id
        this.setState({list: id})
        if(this.props.route.params.movie_id){
            let movie_id = this.props.route.params.movie_id
            let movie_name = this.props.route.params.movie_name
            let media_type = this.props.route.params.media_type
            let film = [{media_type: media_type, id: movie_id, name: movie_name}]
            this.setState({selectM: film})
        }
        await Axios.get(`${URL}/3/account/${ACCOUNT_ID}/lists?api_key=${API}&language=en-US&session_id=${SESSION_ID}&page=1`)
        .then(res => {
            this.setState({lists : res.data.results})
        })
    }

    searching = async () => {
        let search = this.state.search
        await Axios.get(`${URL}/3/search/multi?api_key=${API}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then(res => {
            let films = []
            let data = res.data.results
            for(let i = 0; i < data.length ; i ++){
                if(data[i].media_type == 'tv' || data[i].media_type == 'movie'){
                    films.push(data[i])
                }
            }
            this.setState({films : films})
        })
    }

    addItems = async () => {
        let list = this.state.list
        let data = []
        let films = this.state.selectM
        for(let i = 0; i < films.length; i++){
            let film = {
                media_type: films[i].media_type,
                media_id: films[i].id
            }
            data.push(film)
        }
        let items = {items : data}
        await Axios.post(`${URL}/4/list/${list}/items`, items, {headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1OTA0OTY4MjQsInN1YiI6IjVlY2NiYTUxMzU4MThmMDAyMmMwM2FjNiIsImp0aSI6IjIwODUzNDIiLCJhdWQiOiIyZWI2ZjdmZTU4YTRiY2U4YzFlYTI3Mjg3ZjkxZTYzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxfQ.s0f-U3Oa3VbcSEWtXmBq1Psd3McIzsPuMugl3HysnSk", "Content-Type" : "application/json;charset=utf-8"}})
        .then(res => {
            console.log(res)
            ToastAndroid.show("Success add items", ToastAndroid.SHORT);
            this.props.navigation.navigate("List")
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

    addSelect = (id, name, media_type) => {
        let data = {
            id : id, name : name, media_type : media_type
        }
        let films = this.state.selectM
        if(films.length > 0) {
            let add = true
            for(let i = 0; i < films.length; i++){
                if(films[i]['id'] == id){
                    add = false
                }
            }
            if(add){
                films.push(data)
            }
        }else{
            films.push(data)
        }
        
        this.setState({selectM: films})
    }

    removeSelected = (id) => {
        let films = this.state.selectM
        let s = []
        for(let i = 0; i < films.length; i++){
            if(films[i]['id'] !== id){
                s.push(films[i])
            }
        }
        this.setState({selectM: s})
    }

    films = () => {
        return(
            <FlatList
                data={this.state.films}
                keyExtractor={item => item.id}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={4}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 80, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 5}} 
                        onPress={() => this.addSelect(item.id, item.name ? item.name : item.title, item.media_type)} >
                        <Image style={{width: 80, height:120, resizeMode: 'cover', borderRadius: 5, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <Text style={{fontWeight:'bold',marginVertical: 5, textAlign: 'center', fontSize: 10, marginBottom: 25}} numberOfLines={5}>{item.title ? item.title : item.name}</Text>
                        <View style={{height: 20, backgroundColor: '#FF7314', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 5, borderBottomLeftRadius: 5, position: 'absolute', bottom:0}}>
                            <Text style={{fontSize: 15, color: '#FFFFFF', fontWeight: 'bold'}}>ADD</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
        )
    }

    listPicker = () => {
        return ( this.state.lists.map((x, i) => {
            return (<Picker.Item label={x.name} key={i} value={x.id} />)}));
    }

    listSelectM = () => {
        return ( this.state.selectM.map((x, i) => {
            return (
                <TouchableOpacity style={{backgroundColor: '#393534', width: '95%', justifyContent: 'center', alignItems: 'center', marginBottom: 5, borderRadius: 5, padding: 5}} onPress={() => this.removeSelected(x.id)}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 15}}>{x.name}</Text>
                </TouchableOpacity>
            )}));
    }

    render() {
        return (
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{width: "100%", backgroundColor: '#FF7314', alignItems:'center', marginBottom: 5, elevation: 10}}>
                    <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 20, marginTop: 20}}>Add Item to List</Text>
                    <View style={{width: "90%", marginVertical: 10, flexDirection: 'row'}}>
                        
                        <Picker 
                            selectedValue={this.state.list}
                            onValueChange={(value) => this.setState({list: value})}
                            style={{width: "100%", backgroundColor: '#FFFFFF', paddingHorizontal: 15, height: 40, justifyContent: 'center', fontSize: 15}}>
                            <Picker.Item value="select" label="Select List" key={0}/>
                            {this.listPicker()}
                        </Picker>
                    </View>
                    <View style={{width: "90%", marginVertical: 10}}>
                        <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 15}}>Films Selected</Text>
                        <View style={{width: "100%", backgroundColor: '#FFFFFF', paddingHorizontal: 15, minHeight: 40, justifyContent: 'center', fontSize: 15, alignItems: 'center', paddingTop: 5}}>
                            {this.listSelectM()}
                        </View>
                    </View>
                    <View style={{width: "90%", marginVertical: 20, flexDirection: 'row'}}>
                        <TextInput
                            style={{width: "100%", backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 15, height: 40, justifyContent: 'center', fontSize: 15}}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Search for a movie, tv show..."
                            selectionColor="#fff"
                            value={this.state.search}
                            onChangeText={(search) => this.setState({search})}
                        />
                        <TouchableOpacity style={{borderRadius: 20, height:40, backgroundColor: '#393534', width:100, justifyContent: 'center', alignItems: 'center', position: 'absolute', right:0}}
                            onPress={()=> this.searching()}>
                            <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 17}}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{borderRadius: 20, height:40, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', marginBottom: 15, paddingHorizontal: 20}}
                        onPress={()=> this.addItems()}>
                        <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 17}}>Add Items</Text>
                    </TouchableOpacity>
                </View>
                {this.films()}
            </View>
            </ScrollView>
        );
    }
  }