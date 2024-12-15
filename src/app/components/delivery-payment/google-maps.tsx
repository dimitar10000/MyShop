import {APIProvider,ControlPosition,MapControl,AdvancedMarker,
    Map,useMap,useMapsLibrary,useAdvancedMarkerRef}
    from '@vis.gl/react-google-maps';
import { useState,useEffect,useRef,Dispatch,SetStateAction } from 'react';

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
            console.log("place changed");
            onPlaceSelect(placeAutocomplete.getPlace());
          });
        }, [onPlaceSelect, placeAutocomplete]);
      
        return (
          <div className="autocomplete-container z-[1500]">
            <input ref={inputRef} 
            style={{height: '5vh', width: '20vw', marginTop: 10}}/>
          </div>
        );
      };

export default function GoogleMaps({selectedPlace, selectedPlaceUpdater}: {
    selectedPlace: google.maps.places.PlaceResult | null, 
    selectedPlaceUpdater: Dispatch<SetStateAction<google.maps.places.PlaceResult | null>>}) {
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
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
                                <PlaceAutocomplete onPlaceSelect={selectedPlaceUpdater} />
                            </div>
                        </MapControl>
                        <MapHandler place={selectedPlace} marker={marker} />
                </APIProvider>
    )
}