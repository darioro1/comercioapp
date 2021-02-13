import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, Input, Button, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { validaremail } from '../Utils/Utils';
import { isEmpty } from 'lodash';
import { validarsesion, cerrarsesion } from '../Utils/Acciones';
import Loading from '../Componentes/Loading';
import * as firebase from 'firebase';

export default function LoginForm(props) {

	const { toastRef } = props;
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ show, setShow ] = useState(true);
	const [ loading, setLoading ] = useState(false);

	const navigation = useNavigation();

	const iniciarsesion = async () => {
		if(isEmpty(email) || isEmpty(password)){
			toastRef.current.show('Debe ingresar los valores de email y password');
		} else if (!validaremail(email)) {
			toastRef.current.show('Ingrese un correo válido');
		} else {
			setLoading(true);

			await firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response)=>{
				setLoading(false);
				toastRef.current.show('Ha iniciado sesión exitosamente');
				console.log(firebase.auth().currentUser);
			})
			.catch((err)=>{
				setLoading(false);
				toastRef.current.show('Ha ocurrido un error al iniciar sesión');
			});
		}
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					borderBottomColor: '#25D366',
					borderBottomWidth: 2,
					width: 100
				}}
			/>
			<Input placeholder='Correo' containerStyle={styles.input}
				rightIcon={{
					type: 'material-community',
					name: 'at',
					color: '#128C7E'
				}}
				leftIcon={{
					type: 'material-community',
					name: 'account-circle-outline',
					color: '#128C7E'
				}}
				onChangeText={ (text) => {
					setEmail(text);
				}}
				value={email}
			/>
			<Input
				placeholder='Contraseña'
				containerStyle={styles.input}
				leftIcon={{
					type: 'material-community',
					name: 'security',
					color: '#128C7E'
				}}
				rightIcon={{
					type: 'material-community',
					name: show ? 'eye-outline' : 'eye-off-outline',
					color: '#128C7E',
					onPress: () => setShow(!show)
				}}
				onChangeText={ (text) => {
					setPassword(text);
				}}
				secureTextEntry={show}
				value={password}
			/>
			<Button
				title= 'Entrar'
				containerStyle={styles.btnentrar}
				buttonStyle={{ backgroundColor: '#25D366' }}
				onPress={ () => iniciarsesion() }
			/>
			<Text style={styles.txtcrearcuenta}>¿No tienes cuenta?
				<Text 
					style={styles.cuenta}
					onPress={ () => navigation.navigate('register') }
			> Crear Cuenta
			</Text>
			</Text>
			<Divider style={{ backgroundColor: '#128C7E', height: 1, width: '90%', marginTop: 20 }} />
			<Text style={styles.txto}>O</Text>

			<View style={styles.btnlogin}>
				<TouchableOpacity style={styles.btnloginsocial}>
					<Icon
						size={24}
						type='material-community'
						name='google'
						color='#fff'
						backgroundColor='transparent'
					/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnloginsocial}>
					<Icon
						size={24}
						type='material-community'
						name='facebook'
						color='#fff'
						backgroundColor='transparent'
					/>
					</TouchableOpacity>
			</View>
			<Loading isVisible={loading} text='Por favor espere' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5F6F8',
		flex: 1,
		marginTop: 20,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		alignItems: 'center',
		paddingTop: 20
	},
	input: {
		width: '90%',
		marginTop: 20,
		height: 50
	},
	btnentrar: {
		width: '90%',
		marginTop: 20
	},
	txtcrearcuenta: {
		marginTop: 20
	},
	cuenta: {
		color: '#128c7e',
		fontFamily: 'Roboto',
		fontSize: 15
	},
	txto: {
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: 20,
		color: '#128c7e'
	},
	btnlogin: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	btnloginsocial: {
		backgroundColor: '#25d366',
		paddingHorizontal: 40,
		paddingVertical: 10,
		borderRadius: 5
	}
})
