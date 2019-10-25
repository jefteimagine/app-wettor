import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#0a0e60',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    header:{
      paddingVertical: 20,
      backgroundColor:'#999999',
      alignItems: 'center',
      borderBottomColor:'#ee8034',
      borderBottomWidth:2,
    },
    header_logo:{
      height: 100,
      resizeMode: 'contain',
    }
});