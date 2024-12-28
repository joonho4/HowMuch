import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PlaceCard = ({ image, name, price, onPress }) => {
  return (
    <TouchableOpacity style={styles.placeCard} onPress={onPress}>
      <Image source={image} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <View style={styles.placeHeader}>
          <Text style={styles.placeName}>{name}</Text>
          <View style={styles.viewMoreContainer}>
            <Text style={styles.viewMore}>위치 보러가기</Text>
            <Icon name="chevron-right" size={16} color="#666" />
          </View>
        </View>
        <Text style={styles.placePrice}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeCard: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  placeInfo: {
    padding: 16,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewMore: {
    fontSize: 14,
    color: '#666',
  },
  placePrice: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlaceCard;
