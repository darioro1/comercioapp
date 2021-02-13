import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, Alert, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import FirebaseRecapcha from '../../Utils/FirebaseRecapcha';
import { enviarautenticacionphone } from '../../Utils/Acciones';

export default function EnviarConfirmacion() {

	const [ country, setCountry ] = useState('AR');
	const [ callingCode, setCallingCode ] = useState('54');
	const [ phone, setPhone ] = useState('');

	const recaptchaVerifier = useRef();
	const inputphone = useRef();

	const navigation = useNavigation();

	const enviarconfirmacion = async () =>
	{
		if (!isEmpty(phone)) {
			const numero = `+${callingCode}${phone}`;
			const verificationid = await enviarautenticacionphone(
				numero,
				recaptchaVerifier
			);
		if (!isEmpty(verificationid)) {
			navigation.navigate('confirmar-movil', { verificationid });
		} else {
			Alert.alert(
				"Verificación",
				"Por favor introduzca un número de teléfono válido",
				[{
					style: 'cancel',
					text: 'Entendido',
					onPress: () =>{
						inputphone.current.clear();
						inputphone.current.focus();
					},
				},
			]
			);
		}
			
		}
	}

	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/logo.png')}
				style={styles.imglogo}
			/>
			<View style={styles.panel}>
				<View
					style={{
						borderBottomColor: '#25d366',
						borderBottomWidth: 2,
						width: 100
					}}
				/>
				<View style={styles.panelinterno}>
					<Icon
						name='whatsapp'
						type='material-community'
						size={100}
						color='#25D366'
					/>
					<Text style={styles.titulo}>Por favor ingresa tu número de Whatsapp</Text>
					<View style={styles.viewtelefono}>
						<CountryPicker
							withFlag
							withCallingCode
							withFilter
							withCallingCodeButton
							countryCode={country}
							onSelect={(Country) => {
								setCountry(Country.cca2);
								setCallingCode(...Country.callingCode);
							}}
						/>
						<Text style={{ color: '#fff' }}> | </Text>
						<TextInput
							placeholder='Número de Whatsapp'
							style={styles.input}
							placeholderTextColor='#fff'
							onChangeText={ (text) => setPhone(text) }
							value={phone}
							ref={inputphone}
						/>
					</View>
					<Button
						title='Confirmar Número'
						buttonStyle={{ backgroundColor: '#25d366', marginHorizontal: 20 }}
						containerStyle={{ marginVertical: 20 }}
						onPress={ () => enviarconfirmacion() }
					/>
				</View>				 
			</View>
			<FirebaseRecapcha
				referencia={recaptchaVerifier}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#128C7E'
	},
	imglogo: {
		width: 106,
		height: 106,
		alignSelf: 'center',
		marginVertical: 40
	},
	panel: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 20,
		borderTopRightRadius: 50,
		borderTopLeftRadius: 50,
		alignItems: 'center'
	},
	panelinterno: {
		flex: 1,
		justifyContent: 'space-around',
		marginHorizontal: 20
	},
	titulo: {
		fontSize: 16,
		textAlign: 'center',
		color: '#25d366',
		fontWeight: 'bold'
	},
	viewtelefono: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		height: 50,
		marginHorizontal: 20,
		paddingHorizontal: 20,
		backgroundColor: 'rgba(37, 211, 106, 0.6)'
	},
	input: {
		width: '80%',
		height: 50,
		marginLeft: 5
	}
})
