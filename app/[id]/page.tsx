"use client";
import TalentProfileCard, { TalentProfile } from "@/components/TalentProfileCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://67205fcae7a5792f0531492a.mockapi.io/api/v1/jobs/${id}`
        );
        console.log(response.data);
        
        setProfile(response.data);

      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen min-w-full bg-[linear-gradient(150deg,_#969696,_#818482,_#6c7370,_#566260,_#425153,_#2f4047,_#1d303e,_#0e1f38)]  flex items-center justify-center">
    {!loading && <TalentProfileCard profile={profile!}/>}
    </div>
  )
}

export default page;
