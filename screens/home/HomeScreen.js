import * as React from "react";
import { View, Image, Text, StatusBar } from "react-native";
import Icons from "../../constants/Icons";
import RoundEdgeButton from "../../components/button/RoundEdge";
import styles from "./style";
import ButtonsSection from "./ButtonsSection";

export default function HomeScreen({ navigation }) {
  const [name, setName] = React.useState("");
  const updateUser = async () => {
    let n = await globalThis.client.getName();
    setName(n);
  };
  const orderNow = () => {
    navigation.navigate("SelectAddress", {
      refresh: () => null,
    });
  };
  React.useEffect(() => {
    updateUser();
    globalThis.client.setupNotifications(navigation);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
      <View style={[styles.subContainer]}>
        <View style={styles.welcome}>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.username}>{name}</Text>
        </View>
      </View>
      <View style={[styles.subContainer]}>
        <View style={styles.message}>
          <View style={styles.messageText}>
            <Text style={styles.orderNowText}>Order now,</Text>
            <Text style={[styles.orderNowText, { letterSpacing: -0.5 }]}>
              we will be on your door steps
            </Text>
            <Text
              style={[styles.orderNowText, { fontFamily: "poppins-semi-bold" }]}
            >
              in less than 2 hours !
            </Text>
          </View>
          <Image
            style={styles.hanger}
            source={Icons.hanger}
            resizeMode="contain"
          />
        </View>
        <RoundEdgeButton text={"Order Now"} onPress={() => orderNow()} />
        <ButtonsSection nav={navigation} updateUser={() => updateUser()} />
      </View>
    </View>
  );
}
