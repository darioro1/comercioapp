import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from './src/Componentes/Loading';
import RutasNoAutenticadas from './src/Navegacion/RutasNoAutenticadas';
import SwitchNavigator from './src/Navegacion/SwitchNavigator';
import { validarsesion } from './src/Utils/Acciones';
import { encode, decode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App() {

  const [ user, setUser ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    validarsesion(setUser);
    setLoading(false);
  }, []);

    if (loading) {
      return <Loading isVisible={loading} text='Cargando...' />;
    }
    return user ? <SwitchNavigator /> : <RutasNoAutenticadas />;

  return (
    <RutasNoAutenticadas />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
