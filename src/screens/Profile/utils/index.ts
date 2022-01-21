import * as ImagePicker from 'expo-image-picker';

export const pickImage = async (
  setFieldValue: (name: string, uri: any) => void,
  setVisible: (visible: boolean) => void,
) => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setFieldValue('userimage', result.uri);
  }
  setVisible(false);
};

export const selectImage = async (
  setFieldValue: (name: string, uri: string) => void,
  setVisible: (visible: boolean) => void,
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    setFieldValue('userimage', result.uri);
  }

  setVisible(false);
};
