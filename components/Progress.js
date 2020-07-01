import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Colors from "../constants/Colors";

export default class ProgressBar extends React.Component {
  constructor() {
    super();
    this.state = {
      fontSize: 10,
    };
  }

  onLayout(l) {
    this.setState({ fontSize: l.width * 0.035 });
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={(e) => this.onLayout(e.nativeEvent.layout)}
      >
        <View style={styles.progress}>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  backgroundColor:
                    this.props.stage >= 2
                      ? Colors.default.bar.active
                      : Colors.default.bar.inactive,
                },
              ]}
            />
            <View
              style={[
                styles.bar,
                {
                  backgroundColor:
                    this.props.stage >= 3
                      ? Colors.default.bar.active
                      : Colors.default.bar.inactive,
                },
              ]}
            />
          </View>
          <View
            style={[
              styles.point,
              {
                backgroundColor:
                  this.props.stage >= 1
                    ? Colors.default.bar.active
                    : Colors.default.bar.inactive,
              },
            ]}
          />
          <View
            style={[
              styles.point,
              {
                backgroundColor:
                  this.props.stage >= 2
                    ? Colors.default.bar.active
                    : Colors.default.bar.inactive,
              },
            ]}
          />
          <View
            style={[
              styles.point,
              {
                backgroundColor:
                  this.props.stage >= 3
                    ? Colors.default.bar.active
                    : Colors.default.bar.inactive,
              },
            ]}
          />
        </View>
        <View style={styles.barText}>
          <Text style={[styles.text, { fontSize: this.state.fontSize }]}>
            Picking
          </Text>
          <Text style={[styles.text, { fontSize: this.state.fontSize }]}>
            Serving
          </Text>
          <Text style={[styles.text, { fontSize: this.state.fontSize }]}>
            Delivery
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignItems: "center",
    // borderWidth: 1,
  },
  progress: {
    height: "50%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
  },
  point: {
    borderWidth: 2,
    borderColor: Colors.default.bar.inactive,
    aspectRatio: 1,
    height: "100%",
    borderRadius: 1000,
  },
  barContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    height: "38.4%",
    width: "47.5%",
    borderColor: Colors.default.bar.inactive,
    borderWidth: 1,
  },
  barText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 3,
    marginLeft: 5,
  },
  text: {
    fontFamily: "poppins-light",
    color: Colors.default.back,
  },
});
