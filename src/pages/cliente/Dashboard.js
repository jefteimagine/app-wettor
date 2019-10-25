import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, AsyncStorage, TouchableOpacity, Image } from 'react-native';

import Header from '../../components/header';

import GlobalStyles from '../../constants/GlobalStyles';

import api from '../../services/api';
import icn1 from '../../assets/icn-search.png';
import icn2 from '../../assets/icn-envelope.png';

export default function Dashboard({ navigation }) {
   const [nome, setNome] = useState('');

  useEffect(() => {
    checkIsLogin();
  }, []);

  async function checkIsLogin(){
    const userToken = await AsyncStorage.getItem('userToken');
    if(!userToken) return handleDeslogar();
    const response = await api.get('/getinfo', { headers: { Jwtoken: userToken } });
    if(!response.data.id) return handleDeslogar();
    setNome(response.data.nome);
  }

  handleRemover = async () =>  {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Index');
  }
  
  handleProcessos = async () =>  {
    navigation.navigate('Processos');
  }

  handleContato = async () => {
    navigation.navigate('Index');    
  }
  
  handleDeslogar = async () =>  {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Index');
  }

  return (
    <>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Header handleIndex={() => navigation.navigate('Index')} />
        <View style={styles.conteudo}>
            <Text style={styles.nome}>Olá, { nome }</Text>
            <TouchableOpacity style={styles.botoes} onPress={handleProcessos}>
              <View style={styles.botoesImagens}>
                <Image style={styles.icn1} source={icn1} />
              </View>
              <View style={styles.botoesTexto}>
                <Text style={styles.botoesTexto1}>RASTREAR PROCESSO(S)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botoes} onPress={handleContato}>
              <View style={styles.botoesImagens}>
                <Image style={styles.icn2} source={icn2} />
              </View>
              <View style={styles.botoesTexto}>
                <Text style={styles.botoesTexto1}>ENTRAR EM CONTATO</Text>
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
  nome:{
    color:'#fff',
    fontSize:16,
    marginTop: 20,
    paddingHorizontal: 15,
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
    fontSize: 15,
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
