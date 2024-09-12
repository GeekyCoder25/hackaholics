import React, { useEffect, useState, useRef } from 'react';

// Define the type for hospital results
interface Hospital {
    name: string;
    location: {
        lat: number;
        lng: number;
    };
}

const NearestEyeHospitals: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null); // Ref for the Google Map container

    // Load the Google Maps script
    const loadGoogleMapsScript = (callback: () => void) => {
        const existingScript = document.getElementById('googleMaps');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places`;
            script.id = 'googleMaps';
            document.body.appendChild(script);
            script.onload = callback;
        } else {
            callback();
        }
    };

    // Get user's current location using the Geolocation API
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (err: any) => {
                    console.log('Error, an error occured n try', err);
                    setError("Unable to retrieve your location.");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }, []);

    // Initialize Google Map and search for nearby hospitals
    useEffect(() => {
        if (location) {
            loadGoogleMapsScript(() => {

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const map = new (window as any).google.maps.Map(mapRef.current, {
                    center: location,
                    zoom: 14,
                });
              
                const service = new (window as any).google.maps.places.PlacesService(map);

                const request = {
                    location: new (window as any).google.maps.LatLng(location.lat, location.lng),
                    radius: 5000, // 5 km radius
                    type: ['hospital'],
                    keyword: 'eye hospital',
                };

                service.nearbySearch(request, (results: any, status: any) => {
                    if (status === (window as any).google.maps.places.PlacesServiceStatus.OK) {
                        const hospitalResults = results.map((hospital: any) => ({
                            name: hospital.name,
                            location: hospital.geometry.location,
                        }));
                        setHospitals(hospitalResults);

                        // Add markers for each hospital
                        hospitalResults.forEach((hospital: Hospital) => {
                            new (window as any).google.maps.Marker({
                                position: hospital.location,
                                map: map,
                                title: hospital.name,
                            });
                        });
                    } else {
                        setError('No hospitals found nearby.');
                    }
                });

                // Add a marker for the user's current location
                new (window as any).google.maps.Marker({
                    position: location,
                    map: map,
                    title: 'Your Location',
                });
            });
        }
    }, [location]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
            <h1 className="text-3xl font-bold mb-6">Find Nearest Eye Hospitals</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {!location ? (
                <p>Fetching your location...</p>
            ) : (
                <div className="w-full h-full">
                    {/* Map container */}
                    <div ref={mapRef} className="w-full h-96"></div>
                </div>
            )}
        </div>
    );
};

export default NearestEyeHospitals;
