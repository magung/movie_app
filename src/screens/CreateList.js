import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput, ToastAndroid, RefreshControlBase } from 'react-native';
import {URL, API, SESSION_ID} from '../publics/config'
import Axios from 'axios'
export default class List extends React.Component {
    state = {
        id: false,
        name: '',
        description: ''
        
    }

    async componentDidMount() {
        let id = this.props.route.params.id
        await Axios.get(`${URL}/3/list/${id}?api_key=${API}&language=en-US`)
        .then(res => {
            this.setState({name : res.data.name, description: res.data.description, id : id})

        })
    }

    createList = async () => {
        let name = this.state.name
        let description = this.state.description
        if(name == '' || description == '') {
            return ToastAndroid.show("Name and Description is requered", ToastAndroid.SHORT);
        }else{
            let data = {
                name : name,
                description : description,
                language : "en"
            }
            await Axios.post(`${URL}/3/list?api_key=${API}&session_id=${SESSION_ID}`, data, {headers : {"Content-Type" : "application/json;charset=utf-8"}})
            .then(res => {
                ToastAndroid.show("Success create list", ToastAndroid.SHORT);
                this.props.navigation.navigate("List")
            })

        }
        
    }

    updateList = async () => {
        let name = this.state.name
        let description = this.state.description
        if(name == '' || description == '') {
            return ToastAndroid.show("Name and Description is requered", ToastAndroid.SHORT);
        }else{
            let data = {
                name : name,
                description : description
            }
            await Axios.put(`${URL}/4/list/${this.state.id}`, data, {headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1OTA0OTY4MjQsInN1YiI6IjVlY2NiYTUxMzU4MThmMDAyMmMwM2FjNiIsImp0aSI6IjIwODUzNDIiLCJhdWQiOiIyZWI2ZjdmZTU4YTRiY2U4YzFlYTI3Mjg3ZjkxZTYzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxfQ.s0f-U3Oa3VbcSEWtXmBq1Psd3McIzsPuMugl3HysnSk", "Content-Type" : "application/json;charset=utf-8"}})
            .then(res => {
                ToastAndroid.show("Success update list", ToastAndroid.SHORT);
                this.props.navigation.navigate("List")
            })

        }
        
    }

    buttonCreate = () => {
        return (
            <TouchableOpacity style={{borderColor: '#393534', borderWidth: 2, backgroundColor: '#FFFFFF', height: 35, paddingHorizontal: 20, borderRadius: 20, alignContent: 'center', justifyContent: 'center', elevation: 10}} onPress={() => this.createList()}>
                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#393534'}}>Create</Text>
            </TouchableOpacity>
        )
    }

    buttonEdit = () => {
        return (
            <TouchableOpacity style={{borderColor: '#393534', borderWidth: 2, backgroundColor: '#FFFFFF', height: 35, paddingHorizontal: 20, borderRadius: 20, alignContent: 'center', justifyContent: 'center', elevation: 10, marginBottom: 10}} onPress={() => this.updateList()}>
                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#393534'}}>Update</Text>
            </TouchableOpacity>
        )
    }

    deleteList = async () => {
        await Axios.delete(`${URL}/4/list/${this.state.id}`, {headers : {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1OTA0OTY4MjQsInN1YiI6IjVlY2NiYTUxMzU4MThmMDAyMmMwM2FjNiIsImp0aSI6IjIwODUzNDIiLCJhdWQiOiIyZWI2ZjdmZTU4YTRiY2U4YzFlYTI3Mjg3ZjkxZTYzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCIsImFwaV93cml0ZSJdLCJ2ZXJzaW9uIjoxfQ.s0f-U3Oa3VbcSEWtXmBq1Psd3McIzsPuMugl3HysnSk", "Content-Type" : "application/json;charset=utf-8"}})
        .then(res => {
            console.log(res)
            ToastAndroid.show("Success deleted list", ToastAndroid.SHORT);
            this.props.navigation.navigate("List")
        }).catch(err=> {
            console.log(err)
            ToastAndroid.show("Failed delete", ToastAndroid.SHORT);
        })
    }

    buttonDelete = () => {
        return (
            <TouchableOpacity style={{borderColor: '#393534', borderWidth: 2, backgroundColor: '#FFFFFF', height: 35, paddingHorizontal: 20, borderRadius: 20, alignContent: 'center', justifyContent: 'center', elevation: 10}} onPress={() => this.deleteList()}>
                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#393534'}}>Delete</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                
                <View style={{flexDirection: 'row', width: '100%', backgroundColor: '#FFFFFF', height: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 20}}>
                    <Text style={{fontSize: 25, fontWeight:'bold'}}>{this.state.id ? "Edit List" : "Create New List"}</Text>
                </View>
                <TextInput
                    style={{width: "90%", backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 15, height: 40, justifyContent: 'center', fontSize: 15, elevation: 10, marginBottom: 10}}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="enter name list..."
                    selectionColor="#fff"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name})}
                />
                <TextInput
                    style={{width: "90%", backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 15, minHeight: 40, justifyContent: 'center', fontSize: 15, elevation: 10, marginBottom: 10}}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="enter description list..."
                    selectionColor="#fff"
                    multiline={true}
                    value={this.state.description}
                    onChangeText={(description) => this.setState({description})}
                />
                {this.state.id ? this.buttonEdit() : this.buttonCreate()}
                {this.state.id ? this.buttonDelete() : null}
            </View>
        );
    }
}