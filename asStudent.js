import React , {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
	StatusBar,
  KeyboardAvoidingView,
  TouchableHighlight,
	ScrollView,
	SafeAreaView,
  Picker,
  Image,
  Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/Octicons';
import firebase from 'firebase';
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';



export default class PasswordInput extends Component {
  onChange = (password, score, { label, labelColor, activeBarColor }) => {
    console.log(password, score, { label, labelColor, activeBarColor });
  }

}

export default class asStudent extends Component {
  UNSAFE_componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyBes0dgEE8268NEKb4vDaECnmwaWUGM1J8",
      authDomain: "hawafildb.firebaseapp.com",
      databaseURL: "https://hawafildb.firebaseio.com",
      projectId: "hawafildb",
      storageBucket: "",
      messagingSenderId: "932110912763",
      appId: "1:932110912763:web:68fca60e805543a655b45e",
      measurementId: "G-G21F8ME7TS"
    };


  }
  state = {
  fullName: '',
  email   : '',
  password: '',
  university:'',
  busNo:'',
  neighborhood:'',
  phoneNo : '',
  currentColor: '#EAEAEA'
  }

  validateNumber = (phoneNo) => {
    //Regex
    const numRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    if (!numRegex.test('0'+this.state.phoneNo)) {
      console.log('number bad');
      console.log('0'+this.state.phoneNo);


      }
      else {
      this.setState({currentColor: '#91b804'})
      }
}//end inserting a bus

  validateEmail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false)
    {
        console.log("Email is Not Correct");
        this.setState({email:text})
r       eturn false;
    }
    else {
        this.setState({email:text})
        console.log("Email is Correct");
        }
}// validating the email address

  addStudent = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then( (data) => {
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
              this.userId = user.uid
              firebase.database().ref('students/'+this.userId).set(
                {
                  name: this.state.fullName,
                  phoneNo: this.state.phoneNo,
                  busNo: this.state.busNo,
                  neighborhood: this.state.neighborhood,
                  university:this.state.university,
                })
            }
          });
    }).then(() => this.props.navigation.navigate('login'))
    //raghad plz edit the above line to the page you wanna navigate to after insertion
    .catch(error => console.log(error.message))
}//end adding a parent



/*
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    }
*/
    static navigationOptions = function(props) {
    return {
      title: 'التسجيل',
      headerLeft: <View style={{paddingLeft:16}}>
         <Icon
             name="chevron-left"
             size={25}
             color='white'
             onPress={() => props.navigation.goBack()} />
     </View>,

     headerTintColor: 'white',
           headerStyle: {
              backgroundColor: "#4C73CC"
           }
    }
    };
    render() {
        return (
                <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
                <View style={styles.smallContainer}>
                <Text style={styles.header}>• ﻛ طالب •</Text>
                <Text style={styles.perInfo}>──── المعلومات الشخصية ────</Text>
                <View style={styles.inputContainer}>



                <TextInput style={styles.inputs}
                placeholder="الاسم"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={(fullName) => this.setState({fullName})}
                value={this.state.fullName}
                />
                </View>

                <View style={styles.inputContainer}>

                <TextInput style={styles.inputs}
                placeholder="البريد الإلكتروني"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})
                this.validateEmail(text)}
                value={this.state.email}
                />
                </View>

                <View style={styles.inputContainer}>
                <View style={styles.container}>
                <RNPasswordStrengthMeter style={styles.inputs}
                placeholder="كلمة المرور"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})
              this.onChange}
              meterType="bar"

                value={this.state.password}
                />
                </View>
                </View>

                <View style={[styles.phoneContainer, {borderColor: this.state.currentColor}]}
                >

                <TextInput style={styles.keyText}
                value="+966"
                editable={false}
                />

                <TextInput style={[styles.phoneInput]}
                placeholder="رقم الجوال"
                keyboardType="numeric"
                const regex = /^5(0|1|2|3|4|5|6|7|8|9)([0-9]{7})$/i;
                ref="phoneNumber"
                underlineColorAndroid='transparent'
                onChangeText={(phoneNo) => this.setState({phoneNo})}
                onEndEditing={(phoneNo) => this.validateNumber(phoneNo)}
                value={this.state.phoneNo}
                />
                </View>


                <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                placeholder="اسم الجامعة"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={(university) => this.setState({university})}
                value={this.state.university}
                />
                </View>


                <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                placeholder="رقم الحافلة"
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                onChangeText={(busNo) => this.setState({busNo})}
                value={this.state.busNo}

                />

                </View>
                <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                placeholder=" الحي السكني"
                keyboardType="TextInput"
                underlineColorAndroid='transparent'
                onChangeText={(neighborhood) => this.setState({neighborhood})}
                  value={this.state.neighborhood}
                />

                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.addStudent}>
                <Text style={styles.signUpText}>تسجيل</Text>
                </TouchableHighlight>

                </View>

                </KeyboardAwareScrollView>
                );
    }
}

  defaultPassword: '',
  containerWrapperStyle: {},
  imageWrapperStyle: {},
  imageStyle: {},
  inputWrapperStyle: {},
  inputStyle: {},
  placeholderStyle: {},
  meterType: 'bar',
  
  inputProps: {
    placeholder: 'Password',
    secureTextEntry: true,
      },

        passwordProps: {
          touched: false,
          scoreLimit: 100,
          variations: {
          digits: /\d/,
          lower: /[a-z]/,
          upper: /[A-Z]/,
          nonWords: /\W/,
                      },

        minLength: 5,
        labelVisible: true,
        levels: [
          {
            label: 'Pathetically weak',
            labelColor: '#ff2900',
            activeBarColor: '#ff2900',
          },
          {
            label: 'Extremely weak',
            labelColor: '#ff3e00',
            activeBarColor: '#ff3e00',
          },
          {
            label: 'Very weak',
            labelColor: '#ff5400',
            activeBarColor: '#ff5400',
          },
          {
            label: 'Weak',
            labelColor: '#ff6900',
            activeBarColor: '#ff6900',
          },
          {
            label: 'So-so',
            labelColor: '#f4d744',
            activeBarColor: '#f4d744',
          },
          {
            label: 'Average',
            labelColor: '#f3d331',
            activeBarColor: '#f3d331',
          },
          {
            label: 'Fair',
            labelColor: '#f2cf1f',
            activeBarColor: '#f2cf1f',
          },
          {
            label: 'Strong',
            labelColor: '#14eb6e',
            activeBarColor: '#14eb6e',
          },
          {
            label: 'Very strong',
            labelColor: '#0af56d',
            activeBarColor: '#0af56d',
          },
          {
            label: 'Unbelievably strong',
            labelColor: '#00ff6b',
            activeBarColor: '#00ff6b',
          },
        ],
        wrapperStyle: {},
        labelStyle: {},
        width: deviceWidth - 20,


        boxContainerStyle: {},
        boxStyle: {},
        boxColor: '#f1f3f4',
        boxSpacing: 2,
}

const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',


                                 backgroundColor: '#F7FAFF',
                                 },

                                 inputContainer: {
                                   borderColor: '#EAEAEA',
                                   backgroundColor: '#FFFFFF',
                                   borderRadius:25,
                                   borderWidth: 1,
                                   width:250,
                                   height:40,
                                   marginBottom:15,
                                   paddingHorizontal:10,

                                 },

                                 smallContainer:{

                                   justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: 'white',
                                  borderRadius:10,
                                    width:300,
                                    height:600
                                 },

                                 header:{
                                 color: "#8197C6",
                                 fontSize: 20 ,//problema
                                 //fontWeight:900,
                                 bottom: 20,
                                 },

                                 perInfo:{
                                 color: "#9F9F9F",
                                 fontSize: 12 ,
                                 //fontWeight:100,
                                 bottom: 30,
                                 marginTop: 20,
                                 marginBottom:20,
                                 },
                                 inputs:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                textAlign:'right',
                                 borderColor: '#EAEAEA',
                                 marginLeft:10,

                                 },
                                 phoneContainer:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:25,
                                 borderWidth: 1,
                                 width:250,
                                 marginBottom:20,
                                 flexDirection: 'row',
                                 //justifyContent:'flex-end',
                                 justifyContent:'space-around',
                                 },

                                 phoneInput:{

                                 height:35,
                                 width:200,

                                 borderColor: '#EAEAEA',

                                 },

                                 keyNo:{
                                 backgroundColor: '#FFFFFF',
                                 borderRadius:30,
                                 borderWidth: 1,
                                 width:30,
                                 height:35,
                                 alignItems:'right',
                                 // marginLeft: 250,


                                 //justifyContent:'flex-end',
                                 //alignItems:'flex-end',
                                 borderColor: '#EAEAEA'
                                 },

                                 keyText:{
                                 flex:1,
                                 height:40,
                                 textAlign:'center',
                                 //marginRight: 30,
                                 //justifyContent:'flex-end',
                                 //marginright:16,
                                 borderColor: '#EAEAEA',
                                 color:'#646464' ,
                                 },

                                 /*inputIcon:{
                                  width:30,
                                  height:30,
                                  marginLeft:15,
                                  justifyContent: 'center'
                                  },*/


                                 inputDown:{
                                 flex:1,
                                 height:40,
                                 //flexDirection:'row-reverse',
                                 //justifyContent:'flex-end',
                                 //marginright:16,

                                 borderColor: '#EAEAEA',

                                 },
                                 MainContainer: {
                                    flex: 1,
                                    justifyContent: 'center',
                                    margin: 20

                                  },
                                 buttonContainer: {
                                 height:45,
                                 flexDirection: 'row',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 top: 20,
                                 width:250,
                                 borderRadius:30,
                                 },

                                 signupButton: {
                                 //backgroundColor: "#FF4DFF",
                                 width: 70,
                                 height:30,
                                 //top: 120,
                                 backgroundColor:"#3C68BF",
                                 //marginBottom: 300,
                                 },

                                 signUpText: {
                                 color: 'white',
                                 }

                                 });
