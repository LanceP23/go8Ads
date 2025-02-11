import React, { useState, useEffect, useRef } from "react";
import { FlapDisplay, Presets } from "react-split-flap-effect";
import { motion } from "framer-motion";
import FlightData from "./flightDetails";
import 'react-split-flap-effect/extras/themes.css';

const FlightBoard = () => {
    const [flights, setFlights] = useState(FlightData);
    const intervalRef = useRef(null);

    useEffect(() => {
        const updateFlights = () => {
            setFlights((prevFlights) =>
                prevFlights.map(() => FlightData[Math.floor(Math.random() * FlightData.length)])
            );
        };

        intervalRef.current = setInterval(updateFlights, 5000); // Update every 5 seconds

        return () => clearInterval(intervalRef.current);
    }, []); // Empty dependency to run only once

    return (
        <div className="w-full h-full p-4 bg-[#d4e9f9] rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-[#2194e3] mb-6 text-center">
                Flight Board
            </h2>
            <div className="overflow-x-auto h-[90vh] p-2">
                <table className="w-full h-full min-w-[600px] bg-white rounded-lg shadow-sm overflow-hidden">
                    <thead>
                        <tr className="bg-[#2194e3] text-white">
                            <th className="p-3 text-left">Airline</th>
                            <th className="p-3 text-left">Flight No</th>
                            <th className="p-3 text-left">Trip Type</th>
                            <th className="p-3 text-left">Departure</th>
                            <th className="p-3 text-left">Arrival</th>
                            <th className="p-3 text-left">Departure Date</th>
                            <th className="p-3 text-left">Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight, index) => (
                            <motion.tr
                                key={index}
                                className="hover:bg-[#d4e9f9] transition-colors"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.5 }}
                            >
                                <td className="p-3 border-b border-[#d4e9f9]">
                                    <FlapDisplay
                                        chars={Presets.ALPHANUM}
                                        length={10}
                                        value={flight.airline}
                                        timing={30}
                                        hinge={false}
                                        className="lightBordered"
                                    />
                                </td>
                                <td className="p-3 border-b border-[#d4e9f9]">
                                    <FlapDisplay
                                        chars={Presets.ALPHANUM}
                                        length={6}
                                        value={flight.flight_no}
                                        timing={30}
                                        hinge={false}
                                        className="lightBordered"
                                    />
                                </td>
                                <td className="p-3 border-b border-[#d4e9f9]">
                                    <FlapDisplay
                                        chars={Presets.ALPHANUM}
                                        length={10}
                                        value={flight.trip_type}
                                        timing={30}
                                        hinge={false}
                                        className="lightBordered"
                                    />
                                </td>
                                <td className="p-3 border-b border-[#d4e9f9]">
                                    <FlapDisplay
                                        chars={Presets.ALPHANUM}
                                        length={3}
                                        value={flight.departure_airport}
                                        timing={30}
                                        hinge={false}
                                        className="lightBordered"
                                    />
                                </td>
                                <td className="p-3 border-b border-[#d4e9f9]">
                                    <FlapDisplay
                                        chars={Presets.ALPHANUM}
                                        length={3}
                                        value={flight.arrival_airport}
                                        timing={30}
                                        hinge={false}
                                        className="lightBordered"
                                    />
                                </td>
                                <td className="p-3 border-b border-[#d4e9f9]">
                                    <FlapDisplay
                                        chars={Presets.ALPHANUM + "-"}
                                        length={10}
                                        value={flight.departure_date}
                                        timing={30}
                                        hinge={false}
                                        className="lightBordered"
                                    />
                                </td>
                                <td className="p-3 border-b border-[#d4e9f9]">
                                    <FlapDisplay
                                        chars={Presets.ALPHANUM + "-"}
                                        length={10}
                                        value={flight.return_date || "N/A"}
                                        timing={30}
                                        hinge={false}
                                        className="lightBordered"
                                    />
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlightBoard;
