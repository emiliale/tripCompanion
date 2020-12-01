import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input, Spin } from "antd";
import { withTranslation } from "react-i18next";
import { continents, countries } from "./CountriesAndContinents";

function PlacesAutocompleteComponent(props) {
  const [address, setAddress] = React.useState(props.city ? props.city : "");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const cityNameInfo = results[0].address_components.filter(
      (address) =>
        address.types.indexOf("locality") !== -1 &&
        address.types.indexOf("political") !== -1
    );
    const countryNameInfo = results[0].address_components.filter(
      (address) =>
        address.types.indexOf("country") !== -1 &&
        address.types.indexOf("political") !== -1
    );
    const city = cityNameInfo[0] ? cityNameInfo[0].long_name : "";
    const countryCode = countryNameInfo[0] ? countryNameInfo[0].short_name : "";
    const country = countries[countryCode] ? countries[countryCode] : "";
    const continent = continents[countryCode] ? continents[countryCode] : "";
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setIsDisabled(true);
    props.setCoordinates(latLng.lat, latLng.lng);
    props.setCityInfo(city, country, continent);
    props.openMap();
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              readOnly={isDisabled}
              style={{ width: "20%" }}
              {...getInputProps({ placeholder: props.t("tour.city") })}
            />
            <div>
              {loading ? (
                <div>
                  <Spin />
                </div>
              ) : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default withTranslation()(PlacesAutocompleteComponent);
