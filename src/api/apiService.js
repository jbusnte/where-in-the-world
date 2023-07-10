export const fetchCityData = async (region) => {
    try {

      // Correct the region according to the API
      if (region === "Americas") {
        region = "America"
      } else if (region === "Oceania") {
        region = "Australia"
      }

      const response = await fetch(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=1000&refine.timezone=${encodeURIComponent(region)}`
        );      
        if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      const cityDataArray = data.records.map(record => record.fields);
  
      // Shuffle the city records array
      const shuffledCityDataArray = shuffleArray(cityDataArray);
  
      // Select the first city from the shuffled array
      const selectedCityData = shuffledCityDataArray[0];
      const selectedCityCountry = selectedCityData.cou_name_en;
  
      return {
        cityData: selectedCityData,
        randomCountryNames: generateRandomCountryNames(shuffledCityDataArray, selectedCityCountry, 3),
      };
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  };
  
  // Using Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  
  // Get 3 random countries
  const generateRandomCountryNames = (cityDataArray, selectedCityCountry, count) => {
    const randomCountryNames = new Set();
    while (randomCountryNames.size < count) {
      const randomIndex = Math.floor(Math.random() * cityDataArray.length);
      const countryName = cityDataArray[randomIndex].cou_name_en;
      if (countryName !== selectedCityCountry) {
        randomCountryNames.add(countryName);
      }
    }
    randomCountryNames.add(selectedCityCountry); // Add the selected city's country name
    return Array.from(randomCountryNames);
  };