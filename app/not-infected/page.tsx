import Header from "@/components/header";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotInfected: React.FC = () => {
    const eyeHealthTips = [
        "Get comprehensive eye exams regularly to detect early signs of eye conditions like glaucoma or cataracts.",
        "Wear sunglasses that block 100% of UVA and UVB rays to protect your eyes from harmful ultraviolet (UV) rays.",
        "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for at least 20 seconds to reduce digital eye strain.",
        "Eat foods rich in vitamins A, C, and E, as well as omega-3 fatty acids, to support eye health and prevent age-related issues.",
        "Drink plenty of water to stay hydrated and avoid dry eyes.",
        "Quit smoking to reduce the risk of eye diseases like cataracts and macular degeneration."
    ];


    return (
        <div className="bg-white w-full h-full">
            <Header />
            <div className="flex items-center flex-col justify-center mt-20 mb-10">
                <FontAwesomeIcon icon={faTrophy} className="w-24 h-24 text-purple-600" />
                <p className="text-gray-600">Congratulatiosn Your eyes are healhy</p>
            </div>
            <div className="p-3">
                <h2 className="text-green-700">Tips to maintain an healthy eye</h2>
                <ul className="list-disc list-inside mt-2">
                    {eyeHealthTips.map((eyeHealthTip, index) => (
                        <li key={index} className="text-base text-gray-700">{eyeHealthTip}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NotInfected; 