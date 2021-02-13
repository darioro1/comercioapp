import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { validaremail } from '../Utils/Utils';
import { isEmpty, size } from 'lodash';
import * as firebase from 'firebase';
import Loading from '../Componentes/Loading';

export default function RegisterForm(props) {

	const { toastRef } = props;
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ repetirpassword, setRepetirpassword ] = useState('');

	const navigation = useNavigation();
	const [ show, setShow ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	function crearcuenta ()
	{
		if (isEmpty(email) || isEmpty(password) || isEmpty(repetirpassword)) {
			toastRef.current.show('Todos los campos son obligatorios');
		} else if (!validaremail(email)) {
			toastRef.current.show('Correo no es válido');
		} else if (password !== repetirpassword) {
			toastRef.current.show('Las contraseñas tienen que ser iguales');
		} else if (size(password) < 6 ) {
			toastRef.current.show('Las contraseñas deben tener al menos 6 caracteres');
		} else {
			setLoading(true);
			
			firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response)=>{
				toastRef.current.show('Se ha creado el usuario correctamente');
				setLoading(false);
			})
			.catch((err)=> {
				setLoading(false);
				toastRef.current.show('Ha ocurrido un error o puede que este usuario esté registrado');
			});
		}
	}

	return (
		<View style={styles.container}>
			<View
				style={{
					borderBottomColor: '#25D366',
					borderBottomWidth: 2,
					width: 100
				}}
			/>
			<Input
				placeholder='Correo'
				containerStyle={styles.input}
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
					name: show ? 'eye-off-outline' : 'eye-outline',
					color: '#128C7E',
					onPress: () => setShow(!show)
				}}
				onChangeText={ (text) => {
					setPassword(text);
				}}
				secureTextEntry={!show}
				value={password}
			/>
			
			<Input
				placeholder='Repetir Contraseña'
				containerStyle={styles.input}
				leftIcon={{
					type: 'material-community',
					name: 'security',
					color: '#128C7E'
				}}
				rightIcon={{
					type: 'material-community',
					name: show ? 'eye-off-outline' : 'eye-outline',
					color: '#128C7E',
					onPress: () => setShow(!show)
				}}
				onChangeText={ (text) => {
					setRepetirpassword(text);
				}}
				secureTextEntry={!show}
				value={repetirpassword}
			/>

			<Button
				title= 'Crear Cuenta'
				containerStyle={styles.btnentrar}
				buttonStyle={{ backgroundColor: '#25D366' }}
				onPress={ () => crearcuenta() }
			/>

			<Button
				title= 'Iniciar Sesión'
				containerStyle={styles.btnentrar}
				buttonStyle={{ backgroundColor: '#128C7E' }}
				onPress={ () => navigation.goBack() }
			/>
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
	}
})
