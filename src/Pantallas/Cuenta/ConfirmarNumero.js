import React, { useState, useRef } from 'react';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import CodeInput from 'react-native-code-input';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../Componentes/Loading';
import { confirmarcodigo, obtenerToken, ObtenerUsuario, addRegistroEspecifico } from '../../Utils/Acciones';

export default function ConfirmarNumero(props) {

	const { route } = props;
	const { verificationid } = route.params;
	
	const [ loading, setLoading ] = useState(false);

	const confirmarCodigoSMS = async (code) => {

		setLoading(true);

		const resultado = await confirmarcodigo(verificationid, code);

		if (resultado) {

		const token = await obtenerToken();
		const { uid, displayName, photoURL, email, phoneNumber } =  ObtenerUsuario();

		const registro = await addRegistroEspecifico('Usuarios', uid, {
			token,
			displayName,
			photoURL,
			email,
			phoneNumber,
			fechacreacion: new Date()
		});
		setLoading(false);
	} else {
		Alert.alert(
			'Error',
			'Por favor validar el código introducido', [
				{
					style: 'default',
					text: 'Entendido'
				},
			]);
			setLoading(false);
	}		
		// Va a obtener el token móvil - pushnotification
	};
	
	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/logo.png')}
				style={styles.imglogo}
			/>
			<Text style={styles.titulo}>Por favor revise su sms e introduzca los códigos de confirmación</Text>
			<CodeInput
				activeColor='#fff'
				inactiveColor='#fff'
				autoFocus={true}
				inputPosition='center'
				size={50}
				codeLength={6}
				containerStyle={{ marginTop: 30 }}
				codeInputStyle={{ borderWidth: 1.5 }}
				onFulfill={ (code) => {
					confirmarCodigoSMS(code);
				}}
				secureTextEntry
			/>
			<Loading isVisible={loading} text='Por favor espere' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#128c7e',
		paddingHorizontal: 20
	},
	imglogo: {
		width: 106,
		height: 106,
		alignSelf: 'center',
		marginTop: 20
	},
	titulo: {
		fontSize: 20,
		textAlign: 'center',
		color: '#fff',
		marginVertical: 20	
	}
})