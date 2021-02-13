import React, { useRef } from 'react';
import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';

import RegisterForm from '../../Componentes/RegisterForm';

export default function Registrar() {

	const toastRef = useRef();

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#128C73' />
			<Image
				source={require('../../../assets/logo.png')}
				style={styles.imglogo}
			/>
			<Text style={styles.textobanner}>Crear Cuenta</Text>
			<RegisterForm toastRef={toastRef} />
			<Toast ref={toastRef} position='center' opacity={0.9} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#128C73'
	},
	imglogo: {
		width: 106,
		height: 106,
		marginTop: 40,
		alignSelf: 'center'
	},
	textobanner: {
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		fontSize: 30,
		color: '#fff',
		alignSelf: 'center'
	}
})
