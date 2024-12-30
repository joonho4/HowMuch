import { TouchableOpacity } from 'react-native';
import { Image, ScrollView, Text, View } from 'react-native-web';

const renderActivities = () => {
    if (!tripPlan?.tripPlan[0]) return null;
  
    const activities = Object.values(tripPlan.tripPlan[0]).flatMap(day => [
      day.morningActivity,
      day.afternoonActivity
    ]).filter(activity => activity.activityName);
  
    return (
      <ScrollView contentContainerStyle={styles.activitiesContainer}>
        {activities.map((activity, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.activityCard}
            onPress={() => activity.websiteURL && Linking.openURL(activity.websiteURL)}
          >
            <Image 
              source={activity.imageURL ? { uri: activity.imageURL } : require('../assets/image.png')}
              style={styles.activityImage}
            />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{activity.activityName}</Text>
              {activity.description && (
                <Text style={styles.activityDescription}>{activity.description}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

export default renderActivities