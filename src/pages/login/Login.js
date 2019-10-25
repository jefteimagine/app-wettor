import React, {useState, useEffect} from 'react';
import { 
  KeyboardAvoidingView,
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity ,
  TextInput,
  Platform,
} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../services/api';

import Header from '../../components/header';

import GlobalStyles from '../../constants/GlobalStyles';

export default function Login({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);

  loginSubmit = async () => {
    setSpinner(true);
    const notification = await getNotification();
    console.log(notification);
    const response = await api.post('/session', {
      login,
      password,
      notification
    });
    if(response.data.error){
      setSpinner(false);
      alert(response.data.error);
    }else if(response.data.token){
      const { token } = response.data;
      await AsyncStorage.setItem('userToken', token);
      navigation.navigate('Dashboard');
    }
  }
  
  getNotification = async() =>{
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      return token;
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  checkLogin = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    if(userToken) navigation.navigate('Dashboard');
  }

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Spinner
        visible={spinner}
        textContent={''}
        textStyle={styles.spinner}
      />
      <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
        <Header handleIndex={() => navigation.navigate('Index')} />
        <View style={styles.conteudo}>
          <TextInput
            style={styles.input}
            placeholder="Informe seu CNPJ/CPF"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            value={login}
            onChangeText={setLogin}
          />

          <TextInput
            style={styles.input}
            placeholder="Informe sua senha"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="none"
            autoCompleteType="password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={loginSubmit}
            style={styles.button}
          >
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.link}>
            <TouchableOpacity>
              <Text style={styles.textLink}>Primeiro acesso</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.textLink}>Esqueceu senha</Text>
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  conteudo: {
    flex: 1,
    backgroundColor: '#0a0e60',
    alignItems: 'center',
    paddingTop: 30,
  },
  spinner: {
    color: '#FFF'
  },
  input: {
    color:'#333',
    backgroundColor:'#fff',
    width:280,
    height:45,
    marginTop:30,
    paddingHorizontal: 5,
  },
  button:{
    backgroundColor:'#eb8034',
    paddingVertical:15,
    width:160,
    marginTop:30,
    alignItems:'center'
  },
  textButton:{
    color:'#fff',
    fontWeight:'bold'
  },
  link:{
    justifyContent:'space-between',
    marginTop:40,
    width: 280,
    flexDirection:'row',
  },
  textLink:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:14
  }
}); 
