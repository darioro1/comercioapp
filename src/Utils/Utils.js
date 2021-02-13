import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export const validaremail = (text) => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (reg.test(text) === false) {
		return false;
	} else {
		return true;
	}
};

// export const cargarImagenesxAspecto = async (array) => {

// 	let imgResponse = { status: false, imagen: '' };

// 	const resulPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
// 	const cameraPermissions = resulPermissions.permissions.cameraRoll.status;

// 	if (cameraPermissions === 'denied') {
// 		alert('Usted debe permitir el acceso para cargar las imágenes')
// 	} else {
// 		const result = await ImagePicker.launchImageLibraryAsync({
// 			allowsEditing: true,
// 			aspect: array
// 		});

// 		if (!result.cancelled) {
// 			imgResponse = { status: true, imagen: result.uri };
// 		}
// 	}
// 	return imgResponse;
// };

export const cargarImagenesxAspecto = async (array) => {
	
	let imgResponse = { status: false, imagen: "" };
	
	const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

		if (status === "denied") {
			alert("Usted debe permitir el accesos para cargar las imagenes");
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: array,
			});
			if (!result.cancelled) {
				imgResponse = { status: true, imagen: result.uri };
			}
		}
			return imgResponse;
		};

		export const convertirFicheroBlob = async (rutafisica) => {
			const fichero = await fetch(rutafisica);
			const blob = await fichero.blob();

			return blob;
		};