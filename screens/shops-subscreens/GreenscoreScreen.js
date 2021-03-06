import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Title,
  ItalicText,
  SimpleText,
  SecondaryTitle,
  SecondaryText,
  ButtonText,
} from "../../components/atoms/StyledText";
import {
  Button,
  Subtitle,
  Textarea,
  Form,
  Item,
  Input,
  Content,
  Switch,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Tag } from "../../components/atoms/Tag";

export default function GreenscoreScreen({ route, navigation }) {
  navigation.setOptions({ headerShown: false });
  const shop = route.params.shop;
  const [rate, setRate] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [infos, setInfos] = useState({
    name: shop.name,
    address: shop.address,
    comments: "",
  });

  const updateField = (field, val) => {
    setInfos({
      ...infos,
      [field]: val,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Button
        onPress={() => navigation.goBack()}
        light
        style={styles.back}
        transparent
      >
        <Ionicons name="md-arrow-round-back" size={20} />
      </Button>
      <View style={{ marginTop: 10 }}>
        <SecondaryTitle
          style={{ textAlign: "center", marginBottom: 30 }}
          fontSize={20}
        >
          Remettre en question un greenscore
        </SecondaryTitle>
      </View>
      <SimpleText style={{ marginBottom: 20 }}>
        Le greenscore d’un commerce vous parait anormal ? Répondez à ce petit
        questionnaire pour que nous puissions revoir la note.
      </SimpleText>
      <View style={styles.formItem}>
        <SecondaryText>Nom du commerce</SecondaryText>
        <Input
          placeholder={shop.name}
          rounded
          value={infos.name}
          onChangeText={(text) => updateField("name", text)}
          style={{ color: Colors.grey }}
        />
      </View>
      <View style={styles.formItem}>
        <SecondaryText>Adresse</SecondaryText>
        <Input
          placeholder={shop.address}
          rounded
          value={infos.address}
          onChangeText={(text) => updateField("address", text)}
          style={{ color: Colors.grey }}
        />
      </View>
      <View style={styles.formItem}>
        <SecondaryText>Ce commerce vous parait éco-responsable ?</SecondaryText>
        <Switch
          value={rate}
          onValueChange={() => setRate(!rate)}
          style={{ marginTop: 5 }}
        />
      </View>
      <View style={styles.formItem}>
        <SecondaryText>
          Y’a t-il des tags qui vous paraissent inappropriés ?
        </SecondaryText>
        <View style={[styles.tagsContainer, { marginBottom: 10 }]}>
          {shop.tags.map((tag, idx) => (
            <Tag
              key={idx}
              onPress={() => {
                setSelectedTags((prevState) =>
                  prevState.includes(tag)
                    ? prevState.filter((t) => t !== tag)
                    : [...prevState, tag]
                );
              }}
              title={tag}
              focused={selectedTags && selectedTags.includes(tag)}
            />
          ))}
        </View>
      </View>
      <View style={styles.formItem}>
        <SecondaryText>Commentaires</SecondaryText>
        <Textarea
          rowSpan={6}
          bordered
          placeholder="Tapez votre message"
          value={infos.comments}
          onChangeText={(text) => updateField("comments", text)}
        />
      </View>

      <Button
        style={styles.searchButton}
        onPress={() =>
          navigation.navigate("Confirmation", {
            id: shop.id,
            type: "greenscore",
          })
        }
      >
        <ButtonText style={styles.buttonText} transform>
          Je valide
        </ButtonText>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
  },
  contentContainer: {
    justifyContent: "center",
  },
  formItem: {
    marginBottom: 30,
  },
  searchButton: {
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    marginTop: 50,
    marginBottom: 40,
  },
  buttonText: {
    paddingTop: 10,
    alignItems: "center",
    color: Colors.white,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    width: Dimensions.get("window").width,
  },
});
