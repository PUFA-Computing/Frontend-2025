"use client"
import React, { useState } from "react";
import ListVisionAndMissionCard from "@/components/major/ListVisionAndMissionCard";
import ToggleSwitch from "@/components/ToggleSwitch";

interface VnMSectionProps{
    visionContent: string[];
    missionContent: string[];
}

export default function VnMSection({visionContent, missionContent}:VnMSectionProps) {
    const [selectedContent, setSelectedContent] = useState("vision");
    const handleToggleChange = () => {
        setSelectedContent((prevContent) =>
            prevContent === "vision" ? "mission" : "vision"
        );
    };

   
    return (
        <div className="flex flex-col">
            {/* Toggle switch for Vision and Mission */}
            <ToggleSwitch
                selectedContent={selectedContent}
                handleToggleChange={handleToggleChange}
            />

            {/* Content based on the selected toggle */}
            <ListVisionAndMissionCard
                selectedContent={selectedContent}
                visionContent={visionContent}
                missionContent={missionContent}
            />
        </div>
    );
}
