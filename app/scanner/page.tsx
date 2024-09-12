'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import RollerAnimation from './roller-white';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import showClicked from '@/components/show-clicked';

const ImageUpload: React.FC = () => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const imageUploadRef = useRef<HTMLInputElement | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            setSelectedImage(file);
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancle = () => {
        if (cancelRef.current) {
            showClicked(cancelRef.current);
            setTimeout(() => {
                setSelectedImage(null);
                setPreview(null);
            }, 250);
        };
    };

    const submitImage = async () => {
        setSubmitting(true);

        try {
            const formData = new FormData();
            // @ts-expect-error: screw it
            formData.append('file', selectedImage);

            const response = await fetch(`${apiHost}/predict`, {
                method: 'POST',
                body: formData,
                // Don't set 'Content-Type', the browser will do it automatically when using FormData
            });

            if (response.status !== 200) throw new Error('Something went wrong');

            const result = await response.json();


            if (result.prediction === 1) {
                router.push('/infected');
            } else {
                router.push('/not-infected');
            };
        } catch (err) {
            alert('An error ocured please try again');
            console.log('Error in uploading eye iamge', err);
        } finally {
            setSubmitting(false);
        };
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center relative">
            <Header />
            <h1 className="text-3xl text-gray-600  font-bold mb-4">Upload or Take a Picture</h1>

            {/* Display the selected or taken picture inside a div */}
            <div className="mx-4">
                {selectedImage && preview ? (
                    <div className='flex flex-col items-center justify-center gap-4 relative'>
                        <button
                            ref={cancelRef}
                            onClick={handleCancle}
                            className='rounded-full absolute top-2 right-2 bg-red-50 w-6 h-6'
                        >
                            <FontAwesomeIcon icon={faX} className='text-red-500 w-3 h-3 font-bold' />
                        </button>
                        <Image
                            width={500}
                            height={500}
                            src={preview}
                            alt="Eye to scan"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button onClick={submitImage} className='bg-green-600 text-white flex rounded-full items-center justify-center px-4 py-2'>
                            {!submitting ? 'Submit' : <RollerAnimation h='h-[1.5rem]' />}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="w-64 h-64  rounded-xl flex flex-col items-center justify-center gap-4 bg-white border-2 border-gray-300">
                            {/* Button for taking a picture or uploading an image */}
                            <label className="cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                Take Eye Picture
                            </label>
                            <div className='rounded-full w-10 h-10 bg-green-200 text-green-600 flex items-center justify-center'>OR</div>
                            <label
                                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                            >
                                <input ref={imageUploadRef} name='imaeg' type="file" accept="image/*" onChange={handleImageChange} className='opacity-20 hidden w-0 h-0' />
                                Uplaod Eye Image
                            </label>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;