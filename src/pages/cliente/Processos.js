import React,{ useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';

import Header from '../../components/header';

import GlobalStyles from '../../constants/GlobalStyles';

export default function Processos({ navigation }) {
  
	handleSouCliente = () => navigation.navigate('Login');
  
  handleVisitante = () => navigation.navigate('Visitante');
  
  useEffect(() => {
    loadProcessos();
  }, []);

 
  loadProcessos = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if(!userToken) return handleDeslogar();
  }
  return (
    <>
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Header handleIndex={() => navigation.navigate('Index')} />
      <View style={styles.conteudo}>
        <Text>Teste Processos</Text>
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
  }
}); 
