import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Title,
  ItalicText,
  SimpleText,
  SecondaryTitle,
  SecondaryText,
  ButtonText,
} from "../../components/atoms/StyledText";
import { API_URL } from "../../utils/api";
import shops from "../../utils/poi-api-test.json";
import { Button, Subtitle } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Tag } from "../../components/atoms/Tag";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Criterium } from "../../components/atoms/Criterium";
import { FullButton } from "../../components/atoms/FullButton";
import { getLocation, geocodeLocationByName } from "../../utils/map";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { MiniCard } from "../../components/molecules/MiniCard";

export default function ShopInfoScreen({ route, navigation }) {
  navigation.setOptions({ headerShown: false });
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const index = route.params.id;

  useEffect(() => {
    if (index) {
      setData(shops.find((obj) => obj.id === index));
    }
    if (data) {
      const address = `${data.address}, ${data.zipcode}, ${data.city}`;
      Geocoder.from(address)
        .then((json) => {
          setLocation({
            latitude: json.results[0].geometry.location.lat,
            longitude: json.results[0].geometry.location.lng,
          });
        })
        .catch((error) => console.warn(error));
    }
  }, [index, data]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()} light style={styles.back}>
          <Ionicons name="md-arrow-round-back" size={20} />
        </Button>
        <Image
          source={require("../../assets/images/abattoirveg.jpg")}
          style={{
            flex: 1,
            width: null,
            height: 200,
            resizeMode: "cover",
          }}
        />
      </View>
      {data && (
        <View style={styles.infosContainer}>
          <View style={styles.greenscore}>
            <View style={{ width: 40, height: 30, flex: 1 }}>
              <Image
                source={require("../../assets/images/greenscore-2.png")}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain",
                }}
              />
            </View>
            <SecondaryText style={{ marginTop: 5 }}>
              {data.greenscore}%
            </SecondaryText>
          </View>
          <View style={{ marginTop: 10 }}>
            <SecondaryTitle style={{ textAlign: "center" }} fontSize={20}>
              {data.name}
            </SecondaryTitle>
          </View>
          <ItalicText style={{ textAlign: "center", marginBottom: 20 }}>
            {data.address}
          </ItalicText>
          <SimpleText>{data.description}</SimpleText>
          <View style={[styles.tagsContainer, { marginBottom: 50 }]}>
            {data.tags.map((tag, idx) => (
              <Tag title={tag} key={idx} />
            ))}
          </View>
          <SecondaryTitle
            style={{ textAlign: "center", marginBottom: 10 }}
            fontSize={20}
          >
            Critères de sélection
          </SecondaryTitle>
          <View style={styles.criteria}>
            {Object.keys(data.criteria).map((criterium, idx) => (
              <Criterium
                title={criterium}
                imageType={criterium}
                key={idx}
                score={data.criteria[criterium].note}
              />
            ))}
          </View>
          <View>
            <SecondaryTitle
              style={{ textAlign: "center", marginBottom: 10 }}
              fontSize={20}
            >
              Horaires:
            </SecondaryTitle>
            <SimpleText style={{ textAlign: "center" }} color={Colors.grey}>
              {data.openingHours}
            </SimpleText>
            {location && (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.mapStyle}
                  initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                  }}
                >
                  <Marker coordinate={location} />
                </MapView>
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginBottom: 50,
              marginTop: 50,
            }}
          >
            <SecondaryTitle
              style={{ textAlign: "center", marginBottom: 10 }}
              fontSize={20}
            >
              vous voulez exprimer votre avis ?
            </SecondaryTitle>

            <Button style={styles.searchButton}>
              <ButtonText style={styles.buttonText} transform>
                Donner mon avis
              </ButtonText>
            </Button>
          </View>
          <SecondaryTitle
            style={{ textAlign: "center", marginBottom: 10 }}
            fontSize={20}
          ></SecondaryTitle>
          <View style={styles.miniCards}>
            {shops.slice(0, 2).map((shop, idx) => (
              <MiniCard
                key={idx}
                id={shop.id}
                name={shop.name}
                address={shop.address}
                greenscore={shop.greenscore}
                suggestionRate={shop.suggestionRate}
                tags={shop.tags}
              />
            ))}
          </View>
          <View>
            <FullButton title="Site Internet" />
            <FullButton title="Page Facebook" />
            <FullButton title="Remettre en question le greenscore" />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    justifyContent: "center",
  },
  header: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: 250,
    position: "relative",
  },
  back: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 1,
    padding: 20,
  },
  infosContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    padding: 20,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "transparent",
    marginTop: -20,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    marginTop: 20,
    width: Dimensions.get("window").width,
  },
  criteria: {
    justifyContent: "center",
    width: Dimensions.get("window").width,
    marginLeft: 40,
    marginBottom: 30,
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: 200,
    marginLeft: -20,
    marginBottom: 30,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: 200,
  },
  greenscore: {
    width: 70,
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    paddingTop: 10,
    alignItems: "center",
    color: Colors.white,
  },
  searchButton: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.secondary,
  },
  miniCards: {
    flexDirection: "row",
    marginBottom: 30,
  },
});
