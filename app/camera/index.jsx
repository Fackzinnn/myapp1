import { useState, useRef } from "react";
import { View, StyleSheet, Text, Imagem, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera"

export default function Camera() {
    const [permissao , pedirPermissao] = useCameraPermissions()
    const [foto, setFoto] = useState(null)
    const cameraRef = useRef(null)

    if(!permissao) {
        return <View></View>
    }

    if (!permissao.granted){
        
        return(
    <View style={styles.container}>
        <Text style={styles.textopermissao}>Você precisa permitir o aplicativo acessar sua camera  </Text>
        <Button
        title='pedir permissão'
        onPress={pedirPermissao}/>
        </View>
       )

    }
    return(
        <CameraView style={styles.camera} facing={'back'} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title= 'tirar foto'onPress={tirarFoto}/>
            </View>
        </CameraView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    textopermissao:{
        textAlign: 'Center'
 },       
})