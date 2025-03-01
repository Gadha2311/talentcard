"use client";
// import { useState } from "react";
import data from "@/lib/db.json"
import TalentProfileCard from "@/components/TalentProfileCard";

interface Skill {
  name: string;
  percentage: number;
}

interface TalentProfile {
  name: string;
  title: string;
  image: string;
  bio: string;
  skills: Skill[];
  contact: string;
}

export default function Home() {
//   const [profile, setProfile] = useState<TalentProfile | null>(null);
//   const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <TalentProfileCard profile={data.profile} />
    </div>
  );
}
