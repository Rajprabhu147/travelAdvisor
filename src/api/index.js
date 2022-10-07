import axios from "axios";
  
export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': '4e41846358msh101a8af3de8c87fp19545ejsne31b2e4e2680',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });

        return data;
    } catch (error) {

    }
}

