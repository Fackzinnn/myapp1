import { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library"; 
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Linking } from 'react-native';

export default function Camera() {
    const [permissao, pedirPermissao] = useCameraPermissions();
    const [foto, setFoto] = useState(null);
    const cameraRef = useRef(null);
    const [ladoCamera, setLadoCamera] = useState('back');
    const [permissaoSalvar, pedirPermissaoSalvar] = MediaLibrary.usePermissions();
    const [scanear, setScanear] = useState(false);

    if (!permissao) {
        return <View />;
    }

    if (!permissao.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.textopermissao}>Você precisa permitir o aplicativo acessar sua câmera</Text>
                <Button title="pedir permissão" onPress={pedirPermissao} />
            </View>
        );
    }

    const tirarFoto = async () => {
        const foto = await cameraRef.current?.takePictureAsync({
            quality: 0.5,
            base64: true,
        });
        setFoto(foto);
        console.log(foto);
    };

    const inverterLadoCamera = () => {
        setLadoCamera(ladoCamera === 'back' ? 'front' : 'back');
    };

    const salvarFoto = async () => {
        if (permissaoSalvar.status !== 'granted') {
            await pedirPermissaoSalvar();
        }
        if (foto && foto.uri) {
            await MediaLibrary.saveToLibraryAsync(foto.uri);
            setFoto(null);
        }
    };

    const descartarFoto = () => {
        setFoto(null);
    };

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanear(false);
        const supported = await Linking.canOpenURL(data);
        if (supported) {
            await Linking.openURL(data);
        } else {
            Alert.alert("Não foi possível abrir o link.");
        }
    };

    return (
        <View style={styles.container}>
            {foto ? (
                <View style={styles.previewContainer}>
                    <Image style={styles.image} source={{ uri: foto.uri }} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title='Descartar' onPress={descartarFoto} color="#000000" />
                        </View>
                        <View style={styles.button}>
                            <Button title='Salvar' onPress={salvarFoto} color="#000000" />
                        </View>
                    </View>
                </View>
            ) : scanear ? (
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            ) : (
                <CameraView style={styles.camera} facing={ladoCamera} ref={cameraRef}>
                    <View style={styles.botaosalvar}>
                        <View style={styles.button}>
                            <Button title="Tirar Foto" onPress={tirarFoto} color="#000000" />
                        </View>
                        <View style={styles.button}>
                            <Button title="Trocar Lado" onPress={inverterLadoCamera} color="#000000" />
                        </View>
                        <View style={styles.button}>
                            <Button title="Escanear Código" onPress={() => setScanear(true)} color="#000000" />
                        </View>
                    </View>
                </CameraView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff', 
    },
    textopermissao: {
        textAlign: 'center',
        margin: 20,
        fontSize: 18,
        color: '#000000', 
    },
    camera: {
        flex: 1,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: '100%',
    },
    botaosalvar: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#e0e0e0', 
        marginHorizontal: 10,
        width: 120,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
