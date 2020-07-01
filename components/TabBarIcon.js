import * as React from "react";
import { Image } from "react-native";

export default class TabBarIcon extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    return (
      <Image
        source={
          this.props.focused ? this.props.icon.active : this.props.icon.inactive
        }
        resizeMode={"contain"}
        style={{ marginBottom: -3, height: "52.5%" }}
      />
    );
  }
}
