import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import {URL, API, IMG, IMG_HOME} from '../publics/config'
import Axios from 'axios'
export default class Movie extends React.Component {
    state = {
        search :'',
        popular: [],
        now_playing: [],
        upcoming: [],
        top_rated: [],
        pop: true,
        now: false,
        up: false,
        top: false,
        loading: false,
        pageP: 1,
        pageN: 1,
        pageU: 1,
        pageT: 1
    }
    async componentDidMount(){
        await Axios.get(`${URL}/3/movie/popular?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({popular : res.data.results})
        })
        await Axios.get(`${URL}/3/movie/now_playing?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({now_playing : res.data.results})
        })
        await Axios.get(`${URL}/3/movie/upcoming?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({upcoming : res.data.results})
        })
        await Axios.get(`${URL}/3/movie/top_rated?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({top_rated : res.data.results})
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

    onRefreshP = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageP + 1
        await Axios.get(`${URL}/3/movie/popular?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let popularN = this.state.popular
            let data = popularN.concat(res.data.results)
            this.setState({popular : data, pageP : page, loading: false})
        })
    }

    onRefreshN = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageN + 1
        await Axios.get(`${URL}/3/movie/now_playing?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let now_playingN = this.state.now_playing
            let data = now_playingN.concat(res.data.results)
            this.setState({now_playing : data, pageN : page, loading: false})
        })
    }

    onRefreshU = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageU + 1
        await Axios.get(`${URL}/3/movie/upcoming?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let upcomingN = this.state.upcoming
            let data = upcomingN.concat(res.data.results)
            this.setState({upcoming : data, pageU : page, loading: false})
        })
    }

    onRefreshT = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageT + 1
        await Axios.get(`${URL}/3/movie/top_rated?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let top_ratedN = this.state.top_rated
            let data = top_ratedN.concat(res.data.results)
            this.setState({top_rated : data, pageT : page, loading: false})
        })
    }

    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loading) return null;
        return (
            <View style={{marginVertical: 10}}>
                <ActivityIndicator size='large' color='#393534' />
            </View>
        );
    };

    popularF = () => {
        return (
            <FlatList
                data={this.state.popular}
                keyExtractor={(item, index) => index}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={2}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.title}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.release_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshP()}
            />
        )
    }

    now_playingF = () => {
        return (
            <FlatList
                data={this.state.now_playing}
                keyExtractor={(item, index) => index}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={2}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.title}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.release_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshN()}
            />
        )
    }

    upcomingF = () => {
        return (
            <FlatList
                data={this.state.upcoming}
                keyExtractor={(item, index) => index}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={2}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.title}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.release_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshU()}
            />
        )
    }

    top_ratedF = () => {
        return (
            <FlatList
                data={this.state.top_rated}
                keyExtractor={(item, index) => index}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={2}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.title}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.release_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshT()}
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
                            placeholder="Search for a movie..."
                            selectionColor="#fff"
                            value={this.state.search}
                            onChangeText={(search) => this.setState({search})}
                        />
                        <TouchableOpacity style={{borderRadius: 20, height:40, backgroundColor: '#393534', width:100, justifyContent: 'center', alignItems: 'center', position: 'absolute', right:0}}
                            onPress={()=> {
                                this.props.navigation.navigate('Search', {search: this.state.search, movie: true, tv: false})
                                this.setState({search: ''})
                            }}>
                            <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 17}}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row', margin: 10, justifyContent: 'center', paddingHorizontal: 10}}>
                    <View style={{borderColor: '#FF7314', borderRadius: 20, borderWidth:1, flexDirection: 'row', backgroundColor: "#FFFFFF", height: 30}}>
                        <TouchableOpacity onPress={()=> this.setState({pop : true, now: false, up: false, top: false})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.pop ? '#FF7314': '#FFFFFF', paddingHorizontal: 5}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.pop ? '#FFFFFF' : '#FF7314'}}>Popular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({pop : false, now: true, up: false, top: false})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.now ? '#FF7314': '#FFFFFF', paddingHorizontal: 5}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.now ? '#FFFFFF' : '#FF7314'}}>Now Playing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({pop : false, now: false, up: true, top: false})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.up ? '#FF7314': '#FFFFFF', paddingHorizontal: 5}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.up ? '#FFFFFF' : '#FF7314'}}>Upcoming</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({pop : false, now: false, up: false, top: true})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.top ? '#FF7314': '#FFFFFF', paddingHorizontal: 5}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.top ? '#FFFFFF' : '#FF7314'}}>Top Rated</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.pop ? this.popularF() : this.state.now ? this.now_playingF() : this.state.up ? this.upcomingF() : this.state.top ? this.top_ratedF() : null}
            </View>
        );
    }
  }