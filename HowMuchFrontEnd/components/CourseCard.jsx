import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CourseCard = ({ title, detail, price, imageUri }) => {
  return (
    <View style={styles.courseCard}>
      <Image source={{ uri: imageUri }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{title}</Text>
          <Icon name="star" size={20} color="#FFB800" />
        </View>
        <Text style={styles.courseDetail}>{detail}</Text>
        <Text style={styles.coursePrice}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 16,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  courseInfo: {
    flex: 1,
    marginLeft: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  coursePrice: {
    fontSize: 14,
    color: '#666',
  },
});

export default CourseCard;
