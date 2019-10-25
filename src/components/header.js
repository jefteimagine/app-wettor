import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import logo from '../assets/logo.png';
import GlobalStyles from '../constants/GlobalStyles';

export default function header({ handleIndex }){
    return (
        <LinearGradient 
          colors={['#999999', '#ffffff', '#999999']} 
          start={[0,1]}
          end={[1,0]}
          style={GlobalStyles.header}>
          <TouchableWithoutFeedback onPress={handleIndex} >
            <Image 
                style={GlobalStyles.header_logo} 
                source={logo} 
                fadeDuration={0} 
                progressiveRenderingEnabled={false}
            />
          </TouchableWithoutFeedback>
        </LinearGradient>

    )
}