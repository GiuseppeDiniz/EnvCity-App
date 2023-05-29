import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GooglePlacesInput from '../utils/GooglePlaceInput';

const SearchBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const handleSearchIconClick = () => setIsSearchVisible(true);
  const handleCancelSearch = () => setIsSearchVisible(false);

  return (
    <React.Fragment>
      {isSearchVisible ? (
        <GooglePlacesInput onCancel={handleCancelSearch} />
      ) : (
        <TouchableOpacity onPress={handleSearchIconClick}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};

export default SearchBar;
