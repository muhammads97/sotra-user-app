import { Alert } from "react-native";

export function alertE001() {
  Alert.alert(
    "Already requested",
    "You have already requested a pickup, please wait we will serve you shortly.",
    [
      {
        text: "Ok",
      },
    ]
  );
}
export function alertE002() {
  Alert.alert(
    "No Available Services",
    "All services in your area are either closed or busy now, we will notify you when services are available.",
    [
      {
        text: "Ok",
      },
    ]
  );
}
export function alertE003() {
  Alert.alert(
    "No Services in your area",
    "There are no services in your area, we will make sure to reach your area as soon as possible. Thank you.",
    [
      {
        text: "Ok",
      },
    ]
  );
}
export function alertE004() {}
export function alertE005() {}
export function alertE006() {}
export function alertE007() {}
