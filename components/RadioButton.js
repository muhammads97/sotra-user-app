import * as React from "react";
import Colors from "../constants/Colors";
import { View } from "react-native";
export default function RadioButton({ style, selected }) {
  return (
    <View
      style={[
        {
          marginTop: 3,
          marginRight: 20,
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: Colors.primary,
          alignItems: "center",
          justifyContent: "center",
          opacity: selected ? 1 : 0.5,
        },
        style,
      ]}
    >
      {selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: Colors.primary,
          }}
        />
      ) : null}
    </View>
  );
}
