import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useInfoListController } from '../../controllers/InfoListController';
import { Student } from '../../models/StudentModel';

export default function InfoListScreen() {

  const {
    students,
    loading,
    error,
    fetchStudents,
    lastUpdatedAt,
    isConnected
  } = useInfoListController();

  const renderStudentItem = ({ item }: { item: Student }) => (
    <View style={styles.studentCard}>
      <Text style={styles.studentName}>{item.name}</Text>
      <Text style={styles.studentID}>{item.school_id}</Text>
      {item.semester && <Text style={styles.studentAge}>Semester: {item.semester}</Text>}
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No students found</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Loading students...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>
          Students in DB
        </Text>
      </View>
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyComponent}
        onRefresh={fetchStudents}
        refreshing={loading}
      />
      <View style={styles.footer}>
        <View style={styles.connectionIndicator}>
          <View style={[
            styles.connectionDot,
            { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }
          ]} />
          <Text style={styles.connectionText}>
            {isConnected ? 'Connected to DB' : 'Disconnected'}
          </Text>
        </View>
        <Text style={styles.footerText}>
          Last updated: {lastUpdatedAt?.toLocaleString() || 'Never'}
        </Text>
        <Text style={styles.footerText}>
          Students fetched: {students.length}
        </Text>
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#FFFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    paddingBottom: 20,
    backgroundColor: '#FFFAFA',
  },
  titleText: {
    fontSize: 45,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  studentCard: {
    backgroundColor: '#FFFAFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  studentID: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 3,
  },
  studentAge: {
    fontSize: 14,
    color: '#888888',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#888888',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    backgroundColor: '#FFFAFA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#FFFAFA',
    alignItems: 'center',
  },
  connectionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  connectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  connectionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
});