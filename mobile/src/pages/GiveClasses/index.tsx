import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import GiveClassesBgImage from '../../assets/images/give-classes-background.png';

// import LandingImg from '../../assets/images/landing.png';
// import StudyIcon from '../../assets/images/icons/study.png';
// import GiveClassesIcon from '../../assets/images/icons/give-classes.png';
// import HeartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={GiveClassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>

        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>
      </ImageBackground>
      <RectButton onPress={goBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses;
