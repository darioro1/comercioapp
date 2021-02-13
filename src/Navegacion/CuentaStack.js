import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ConfirmarNumero from '../Pantallas/Cuenta/ConfirmarNumero';
import EnviarConfirmacion from '../Pantallas/Cuenta/EnviarConfirmacion';

const Stack = createStackNavigator();

export default function CuentaStack()
{
	return(
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					component={EnviarConfirmacion}
					name="enviar-confirmacion"
					options={{
						title: "Confirma tu número de teléfono",
						headerStyle: { backgroundColor: "#128C7E" },
						headerTintColor: "#fff"
					}}
				/>

				<Stack.Screen
					component={ConfirmarNumero}
					name="confirmar-movil"
					options={{
						title: "Confirmar Número",
						headerStyle: { backgroundColor: "#128C7E" },
						headerTintColor: "#fff"
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}