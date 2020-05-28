import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import {URL, API, IMG, IMG_HOME} from '../publics/config'
import Axios from 'axios'
export default class Search extends React.Component {
    state = {
        search :'',
        dataTv: [],
        dataM : [],
        movie : this.props.route.params.movie,
        tv: this.props.route.params.tv
    }
    async componentDidMount(){
        let {search} = this.props.route.params;
        this.setState({search})
        await Axios.get(`${URL}/3/search/multi?api_key=${API}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then(res => {

            let tv = []
            let movie = []
            let data = res.data.results
            for(let i = 0; i < data.length ; i ++){
                if(data[i].media_type == 'tv'){
                    tv.push(data[i])
                }else if(data[i].media_type == 'movie'){
                    movie.push(data[i])
                }
            }
            this.setState({dataTv : tv, dataM : movie})
        })
    }

    searching = async () => {
        let search = this.state.search
        await Axios.get(`${URL}/3/search/multi?api_key=${API}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then(res => {

            let tv = []
            let movie = []
            let data = res.data.results
            for(let i = 0; i < data.length ; i ++){
                if(data[i].media_type == 'tv'){
                    tv.push(data[i])
                }else if(data[i].media_type == 'movie'){
                    movie.push(data[i])
                }
            }
            this.setState({dataTv : tv, dataM : movie})
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
    movieF = () => {
        return(
            <FlatList
                data={this.state.dataM}
                keyExtractor={item => item.id}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={2}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.title ? item.title : item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{(item.release_date !== '' && item.first_air_date !== '') ? this.month(item.release_date ? item.release_date : item.first_air_date) : null}</Text>
                    </TouchableOpacity>
                }
            />
        )
    }
    tvShowF = () => {
        return(
            <FlatList
                data={this.state.dataTv}
                keyExtractor={item => item.id}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={2}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, tv: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.title ? item.title : item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{(item.release_date !== '' && item.first_air_date !== '') ? this.month(item.release_date ? item.release_date : item.first_air_date) : null}</Text>
                    </TouchableOpacity>
                }
            />
        )
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{width: "100%", backgroundColor: '#FF7314', alignItems:'center', marginBottom: 5}}>
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
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row', margin: 10, justifyContent: 'center', paddingHorizontal: 10}}>
                    <View style={{borderColor: '#FF7314', borderRadius: 20, borderWidth:1, flexDirection: 'row', backgroundColor: "#FFFFFF", height: 30}}>
                        <TouchableOpacity onPress={()=> this.setState({movie : true})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.movie ? '#FF7314': '#FFFFFF', paddingHorizontal: 10}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.movie ? '#FFFFFF' : '#FF7314'}}>Movie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({movie : false})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: !this.state.movie ? '#FF7314': '#FFFFFF', paddingHorizontal: 10}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: !this.state.movie ? '#FFFFFF' : '#FF7314'}}>TV Show</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.movie ? this.movieF() : this.tvShowF()}
            </View>
        );
    }
  }