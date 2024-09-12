/* eslint-disable @next/next/no-img-element */
'use client';
import { useRef, useState } from 'react';

export default function Home() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isCameraActive, setIsCameraActive] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [hasClicked, setHasClicked] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [image, setImage] = useState('');
	const [hasGotten, setHasGotten] = useState(false);

	const handleCamera = () => {
		const video = videoRef.current;
		// Start camera stream when the component is mounted
		const startCamera = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				if (video) {
					video.srcObject = stream;
				}
				setIsCameraActive(true);
				setHasGotten(true);
			} catch (err) {
				console.error('Error accessing camera: ', err);
				setIsCameraActive(false);
			}
		};

		startCamera();
	};

	const handleUpload = () => {
		handleStopStream();
		fileInputRef.current?.click();
	};

	const handleStopStream = () => {
		const video = videoRef.current;
		if (video && video.srcObject) {
			const stream = video.srcObject as MediaStream;
			const tracks = stream.getTracks();

			tracks.forEach(track => {
				track.stop();
			});
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedImage = e.target.files[0];
			const imageUrl = URL.createObjectURL(selectedImage);
			setImage(imageUrl);
			setHasGotten(true);
		}
	};

	console.log(image);
	return (
		<div className="flex gap-x-5">
			<aside className="bg-[#171717] p-10 h-screen">
				<h1 className="text-2xl">OpticsMongo</h1>

				<h1 className="mt-4">History</h1>
			</aside>
			<main className="p-10 flex h-screen justify-between flex-1">
				<div>
					<video
						ref={videoRef}
						autoPlay
						playsInline
						style={{
							borderRadius: '10px',
							display: isCameraActive ? 'block' : 'none',
						}}
						className="w-screen"
					/>
					{/* {isCameraActive && (
						<div>
							<span className="text-red-600 w-32 h-32"></span>
						</div>
					)} */}
				</div>
				{!hasGotten ? (
					<>
						<div className="flex-1 justify-center items-center flex cursor-pointer">
							<div
								className="flex flex-col items-center gap-y-5  p-3"
								onClick={handleCamera}
							>
								{!isCameraActive && (
									<>
										<i className="fa-solid fa-camera fa-5x"></i>
										<p className="text-4xl">Take Image</p>
									</>
								)}
								{hasClicked && !isCameraActive && (
									<p className="text-red-500">Failed to access camera.</p>
								)}
							</div>
						</div>
						<div className="w-3 h-full bg-white rounded-lg"></div>
						<div className="flex-1 justify-center items-center flex cursor-pointer">
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								ref={fileInputRef}
								className="hidden"
							/>
							{!image && (
								<div
									className="flex flex-col items-center gap-y-5"
									onClick={handleUpload}
								>
									<i className="fa-regular fa-image fa-5x"></i>
									<p className="text-4xl">Upload Image</p>
								</div>
							)}
						</div>
					</>
				) : (
					<>
						{image && (
							<div>
								<img src={image} alt="Selected" className="w-screen h-full" />
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
}
