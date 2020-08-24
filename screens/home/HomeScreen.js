import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import Colors from "../../constants/Colors";
import Icons from "../../constants/Icons";
import RoundEdgeButton from "../../components/button/RoundEdge";
import SquareButton from "../../components/button/Square";
import styles from "./style";
import ButtonsSection from "./ButtonsSection";

const screenWidth = Math.round(Dimensions.get("window").width);
const SBHeight = StatusBar.currentHeight;
const screenHeight = Math.round(Dimensions.get("window").height) - SBHeight;
export default class HomeScreen extends React.Component {
  constructor({ navigation, route }) {
    super();
    this.state = {
      name: "",
    };
    this.navigation = navigation;
  }

  async componentDidMount() {
    this.setState({ name: globalThis.client.getName() });
    globalThis.client.setupNotifications(this.navigation);
  }

  updateUser() {
    this.setState({ name: globalThis.client.getName() });
  }
  orderNow() {
    this.navigation.navigate("SelectAddress", {
      refresh: () => null,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} />
        <View style={[styles.subContainer]}>
          <View style={styles.welcome}>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.username}>{this.state.name}</Text>
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
                style={[
                  styles.orderNowText,
                  { fontFamily: "poppins-semi-bold" },
                ]}
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
          <RoundEdgeButton text={"Order Now"} onPress={() => this.orderNow()} />
          <ButtonsSection
            nav={this.navigation}
            updateUser={() => this.updateUser()}
          />
        </View>
      </View>
    );
  }
}
