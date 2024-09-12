'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const EyeHealthIntro: React.FC = () => {
    const router = useRouter();

    const handleCheckEyes = () => {
        router.push('/scanner');
        alert('Redirecting to scanner page');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-5">

            <div className="mb-6 flex items-center justify-center bg-gray-200 p-6 rounded-xl">
                <FontAwesomeIcon icon={faEye} className="text-green-600 text-8xl" />
            </div>
            <h1 className="text-4xl font-bold mb-12 text-gray-800">Welcome to <span className='text-green-600'>EyeMe</span></h1>
            <p className="text-lg text-gray-600 mb-8">
                {`Let's check the health of your eyes and ensure you're seeing the world clearly.`}
            </p>
            <button
                className="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg hover:bg-green-600 transition-colors"
                onClick={handleCheckEyes}
            >
                Check My Eyes
            </button>
        </div>
    );
};

export default EyeHealthIntro;