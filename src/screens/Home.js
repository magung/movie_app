import * as React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, ImageBackground, TextInput, ActivityIndicator } from 'react-native';
import {URL, API, IMG, IMG_HOME} from '../publics/config'
import Axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class HomeScreen extends React.Component {

    state = {
        popularM : [],
        popularTV : [],
        top_ratedTV : [],
        top_ratedM: [],
        movieP: true,
        dayT: true,
        top: true,
        TrendingDay :[],
        TrendingWeek : [],
        img_home : IMG_HOME[0],
        search: '',
        loading: false,
        pageMP: 1,
        pageTP: 1,
        pageTM: 1,
        pageTT: 1
    }
    async componentDidMount(){
        
        await Axios.get(`${URL}/3/movie/popular?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({popularM : res.data.results})
        })
        await Axios.get(`${URL}/3/movie/top_rated?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({top_ratedM : res.data.results})
        })
        await Axios.get(`${URL}/3/tv/popular?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({popularTV : res.data.results})
        })
        await Axios.get(`${URL}/3/tv/top_rated?api_key=${API}&language=en-US&page=1`)
        .then(res => {
            this.setState({top_ratedTV : res.data.results})
        })
        await Axios.get(`${URL}/3/trending/all/day?api_key=${API}`)
        .then(res => {
            this.setState({TrendingDay : res.data.results})
        })
        await Axios.get(`${URL}/3/trending/all/week?api_key=${API}`)
        .then(res => {
            this.setState({TrendingWeek : res.data.results})
        })
        let img_home = IMG_HOME[Math.floor(Math.random()*IMG_HOME.length)]
        this.setState({img_home})
    }

    month = (dates) => {
        dates += ''
        let mS = "Jan,Feb,Mar,Apr,Mey,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
        let y = dates.substring(0, 4)
        let m = mS[Number(dates.substring(5, 7)) - 1];
        let d = dates.substring(8, 10)
        return m+' '+d+', '+y
    }

    onRefreshMP = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageMP + 1
        await Axios.get(`${URL}/3/movie/popular?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let popularMN = this.state.popularM
            let data = popularMN.concat(res.data.results)
            this.setState({popularM : data, pageMP : page, loading: false})
        })
    }

    onRefreshTP = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageTP + 1
        await Axios.get(`${URL}/3/tv/popular?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let popularTVN = this.state.popularTV
            let data = popularTVN.concat(res.data.results)
            this.setState({popularTV : data, pageTP : page, loading: false})
        })
    }

    onRefreshTM = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageTM + 1
        await Axios.get(`${URL}/3/movie/top_rated?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let top_ratedMN = this.state.top_ratedM
            let data = top_ratedMN.concat(res.data.results)
            this.setState({top_ratedM : data, pageTM : page, loading: false})
        })
    }

    onRefreshTT = async () =>  {
        this.setState({loading: true });
        let page = this.state.pageTT + 1
        await Axios.get(`${URL}/3/tv/top_rated?api_key=${API}&language=en-US&page=${page}`)
        .then(res => {
            let top_ratedTVN = this.state.top_ratedTV
            let data = top_ratedTVN.concat(res.data.results)
            this.setState({top_ratedTV : data, pageTT : page, loading: false})
        })
    }

    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loading) return null;
        return (
            <View style={{marginHorizontal: 10, justifyContent: 'center', marginTop: 100}}>
                <ActivityIndicator size='large' color='#393534' />
            </View>
        );
    };

    moviePopuler = () => {
        return(
            <FlatList
                data={this.state.popularM}
                keyExtractor={(item, index) => index}
                horizontal={true}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{marginHorizontal: 5, alignItems: 'center',width: 100, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 5}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: 1})} >
                        <Image style={{width: 100, height:150, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FF7314', position: 'absolute', top: 130, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 10, textAlign: 'center'}} numberOfLines={5}>{item.title}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.release_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshMP()}
            />
        )
    }

    tvPopuler = () => {
        return(
            <FlatList
                data={this.state.popularTV}
                keyExtractor={(item, index) => index}
                horizontal={true}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{marginHorizontal: 5, alignItems: 'center',width: 100, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 5}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, tv: 1})} >
                        <Image style={{width: 100, height:150, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FF7314', position: 'absolute', top: 130, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 10, textAlign: 'center'}} numberOfLines={5}>{item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.first_air_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshTP()}
            />
        )
    }

    tDay = () => {
        return(
            <FlatList
                data={this.state.TrendingDay}
                keyExtractor={(item, index) => index}
                horizontal={true}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{marginHorizontal: 5, alignItems: 'center',width: 100, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 5}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: item.title ? 1 : 0, tv: item.name ? 1 : 0})} >
                        <Image style={{width: 100, height:150, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FF7314', position: 'absolute', top: 130, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 10, textAlign: 'center'}} numberOfLines={5}>{item.title ? item.title : item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{item.release_date ? this.month(item.release_date) : this.month(item.first_air_date)}</Text>
                    </TouchableOpacity>
                }
            />
        )
    }

    tWeek = () => {
        return(
            <FlatList
                data={this.state.TrendingWeek}
                style={{paddingHorizontal:5}}
                keyExtractor={(item, index) => index}
                horizontal={true}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{marginHorizontal: 5, alignItems: 'center',width: 100, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 5}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: item.title ? 1 : 0, tv: item.name ? 1 : 0})} >
                        <Image style={{width: 100, height:150, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FF7314', position: 'absolute', top: 130, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 10, textAlign: 'center'}} numberOfLines={5}>{item.title ? item.title : item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{item.release_date ? this.month(item.release_date) : this.month(item.first_air_date)}</Text>
                    </TouchableOpacity>
                }
            />
        )
    }

    movieTop = () => {
        return(
            <FlatList
                data={this.state.top_ratedM}
                keyExtractor={(item, index) => index}
                horizontal={true}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{marginHorizontal: 5, alignItems: 'center',width: 100, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 5}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, movie: 1})} >
                        <Image style={{width: 100, height:150, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FF7314', position: 'absolute', top: 130, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 10, textAlign: 'center'}} numberOfLines={5}>{item.title}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.release_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshTM()}
            />
        )
    }

    tvShowTop = () => {
        return(
            <FlatList
                data={this.state.top_ratedTV}
                keyExtractor={(item, index) => index}
                horizontal={true}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{marginHorizontal: 5, alignItems: 'center',width: 100, backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 5}} onPress={() => this.props.navigation.navigate('Details', {id: item.id, tv: 1})} >
                        <Image style={{width: 100, height:150, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FF7314', position: 'absolute', top: 130, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 10, textAlign: 'center'}} numberOfLines={5}>{item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{this.month(item.first_air_date)}</Text>
                    </TouchableOpacity>
                }
                ListFooterComponent={() => this.renderFooter()}
                onEndReached={() => this.onRefreshTT()}
            />
        )
    }

    render() {
        return (
        <ScrollView>
              <View style={{ flex: 1}}>
                <ImageBackground source={{uri : this.state.img_home}} style={{width: '100%', height: 200, resizeMode: 'cover', justifyContent:'center', alignItems:'center'}}>
                    <View style={{width: '100%', height: '100%', backgroundColor: '#FF7314', opacity: 0.5}}>
                    </View>
                    <View style={{position:'absolute', paddingHorizontal:5, alignItems: 'center'}}>
                        <Text style={{color:'#FFFFFF', fontSize: 35, fontWeight: 'bold'}}>Welcome.</Text>
                        <Text style={{color:'#FFFFFF', fontSize: 13, textAlign: 'center', fontWeight: 'bold'}}>Millions of movies, TV shows and people to discover. Explore now.</Text>
                        <View style={{width: "90%", marginTop: 10, flexDirection: 'row'}}>
                            <TextInput
                                style={{width: "100%", backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 15, height: 40, justifyContent: 'center', fontSize: 15}}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Search for a movie, tv show..."
                                selectionColor="#fff"
                                value={this.state.search}
                                onChangeText={(search) => this.setState({search})}
                            />
                            <TouchableOpacity style={{borderRadius: 20, height:40, backgroundColor: '#FF7314', width:100, justifyContent: 'center', alignItems: 'center', position: 'absolute', right:0}}
                                onPress={()=> {
                                    this.props.navigation.navigate('Search', {search: this.state.search, movie: true, tv : false}) 
                                    this.setState({search: ''})
                                }}>
                                <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 17}}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={{position: 'absolute', left : 5, top: 5}} onPress={()=> this.props.navigation.openDrawer()}>
                        <Icon name="menu"  size={40} color="#FFFFFF" />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{alignItems: 'flex-start', flexDirection: 'row', marginTop: 5}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginHorizontal:5}}>What's Popular</Text>
                    <View style={{width:180, borderColor: '#FF7314', borderRadius: 20, borderWidth:1, flexDirection: 'row', backgroundColor: "#FFFFFF", height: 30, position: 'absolute', right: 10}}>
                        <TouchableOpacity onPress={()=> this.setState({movieP : true})} style={{position: 'absolute',left:0,width: '50%', height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, borderColor: '#FF7314', backgroundColor: this.state.movieP ? '#FF7314': '#FFFFFF'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.movieP ? '#FFFFFF' : '#FF7314'}}>Movie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({movieP : false})} style={{position: 'absolute',right:0,width: '50%', height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, borderColor:  '#FF7314', backgroundColor: this.state.movieP ? '#FFFFFF': '#FF7314'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.movieP ? '#FF7314' : '#FFFFFF'}}>Tv Show</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{minHeight: 200, marginVertical: 10, justifyContent: 'center'}}>
                {this.state.movieP ? this.moviePopuler() : this.tvPopuler()}
                </View>
                <View style={{alignItems: 'flex-start', flexDirection: 'row', marginTop: 5}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginHorizontal:5}}>Trending</Text>
                    <View style={{width:180, borderColor: '#FF7314', borderRadius: 20, borderWidth:1, flexDirection: 'row', backgroundColor: "#FFFFFF", height: 30, position: 'absolute', right: 10}}>
                        <TouchableOpacity onPress={()=> this.setState({dayT : true})} style={{position: 'absolute',left:0,width: '50%', height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.dayT ? '#FF7314': '#FFFFFF'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.dayT ? '#FFFFFF' : '#FF7314'}}>Day</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({dayT : false})} style={{position: 'absolute',right:0,width: '50%', height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, backgroundColor: this.state.dayT ? '#FFFFFF': '#FF7314'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.dayT ? '#FF7314' : '#FFFFFF'}}>Week</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{minHeight: 200, marginVertical: 10}}>
                {this.state.dayT ? this.tDay() : this.tWeek()}
                </View>
                <View style={{alignItems: 'flex-start', flexDirection: 'row', marginTop: 5}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginHorizontal:5}}>Top Rated</Text>
                    <View style={{width:180, borderColor: '#FF7314', borderRadius: 20, borderWidth:1, flexDirection: 'row', backgroundColor: "#FFFFFF", height: 30, position: 'absolute', right: 10}}>
                        <TouchableOpacity onPress={()=> this.setState({top : true})} style={{position: 'absolute',left:0,width: '50%', height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, borderColor: '#FF7314', backgroundColor: this.state.top ? '#FF7314': '#FFFFFF'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.top ? '#FFFFFF' : '#FF7314'}}>Movie</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({top : false})} style={{position: 'absolute',right:0,width: '50%', height: '100%', justifyContent: 'center', alignItems:'center', borderRadius: 15, borderColor:  '#FF7314', backgroundColor: this.state.top ? '#FFFFFF': '#FF7314'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: this.state.top ? '#FF7314' : '#FFFFFF'}}>Tv Show</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{minHeight: 200, marginVertical: 10}}>
                {this.state.top ? this.movieTop() : this.tvShowTop()}
                </View>
            </View>
        </ScrollView>
        );
    }
}