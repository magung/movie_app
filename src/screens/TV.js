import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import {URL, API, IMG, IMG_HOME} from '../publics/config'
import Axios from 'axios'
export default class TV extends React.Component {
    state = {
        search :'',
        popular: [],
        airing_today: [],
        on_the_air: [],
        top_rated: [],
        pop: true,
        air: false,
        on: false,
        top: false,
        pageP: 1,
        pageA: 1,
        pageO: 1,
        pageT: 1,
        loading: false
    }
    async componentDidMount(){
        await Axios.get(`${URL}/3/tv/popular?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({popular : res.data.results})
        })
        await Axios.get(`${URL}/3/tv/airing_today?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({airing_today : res.data.results})
        })
        await Axios.get(`${URL}/3/tv/on_the_air?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({on_the_air : res.data.results})
        })
        await Axios.get(`${URL}/3/tv/top_rated?api_key=${API}&language=en-US&page=1`)
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
        await Axios.get(`${URL}/3/tv/popular?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let popularN = this.state.popular
            let data = popularN.concat(res.data.results)
            this.setState({popular : data, pageP : page, loading: false})
        })
    }

    onRefreshO = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageO + 1
        await Axios.get(`${URL}/3/tv/on_the_air?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let on_the_airN = this.state.on_the_air
            let data = on_the_airN.concat(res.data.results)
            this.setState({on_the_air : data, pageO : page, loading: false})
        })
    }

    onRefreshT = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageT + 1
        await Axios.get(`${URL}/3/tv/top_rated?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let top_ratedN = this.state.top_rated
            let data = top_ratedN.concat(res.data.results)
            this.setState({top_rated : data, pageT : page, loading: false})
        })
    }

    onRefreshA = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageA + 1
        await Axios.get(`${URL}/3/tv/airing_today?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let airing_todayN = this.state.airing_today
            let data = airing_todayN.concat(res.data.results)
            this.setState({airing_today : data, pageA : page, loading: false})
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
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, tv: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.first_air_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshP()}
            />
        )
    }
    airing_todayF = () => {
        return (
            <FlatList
                data={this.state.airing_today}
                keyExtractor={(item, index) => index}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={2}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, tv: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.first_air_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshA()}
            />
        )
    }
    on_the_airF = () => {
        return (
            <FlatList
                data={this.state.on_the_air}
                keyExtractor={(item, index) => index}
                columnWrapperStyle={{justifyContent: 'center'}}
                numColumns={2}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, tv: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.first_air_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshO()}
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
                    <TouchableOpacity style={{alignItems: 'center',width: 150, margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, tv: 1})} >
                        <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FF7314', position: 'absolute', top: 205, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 14}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 21, textAlign: 'center', fontSize: 20}} numberOfLines={5}>{item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.first_air_date)}</Text>
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
                            placeholder="Search for a tv show..."
                            selectionColor="#fff"
                            value={this.state.search}
                            onChangeText={(search) => this.setState({search})}
                        />
                        <TouchableOpacity style={{borderRadius: 20, height:40, backgroundColor: '#393534', width:100, justifyContent: 'center', alignItems: 'center', position: 'absolute', right:0}}
                            onPress={()=> {
                                this.props.navigation.navigate('Search', {search: this.state.search, tv: true, movie: false})
                                this.setState({search: ''})
                            }}>
                            <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 17}}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row', margin: 10, justifyContent: 'center', paddingHorizontal: 10}}>
                    <View style={{borderColor: '#FF7314', borderRadius: 20, borderWidth:1, flexDirection: 'row', backgroundColor: "#FFFFFF", height: 30}}>
                        <TouchableOpacity onPress={()=> this.setState({pop : true, air: false, on: false, top: false})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.pop ? '#FF7314': '#FFFFFF', paddingHorizontal: 10}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.pop ? '#FFFFFF' : '#FF7314'}}>Popular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({pop : false, air: true, on: false, top: false})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.air ? '#FF7314': '#FFFFFF', paddingHorizontal: 10}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.air ? '#FFFFFF' : '#FF7314'}}>Airing Today</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({pop : false, air: false, on: true, top: false})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.on ? '#FF7314': '#FFFFFF', paddingHorizontal: 10}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.on ? '#FFFFFF' : '#FF7314'}}>On TV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({pop : false, air: false, on: false, top: true})} style={{height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.top ? '#FF7314': '#FFFFFF', paddingHorizontal: 10}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.top ? '#FFFFFF' : '#FF7314'}}>Top Rated</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.pop ? this.popularF() : this.state.air ? this.airing_todayF() : this.state.on ? this.on_the_airF() : this.state.top ? this.top_ratedF() :null}
            </View>
        );
    }
  }