import Header from '@/components/header';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const EyeInfectionRecommendations: React.FC = () => {
    const recommendations = [
        "Consult a doctor, especially if symptoms are severe or persistent.",
        "Follow prescribed medications like antibiotics or eye drops.",
        "Avoid touching or rubbing your eyes to prevent spreading.",
        "Maintain good hygiene by washing your hands regularly.",
        "Stop using contact lenses until the infection clears."
    ];

    return (
        <div className='w-full h-full bg-white p-4 mb-10'>
            <Header />
            <MapIconDiv />

            <h3 className="text-xl font-semibold mt-4 text-gray-600">Recommendations for Eye Infection</h3>
            <ul className="list-disc list-inside mt-2">
                {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-base text-gray-700">{recommendation}</li>
                ))}
            </ul>
        </div>
    );
};

const MapIconDiv: React.FC = () => {
    return (
        <div className="flex flex-col items-center space-x-2 mt-20">
            <FontAwesomeIcon icon={faLocationArrow} className="text-blue-500 text-2xl" />
            <span className="text-lg font-medium text-gray-400">Enable Geolocation</span>
        </div>
    );
};

export default EyeInfectionRecommendations;
