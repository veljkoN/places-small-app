import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const PlaceDetailScreen = (props) => {
  console.log(props.route.params.placeId);
  const placeId = props.route.params.placeId;
  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );
  console.log(selectedPlace);
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <Text>{selectedPlace.title}</Text>
        <Text style={styles.location}>{selectedPlace.location}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
