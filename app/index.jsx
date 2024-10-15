import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';


export default function Page() {
    return (
        <View style={styles.container}>
            <Link href='/calculadora' style={styles.link}>
                <Text style={styles.linkText}>calculeiton</Text>
            </Link>
            <Link href='/camera' style={styles.link}>
                <Text style={styles.linkText}>camera</Text>
            </Link>
            <Link href='/screen' style={styles.link}>
                <Text style={styles.linkText}>screen</Text>
            </Link>
            <Link href='/listatarefas' style={styles.link}>
                <Text style={styles.linkText}>Lista</Text>
            </Link>
            <Link href='/pokemon' style={styles.link}>
                <Text style={styles.linkText}>pokemon</Text>
            </Link>
            <Link href='/memoria' style={styles.link}>
                <Text style={styles.linkText}>Memoria</Text>
            </Link>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    link: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    linkText: {
        color: '#fff',
        fontSize: 18,
    },
});
