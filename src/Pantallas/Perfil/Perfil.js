import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { Icon, Avatar, Input } from 'react-native-elements';
import { cargarImagenesxAspecto } from '../../Utils/Utils';
import { subirImagenesBatch } from '../../Utils/Acciones';

export default function Perfil() {
	return (
		<View>
			<StatusBar backgroundColor='#128c7e' />
			<CabeceraBG />
			<HeaderAvatar />
		</View>
	)
}

function CabeceraBG()
{
	return (
		<View>
			<View style={styles.bg}>
				<Text style={styles.nombre}>
					Nombre
				</Text>
			</View>
		</View>
	)
}

function HeaderAvatar (props)
{
	const cambiarfoto = async () => {

		const resultado = await cargarImagenesxAspecto([1, 1]);
		console.log(resultado);
		const url = await subirImagenesBatch(resultado.imagen, "Perfil");
		console.log(url);		
	};

	return (
		<View style={styles.avatarinline}>
			<Avatar
				source={require('../../../assets/avatar.jpg')}
				style={styles.avatar}
				size='large'
				rounded
				showAccessory={true}
				onAccessoryPress={cambiarfoto}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	bg: {
		width: '100%',
		height: 200,
		borderBottomLeftRadius: 200,
		borderBottomRightRadius: 200,
		backgroundColor: '#128C7E',
		justifyContent: 'center',
		alignItems: 'center'
	},
	nombre: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold'
	},
	avatarinline: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: -70
	},
	avatar: {
		width: 80,
		height: 80,		
	}
})
