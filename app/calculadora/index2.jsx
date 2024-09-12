import React, {useState} from "react"
import { View, StyleSheet, Pressable } from "react-native"

export default function App() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    
  
    const handlePress = (value) => {
      setInput(input + value);
    };
  
    const calculate = () => {
      try {
        setResult(eval(input).toString());
      } catch (e) {
        setResult('Erro');
      }
    };
  
    const clear = () => {
      setInput('');
      setResult('');
    };
  
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} value={input} editable={false} />
        <Text style={styles.result}>{result}</Text>
        <View style={styles.buttons}>
          {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '.', '=', '/'].map((value) => (
            <Button key={value} title={value} onPress={() => (value === '=' ? calculate() : handlePress(value))} />
          ))}
          <Button title="C" onPress={clear} />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    input: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      textAlign: 'right',
      paddingRight: 10,
    },
    result: {
      height: 40,
      width: '80%',
      textAlign: 'right',
      paddingRight: 10,
      fontSize: 24,
      marginBottom: 20,
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  });