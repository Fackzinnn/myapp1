import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 15,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default function Pokemon() {
  const [pokemon, setPokemon] = useState('');
  const [Type, setType] = useState('');
  const [lista_pokemons, setListaPokemons] = useState([]);
  const [Type_pokemons, setTypePokemons] = useState([]);
  const [pokemonFiltrado, setPokemonFiltrado] = useState([]);
  const [sprite, setSprite] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then((resposta) => resposta.json())
      .then((dados) => setListaPokemons(dados.results))
      .catch(() => console.log('Aconteceu um erro ao buscar os pokémons.'));
  }, []);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type?limit=2000')
      .then((resposta) => resposta.json())
      .then((dados) => setTypePokemons(dados.results))
      .catch(() => console.log('Aconteceu um erro ao buscar os tipos.'));
  }, []);

  useEffect(() => {
    if (Type) {
      fetch(`https://pokeapi.co/api/v2/type/${Type}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          const pokemonsFiltrados = dados.pokemon.map((p) => p.pokemon);
          setPokemonFiltrado(pokemonsFiltrados);
        })
        .catch(() => console.log('Ocorreu um erro ao buscar os pokémons por tipo.'));
    } else {
      setPokemonFiltrado(lista_pokemons);
    }
  }, [Type, lista_pokemons]);

  useEffect(() => {
    if (pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resposta) => resposta.json())
        .then((dados) => setSprite(dados.sprites.front_default))
        .catch(() => console.log('Ocorreu um erro ao buscar a sprite do pokémon.'));
    } else {
      setSprite('');
    }
  }, [pokemon]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pokédex</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.text}>Tipos:</Text>
        <Picker
          selectedValue={Type}
          style={styles.picker}
          onValueChange={(item) => setType(item)}
        >
          <Picker.Item label="Selecione um tipo" value="" />
          {Type_pokemons.map((item, index) => (
            <Picker.Item key={index} label={item.name} value={item.name} />
          ))}
        </Picker>
      </View>
      {Type ? (
        <View>
          <Text style={styles.text}>Você selecionou {Type}</Text>
          <View style={styles.pickerContainer}>
            <Text style={styles.text}>Pokémons</Text>
            <Picker
              selectedValue={pokemon}
              style={styles.picker}
              onValueChange={(item) => setPokemon(item)}
            >
              <Picker.Item label="Selecione um Pokémon" value="" />
              {pokemonFiltrado.map((item, index) => (
                <Picker.Item key={index} label={item.name} value={item.name} />
              ))}
            </Picker>
          </View>
          {pokemon ? <Text style={styles.text}>Você selecionou {pokemon}</Text> : null}
          {sprite ? <Image source={{ uri: sprite }} style={styles.pokemonImage} /> : null}
        </View>
      ) : null}
    </View>
  );
}
