import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useInputInfoController } from '../../controllers/InputInfoController';

export default function InputInfoScreen() {

  const {
    initialLog
  } = useInputInfoController();

  return (
    <View style={styles.container}>
      <Text>Info List Screen</Text>
      <TouchableOpacity
          onPress={initialLog}
        >
          <Text>Press Me</Text>
        </TouchableOpacity>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});