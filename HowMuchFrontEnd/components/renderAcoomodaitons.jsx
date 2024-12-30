const { TouchableOpacity } = require('react-native');
const { ScrollView, View } = require('react-native-web');



const renderAccommodations = () => {
    if (!tripPlan?.tripPlan[0]) return null;
    
    const accommodations = Object.values(tripPlan.tripPlan[0])
      .filter(day => day.accommodation && day.accommodation.name)
      .map(day => day.accommodation);
  
    return (
      <ScrollView contentContainerStyle={styles.accommodationContainer}>
        {accommodations.map((acc, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.accommodationCard}
            onPress={() => acc.websiteURL && Linking.openURL(acc.websiteURL)}
          >
            <Image 
              source={acc.imageURL ? { uri: acc.imageURL } : require('../assets/image.png')}
              style={styles.accommodationImage}
            />
            <View style={styles.accommodationInfo}>
              <Text style={styles.accommodationName}>{acc.name}</Text>
              <Text style={styles.accommodationDesc}>{acc.description}</Text>
              <Text style={styles.accommodationPrice}>
                평균 {acc.averagePrice.toLocaleString()}원
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };


export default renderAccommodations;