import React, {useState, useMemo, useRef} from 'react';
import {View, TextInput, Text, Linking, StyleSheet, ImageBackground, Pressable, Image} from 'react-native';

export default function App() {
  
  const [ddd, setDdd]               = useState('');
  const refDdd                      = useRef('');

  const [numero, setNumero]         = useState('');
  const refNumero                   = useRef('');
  
  const [mensagem, setMensagem]     = useState('');
  const refMensagem                 = useRef('');
  
  const [validado, setValidado]     = useState(false);
  const anexoLogo                   = require('./src/img/logo.png');
  
  async function startChat(){
    await Linking.openURL(`whatsapp://send?phone=55${ddd}${numero}&text=${mensagem}`);
    limpaCampos();
  }

  function limpaCampos(){
    setDdd('');
    setNumero('');
    setMensagem('');
  }
  
  const validaNumero = useMemo(
    () => {
      if(ddd.length+numero.length == 11){
        setValidado(true);
      } else {
        setValidado(false);
      }
    },[ddd, numero]);

  return(
    <ImageBackground
    style={styles.containerBackground}
    source={require('./src/img/background.png')}
    >

      <View style={styles.container}>
        
        <View style={styles.containerLogo}> 
          <Image
          source={anexoLogo}
          style={styles.containerLogo__image}
          />
        </View>
        
        <View style={styles.containerTelephone}>

          <View style={styles.containerTelephone__ddd}>
            <Text style={styles.label}>*DDD:</Text>        
            <TextInput
            value={ddd}
            style={[styles.input, {fontWeight: '700'}]}
            placeholder='DDD...'
            placeholderTextColor={colors.input.placeholder}
            keyboardType='numeric'
            maxLength={2}
            ref={refDdd}
            onChangeText={
              (ddd) => {  
                setDdd(ddd);
                validaNumero;
                (ddd.length >= 2) ? refNumero.current.focus() : false;
               }
              }
            />
          </View>
          
          <View style={styles.containerTelephone__telephone}>
            <Text style={styles.label}>*TELEFONE:</Text>
            <TextInput
            value={numero}
            style={[styles.input, {fontWeight: '700'}]}
            placeholder='Telefone...'
            placeholderTextColor={colors.input.placeholder}
            keyboardType='numeric'
            maxLength={9}
            ref={refNumero}            
            onChangeText={
              (numero) => {
                setNumero(numero);
                validaNumero;
                (numero.length == 9) ? refMensagem.current.focus() : false;
              }}
            />
          </View>

        </View>
                
        <View style={styles.containerMessage}>
          <Text style={styles.label}>MENSAGEM:</Text>
          <TextInput
          value={mensagem}
          style={[styles.input, styles.containerMessage__message]}
          placeholder="Digite uma mensagem..."
          placeholderTextColor={colors.input.placeholder}
          value={mensagem}
          multiline={true}
          onChangeText={(mensagem)=>setMensagem(mensagem)}
          ref={refMensagem}
          />
        </View>
                
        <View style={styles.containerCreate}>
          <Pressable
          disabled={(validado) ? false : true}
          style={[
            styles.containerCreate__button, 
            (validado) ? {backgroundColor: colors.button.backgroundColor.activated} : {backgroundColor: colors.button.backgroundColor.inactive}
          ]}
          onPress={()=>startChat()}>
            <Text style={styles.containerCreate__button__text}>
              CHAMAR NO WHATSAPP
            </Text>
          </Pressable>
        </View>
                
      </View>

    </ImageBackground>
  );
}

const colors = {
  background: '#FFFFFF',
  button: {
    backgroundColor: {
      activated: '#DA8DF4',
      inactive: '#F0D8F8'
    },
    fontColor: '#ffffff'
  }, 
  fontColor: '#2E2E2E',
  input: {
    backgroundColor: '#FFFFFF',
    placeholder: '#9D9D9D'
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -60,
    padding: 10
  },
  input:{
    height: 45,
    backgroundColor: colors.input.backgroundColor,
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    color: colors.fontColor
  },
  label:{
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.fontColor
  },
  containerBackground: {
    flex: 1,
    backgroundColor: colors.background,
    resizeMode:'cover'
  },
  containerLogo: {
    width: 281, 
    height: 86,
    marginBottom: 25
  },
  containerLogo__image: {
    flex: 1, 
    resizeMode: 'cover', 
    width: 281, 
    height: 81
  },
  containerTelephone: {
    flexDirection: 'row',
    marginBottom: 8
  },
  containerTelephone__ddd: {
    width: '20%', 
    paddingRight: 8
  },
  containerTelephone__telephone: {
    width: '80%'
  },
  containerMessage: {
    width: '100%',
    marginBottom: 8
  },
  containerMessage__message: {
    height: 100, 
    width: '100%', 
    textAlign: 'left', 
    textAlignVertical:'top',
    fontWeight: '600'
  },
  containerCreate: {
    width: '100%'
  },
  containerCreate__button: {
    height: 50,
    backgroundColor: colors.button.backgroundColor.activated,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerCreate__button__text: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'white'
  }
});
