import React, { useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";
const PlaceListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);
  //console.log(places);
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          location={itemData.item.location}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({});

export default PlaceListScreen;
