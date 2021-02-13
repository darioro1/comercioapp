import React from 'react';
import { View, Text } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import Constants from 'expo-constants';

export default function FirebaseRecapcha(props) {

	const { referencia } = props;

	return (
		<FirebaseRecaptchaVerifierModal
			ref={referencia}
			title='Confirma que no eres un robot'
			cancelLabel='x'
			firebaseConfig={Constants.manifest.extra.firebase}
		/>
	)
}
