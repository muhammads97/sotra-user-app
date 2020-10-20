export const formatAddress = (address) => {
  let building = address.building_number.toString();
  let streetAddress = address.street;
  let floor = address.floor.toString();
  let apt = address.apt.toString();
  let directions = address.additional_directions;
  address = "";
  if (building != null && building.length > 0) {
    address += building + " ";
  }
  if (streetAddress != null && streetAddress.length > 0) {
    address += streetAddress + ". ";
  }
  if (apt != null && apt.length > 0) {
    address += "Apartment NO. " + apt;
  }
  if (floor != null && floor.length > 0) {
    address += ", Floor NO. " + floor + ". ";
  }
  if (directions != null && directions.length > 0) {
    address += "(" + directions + ")";
  }
  return address;
};
