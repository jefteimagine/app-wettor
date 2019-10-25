import React,{ useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';

import Header from '../../components/header';

import GlobalStyles from '../../constants/GlobalStyles';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Processos({ navigation }) {
  
	handleSouCliente = () => navigation.navigate('Login');
  
  handleVisitante = () => navigation.navigate('Visitante');
  
  useEffect(() => {
    loadProcessos();
  }, []);

  
  handleDeslogar = async () =>  {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Index');
  }
 
  loadProcessos = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if(!userToken) return handleDeslogar();
  }
  return (
    <>
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Header handleIndex={() => navigation.navigate('Index')} />
      <View style={styles.conteudo}>
        <TouchableOpacity onPress={handleDeslogar} style={styles.button}>
          <Text style={styles.textButton}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  conteudo:{
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 30,
  },
  cell:{
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
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
}); 
