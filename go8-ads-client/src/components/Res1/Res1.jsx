import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlightBoard from "./FlightBoard";

function Res1() {
    const [ads, setAds] = useState([]); // Store ads data
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isAds, setIsAds] = useState(false);

    useEffect(() => {
        // Fetch ads from API
        const fetchAds = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/ads");
                const data = await response.json();
                setAds(data);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };

        fetchAds();
    }, []);

    useEffect(() => {
        if (ads.length === 0) return;

        const currentAd = ads[currentAdIndex];
        const duration = currentAd?.duration || 15000; // Default to 15 seconds if duration is missing

        // Show ad first
        setIsAds(true);

        // Hide ad after duration
        const hideAdTimeout = setTimeout(() => {
            setIsAds(false);
        }, duration * 1000);

        // After hiding, wait for the animation to complete, then switch to the next ad
        const switchAdTimeout = setTimeout(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
            setIsAds(true);
        }, duration * 1000); // 500ms extra to allow smooth transition

        return () => {
            clearTimeout(hideAdTimeout);
            clearTimeout(switchAdTimeout);
        };
    }, [ads, currentAdIndex]);

    return (
        <div className="w-screen h-screen flex overflow-hidden">
            {/* Flight detail board */}
            <div className={isAds ? "w-3/4 transition-all duration-500" : "w-full transition-all duration-500"}>
                <FlightBoard />
            </div>

            {/* Ads div with animation */}
            <AnimatePresence>
                {isAds && ads.length > 0 && (
                    <motion.div
                        key={ads[currentAdIndex]?.mediaUrl} // Ensure proper re-render
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="ads w-1/4 bg-black text-white flex items-center justify-center"
                    >
                        <img className="w-full h-full" src={`http://localhost:5000/${ads[currentAdIndex]?.mediaUrl}`} alt="Ad" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Res1;
