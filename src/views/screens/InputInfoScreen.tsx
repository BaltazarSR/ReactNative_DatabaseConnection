import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useInputInfoController } from '../../controllers/InputInfoController';

export default function InputInfoScreen() {

  const {
    name,
    schoolID,
    semester,
    setName,
    setSchoolID,
    setSemester,
    handleSubmit
  } = useInputInfoController();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>
          Add a student
        </Text>
      </View>
      <View style={styles.formsContainer}>
        <Text style={styles.label}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          placeholder=". . ."
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>
          School ID
        </Text>
        <TextInput
          style={styles.input}
          placeholder=". . ."
          value={schoolID}
          onChangeText={setSchoolID}
        />
        <Text style={styles.label}>
          Semester
        </Text>
        <TextInput
          style={styles.input}
          placeholder=". . ."
          value={semester}
          onChangeText={setSemester}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => handleSubmit()}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 45,
    fontWeight: 600,
    marginTop: 90
  },
  formsContainer: {
    flex: 1,
    alignItems: 'center',
    width: '80%',
    flexDirection: 'column',
    marginTop: 50,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 600,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 18
  },
  button: {
    backgroundColor: '#000000ff',
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 100,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: .6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
  },
  footer: {
    flex: 1,
    width: '80%'
  }
});