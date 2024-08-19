import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';


const App = () => {
  const [number, onChangeText] = React.useState('')
  const [number2, onChangeText2] = React.useState('')
  const [resultado, setResultado] = React.useState('')


  const soma = function() {
    setResultado(Number(number) + Number(number2))
    return number
  }
  const subtração = function() {
    setResultado(Number(number) - Number(number2))
    return number
  }
  const multiplicação = function() {
    setResultado(Number(number) * Number(number2))
    return number
  }
  const divisão = function() {
    setResultado(Number(number) / Number(number2))
    return number
  }
 


  return (
    <View style={styles.container}>
      <Text>CALCULADORA </Text>


      <TextInput
        onChangeText={onChangeText}
        value={number}
        placeholder='Insira o primeiro número aqui'
        keyboardType='numeric'
      />
      <TextInput
        onChangeText={onChangeText2}
        value={number2}
        placeholder='Insira o segundo número aqui'
        keyboardType='numeric'
      />


      <Button
        title='+'
        onPress={() => soma()}
      />
      <Button
        title='-'
        onPress={() => subtração()}
      />
      <Button
        title='*'
        onPress={() => multiplicação()}
      />
      <Button
        title=':'
        onPress={() => divisão()}
      />
     
      <Text>o valor é {resultado} </Text>


    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


export default App;