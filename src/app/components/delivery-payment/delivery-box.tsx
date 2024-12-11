import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { useState,useEffect,useRef } from 'react';
import blue from '@mui/material/colors/blue';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HomeIcon from '@mui/icons-material/Home';
import OutlinedInput from '@mui/material/OutlinedInput';
import {APIProvider,ControlPosition,MapControl,AdvancedMarker,
    Map,useMap,useMapsLibrary,useAdvancedMarkerRef,AdvancedMarkerRef} 
    from '@vis.gl/react-google-maps';

    interface MapHandlerProps {
        place: google.maps.places.PlaceResult | null;
        marker: google.maps.marker.AdvancedMarkerElement | null;
      }

      const MapHandler = ({ place, marker }: MapHandlerProps) => {
        const map = useMap();
      
        useEffect(() => {
          if (!map || !place || !marker) return;
      
          if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
          }
          marker.position = place.geometry?.location;
        }, [map, place, marker]);
      
        return null;
      };

      interface PlaceAutocompleteProps {
        onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
      }

      const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
        const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
        const inputRef = useRef<HTMLInputElement>(null);
        const places = useMapsLibrary('places');
      
        useEffect(() => {
          if (!places || !inputRef.current) return;
      
          const options = {
            fields: ['geometry', 'name', 'formatted_address']
          };
      
          setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
        }, [places]);
      
        useEffect(() => {
          if (!placeAutocomplete) return;
      
          placeAutocomplete.addListener('place_changed', () => {
            onPlaceSelect(placeAutocomplete.getPlace());
          });
        }, [onPlaceSelect, placeAutocomplete]);
      
        return (
          <div className="autocomplete-container">
            <input ref={inputRef} 
            style={{height: '5vh', width: '20vw', marginTop: 10}}/>
          </div>
        );
      };

export default function DeliveryBox() {
    const theme = useTheme();
    const themeBorderColor = theme.palette.primary.light;
    const option1Text = "Delivery option 1 - address";
    const [selectedValue, setSelectedValue] = useState<string>(option1Text);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    }

    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <>
            <div> Delivery </div>
            <Box sx={{
                width: "50vw", borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid',
                paddingTop: 1, paddingBottom: 1, display: 'flex', flexDirection: 'column'
            }}>
                <div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-center'>
                            <Radio
                                checked={selectedValue === option1Text}
                                onChange={handleChange}
                                value={option1Text}
                                name="radio-button-1"
                                inputProps={{ 'aria-label': option1Text }}
                                sx={{
                                    '&.Mui-checked': {
                                        color: blue[600]
                                    },
                                    mt: 1
                                }}
                            />
                            <HomeIcon fontSize='large' />
                            <div className='ms-3 mt-2 text-lg'> {option1Text} </div>
                        </div>
                        <div className='self-center mr-3'> 3.99 $ </div>
                    </div>
                    <OutlinedInput sx={{
                        width: '80%',
                        ml: 2,
                        '& fieldset': {
                            borderColor: 'black'
                        },
                        '&:hover fieldset': {
                            borderColor: 'black'
                        },
                        input: {
                            paddingY: 1
                        }
                    }}
                        placeholder='Choose an address by clicking here'
                    />
                </div>

                <div>
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
                    <Map
                        mapId={'bf51a910020fa25a'}
                        defaultZoom={10}
                        defaultCenter={{ lat:  42.698334, lng: 23.319941 }}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        zoomControl fullscreenControl
                        style={{
                            width: '40vw', height: '40vh'
                        }}
                        >
                        <AdvancedMarker ref={markerRef} position={null} />
                    </Map>
                        <MapControl position={ControlPosition.TOP}>
                            <div className="autocomplete-control">
                                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                            </div>
                        </MapControl>
                        <MapHandler place={selectedPlace} marker={marker} />
                </APIProvider>
                </div>
            </Box>
        </>
    )
}