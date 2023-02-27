import {PermissionsAndroid} from 'react-native';

function useStoragePermission() {
  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('External storage permission granted');
      } else {
        console.log('External storage permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return requestExternalStoragePermission;
}

export default useStoragePermission;
