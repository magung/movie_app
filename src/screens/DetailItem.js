import * as React from 'react';
import { View, Text, Button, Image, ImageBackground, TouchableOpacity,ScrollView, Alert } from 'react-native';
import {URL, API, IMG} from '../publics/config'
import Axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
export default class DetailsScreen extends React.Component {

    state = {
        item : {},
        id : this.props.route.params.id,
        tv: this.props.route.params.tv,
        movie: this.props.route.params.movie,
        credits: [
            {id:0, name: "", character: "", profile_path: ""},
            {id:1, name: "", character: "", profile_path: ""},
            {id:2, name: "", character: "", profile_path: ""}
        ],
        review: true,
        reviews: [],
        recommendations: [
            {id: 0, title: '', poster_path: '', vote_average: '', release_date: ''},
            {id: 1, name: '', poster_path: '', vote_average: '', first_air_date: ''}
        ],
        discuss: []
    }

    async componentDidMount(){
        let id = this.state.id
        let tv = this.state.tv;
        let movie = this.state.movie;
        if(tv !== undefined && tv == 1) {
            await Axios.get(`${URL}/3/tv/${id}?api_key=${API}&language=en-US`)
            .then(res => {
                this.setState({item : res.data})
            })
            await Axios.get(`${URL}/3/tv/${id}/credits?api_key=${API}&language=en-US`)
            .then(res => {
                this.setState({credits : res.data.cast})
            })
            await Axios.get(`${URL}/3/tv/${id}/reviews?api_key=${API}&language=en-US&page=1`)
            .then(res => {
                this.setState({reviews : res.data.results})
            })
            await Axios.get(`${URL}/3/tv/${id}/recommendations?api_key=${API}&language=en-US&page=1`)
            .then(res => {
                this.setState({recommendations : res.data.results})
            })
        } else if (movie == 1 && movie !== undefined) {
            await Axios.get(`${URL}/3/movie/${id}?api_key=${API}&language=en-US`)
            .then(res => {
                this.setState({item : res.data})
            })
            await Axios.get(`${URL}/3/movie/${id}/credits?api_key=${API}&language=en-US`)
            .then(res => {
                this.setState({credits : res.data.cast})
            })
            await Axios.get(`${URL}/3/movie/${id}/reviews?api_key=${API}&language=en-US&page=1`)
            .then(res => {
                this.setState({reviews : res.data.results})
            })
            await Axios.get(`${URL}/3/movie/${id}/recommendations?api_key=${API}&language=en-US&page=1`)
            .then(res => {
                this.setState({recommendations : res.data.results})
            })
        }
    }

    runtime = (time) => {
        let m = time%60
        let h = Math.floor(time/60)
        if(h > 1) {
            return h+"h "+m+"m"
        } else {
            return m+"m"
        }
    }

    release = (time) => {
        let y = ""+time
        return "("+y.substring(0, 4)+")"
    }

    credits = () => {
        return(
            <FlatList
                data={this.state.credits}
                keyExtractor={item => item.id}
                horizontal={true}
                renderItem={({ item }) => 
                    <View style={{marginHorizontal: 5, alignItems: 'center',width: 100, borderRadius: 10, elevation: 1, backgroundColor: '#FFFFFF', height: 220}} >
                        <Image style={{backgroundColor: '#ECECEC', width: 100, height:150, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10}} source={{uri : IMG+item.profile_path}}/>
                        <Text style={{fontWeight:'bold', marginTop: 10, textAlign: 'center'}} numberOfLines={3}>{item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center', fontSize: 10}}>{item.character}</Text>
                    </View>
                }
            />
        )
    }

    reviews = () => {
        return(
            <FlatList
                data={this.state.reviews.length !== 0 ? this.state.reviews : [{id: 0, nothing: "We don't have any reviews"}]}
                keyExtractor={item => item.id}
                horizontal={true}
                renderItem={({ item }) => 
                    <View style={{marginHorizontal: 5,width: 350, borderRadius: 10, elevation: 5, backgroundColor: '#FFFFFF', height: 220, padding: 10}} >
                        <Text style={{fontWeight:'bold', marginTop: 10, fontSize: 15}}>{item.author ? "A review by " + item.author : item.nothing}</Text>
                        <Text style={{fontSize: 13, marginTop: 10}} numberOfLines={9}>{item.content ? item.content : null}</Text>
                    </View>
                }
            />
        )
    }

    month = (dates) => {
        dates += ''
        let mS = "Jan,Feb,Mar,Apr,Mey,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
        let y = dates.substring(0, 4)
        let m = mS[Number(dates.substring(5, 7)) - 1];
        let d = dates.substring(8, 10)
        return m+' '+d+', '+y
    } 

    recommend = () => {
        return(
            <FlatList
                data={this.state.recommendations}
                keyExtractor={item => item.id}
                horizontal={true}
                renderItem={({ item }) => 
                    <TouchableOpacity style={{marginHorizontal: 5, alignItems: 'center',width: 100}} onPress={() => this.props.navigation.push('Details', {id: item.id, movie: item.title ? 1 : 0, tv: item.name ? 1 : 0})} >
                        <Image style={{width: 100, height:150, resizeMode: 'cover', borderRadius: 10, backgroundColor: '#ECECEC'}} source={{uri : IMG+item.poster_path}}/>
                        <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#393534', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FF7314', position: 'absolute', top: 130, left: 10}}>
                            <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.vote_average * 10}%</Text>
                        </View>
                        <Text style={{fontWeight:'bold', marginTop: 10., textAlign: 'center'}} numberOfLines={5}>{item.title ? item.title : item.name}</Text>
                        <Text style={{color: '#adadad', textAlign: 'center'}}>{item.release_date ? this.month(item.release_date) : item.first_air_date ? this.month(item.first_air_date) : null}</Text>
                    </TouchableOpacity>
                }
            />
        )
    }

    dollar = (money) => {
        let mo = '' + money
        let m = ''
        for(let i = 0; i < mo.length; i++){
            if((mo.length - i)%3 == 0 && i != 0) {
                m += ',' + mo[i]
            }else{
                m += mo[i]
            }
        }
        return m+'.00'
    }

    budget = () => {
        return (
            <>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginTop: 5}}>Budget</Text>
            <Text style={{fontSize: 15, textAlign: 'left'}}>${this.dollar(this.state.item.budget)}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginTop: 5}}>Revenue</Text>
            <Text style={{fontSize: 15, textAlign: 'left'}}>${this.dollar(this.state.item.revenue)}</Text>
            </>
        )
    }

    discuss = () => {
        return(
            <FlatList
                data={this.state.discuss.length == 0 ? [{subject:"We don't have any reviews"}] : []}
                style={{width: '100%'}}
                keyExtractor={item => item.id}
                renderItem={({ item }) => 
                    <View style={{marginHorizontal: 5,width: '97%', borderRadius: 10, elevation: 5, backgroundColor: '#FFFFFF', height: 50, marginVertical: 5, flexDirection: 'row', alignItems: 'center'}} >
                        <Text style={{fontWeight:'bold', marginTop: 10, fontSize: 15, left: 10, position: 'absolute'}}>{item.subject}</Text>
                    </View>
                }
            />
        )
    }

    addToList = () => {
        return Alert.alert(
            "Add To List",
            "Do you want add to list this film : " + (this.state.item.title ? this.state.item.title : this.state.item.name ? this.state.item.name : ""),
            [
              {
                text: "Cancel", style: "cancel"
              },
              { text: "OK", onPress: () => this.props.navigation.navigate("AddItemList", {movie_id: this.state.item.id, movie_name: (this.state.item.title ? this.state.item.title : this.state.item.name), media_type: (this.state.item.title ? "movie" : "tv") }) }
            ],
            { cancelable: false }
          );
    }

    render() {
        return (
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#F4F4F4', width: '100%'}}>
                <ImageBackground source={{uri: IMG+this.state.item.backdrop_path}} style={{width:'100%', height: 550, backgroundColor: '#ECECEC'}}>
                    <View style={{width:'100%', height: 550, backgroundColor: '#FF7314', opacity:0.7}}></View>
                </ImageBackground>
                <TouchableOpacity style={{position: 'absolute', left : 5, top: 5}} onPress={()=> this.props.navigation.navigate("Home")}>
                    <Icon name="apps"  size={40} color="#FFFFFF" />
                </TouchableOpacity>
                <Image style={{width: 150, height:225, resizeMode: 'cover', borderRadius: 10, position: 'absolute', top: 30, backgroundColor: '#ECECEC'}} source={{uri : IMG+this.state.item.poster_path}}/>
                <View style={{position: 'absolute', top: 260, width: '100%', alignItems: 'center'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center'}} numberOfLines={3}>{(this.state.item.title ? this.state.item.title : this.state.item.name ? this.state.item.name : "Loading ...") + " " + (this.state.item.release_date ? this.release(this.state.item.release_date) : this.state.item.first_air_date ? this.release(this.state.item.first_air_date) : "")}</Text>
                    <Text style={{fontWeight: 'normal', color: '#FFFFFF', fontSize: 13, textAlign: 'center'}} numberOfLines={2}>
                    {this.state.item.genres ? this.state.item.genres.map((x, i)=> {
                         return (i == this.state.item.genres.length - 1 && i !== 0 ? "& " : "") + x.name + (i == this.state.item.genres.length - 1 ? "" : ", ")
                    }) : null}
                    </Text>
                    <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>
                       {this.state.item.genres ? this.state.tv == 1 && this.state.tv !== undefined ? "TV • " : "Movie • " : ""}{this.state.item.episode_run_time ? this.runtime(this.state.item.episode_run_time[0]) : this.state.item.runtime ? this.runtime(this.state.item.runtime) : ""}
                    </Text>
                    <View style={{justifyContent:'center', flexDirection:'row', marginVertical: 5}}>
                        <View style={{backgroundColor: '#393534',borderWidth: 3, borderColor: '#20D17A', width: 50, height: 50, borderRadius: 25, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:16}}>{this.state.item.vote_average * 10}%</Text>
                        </View>
                        <Text numberOfLines={2} style={{width:65, marginLeft: 10, textAlignVertical: 'center', fontSize: 16, fontWeight:'bold', color: '#FFFFFF'}}>User Score</Text>
                    </View>
                    <View style={{justifyContent:'center', flexDirection:'row', marginVertical: 5}}>
                        <TouchableOpacity style={{backgroundColor: '#393534', width: 40, height: 40, borderRadius: 25, justifyContent:'center', alignItems:'center', marginRight: 10}} onPress={() => this.addToList()}>
                            <Icon name="list"  size={30} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: '#393534', width: 40, height: 40, borderRadius: 25, justifyContent:'center', alignItems:'center', marginRight: 10}}>
                            <Icon name="favorite"  size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: '#393534', width: 40, height: 40, borderRadius: 25, justifyContent:'center', alignItems:'center', marginRight: 10}}>
                            <Icon name="bookmark"  size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: '#393534', width: 40, height: 40, borderRadius: 25, justifyContent:'center', alignItems:'center'}}>
                            <Icon name="star"  size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', flexDirection:'row', marginVertical: 5}} onPress={() => this.props.navigation.navigate('Video', {id:this.state.id, tv: this.state.tv, movie: this.state.movie, img: this.state.item.poster_path})}>
                        <Icon name="slideshow"  size={40} color="#FFFFFF" />
                        <Text style={{color: '#FFFFFF', fontWeight:'bold', fontSize: 17}}>Play Trailer</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Overview</Text>
                    <View style={{padding: 10, backgroundColor: '#FF7314', margin: 5, borderRadius: 5, elevation: 5}}>
                        <Text style={{fontSize: 15, textAlign: 'left', color: '#FFFFFF'}}>{this.state.item.overview ? this.state.item.overview : ''}</Text>
                    </View>
                    <View style={{padding: 10, backgroundColor: '#F4F4F4', margin: 5, borderRadius: 5, elevation: 5}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}>Status</Text>
                        <Text style={{fontSize: 15, textAlign: 'left'}}>{this.state.item.status ? this.state.item.status : ''}</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginTop: 5}}>Original Language</Text>
                        <Text style={{fontSize: 15, textAlign: 'left'}}>English</Text>
                        { this.state.item.budget ? this.budget() : null }
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Top Billed Cast</Text>
                    <View style={{marginTop: 10, height: 250}}>
                        {this.credits()}
                    </View>
                </View>
                <View style={{width: '100%', backgroundColor: '#FFFFFF', paddingTop: 10}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Social</Text>
                    <View style={{marginTop: 5, backgroundColor: '#FFFFFF', width: '100%', flexDirection: 'row', paddingLeft: 10}}>
                        <TouchableOpacity style={{marginRight: 10, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 3, borderColor: this.state.review ? '#000000' : '#FFFFFF'}} onPress={() => this.setState({review: true})}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Reviews ({this.state.reviews.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginRight: 10, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 3, borderColor: this.state.review ? '#FFFFFF' : '#000000'}}  onPress={() => this.setState({review: false})}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Disscussions ({this.state.discuss.length})</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 10,backgroundColor: '#FFFFFF', width: '100%'}}>
                        {this.state.review ? this.reviews() : this.discuss()}
                    </View>
                </View>
                <View style={{ width: '100%', backgroundColor: '#FFFFFF', paddingTop: 10}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>Recommendations</Text>
                    <View style={{marginTop: 10, height: 250, backgroundColor: '#FFFFFF', width: '100%'}}>
                        {this.recommend()}
                    </View>
                </View>
                    
            </View>
            </ScrollView>
        );
    }
  }