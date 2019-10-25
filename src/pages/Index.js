import React,{ useEffect } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';

import Header from '../components/header';

import icn1 from '../assets/icn1.png';
import icn2 from '../assets/icn2.png';
import GlobalStyles from '../constants/GlobalStyles';

export default function Index({ navigation }) {
  
	handleSouCliente = () => navigation.navigate('Login');
  
  handleVisitante = () => navigation.navigate('Visitante');
  
  useEffect(() => {
    checkLogin();
  }, []);

  checkLogin = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken) navigation.navigate('Dashboard');
  }
    return (
      <>
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <Header handleIndex={() => navigation.navigate('Index')} />
          <View style={styles.conteudo}>
            <TouchableOpacity style={styles.botoes} onPress={handleSouCliente}>
              <View style={styles.botoesImagens}>
                <Image style={styles.icn1} source={icn1} />
              </View>
              <View style={styles.botoesTexto}>
                <Text style={styles.botoesTexto1}>SOU CLIENTE</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botoes} onPress={handleVisitante}>
              <View style={styles.botoesImagens}>
                <Image style={styles.icn2} source={icn2} />
              </View>
              <View style={styles.botoesTexto}>
                <Text style={styles.botoesTexto1}>VISITANTE</Text>
                <Text style={styles.botoesTexto2}>RASTREIE SEU PROCESSO</Text>
              </View>
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
  botoes:{
    backgroundColor:'#052a7c',
    borderColor:'#022d51',
    marginTop: 30,
    borderWidth:2,
    height:80,
    width:280,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  botoesTexto1:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  botoesTexto2:{
    color: '#fff',
    fontSize: 12,
  },
  botoesImagens:{
    width: 80,
    alignItems: 'center',
  },
  botoesTexto:{
    width: 180,
    alignItems: 'center',
  },
  icn1:{    
    resizeMode: 'contain',
    width:50,
  },
  icn2:{    
    resizeMode: 'contain',
    width:50,
  }
}); 
