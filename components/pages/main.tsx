"use client";
import { useEffect, useState } from "react";
import TalentProfileCard from "@/components/TalentProfileCard";
import { DataTableDemo } from "@/components/DataTable";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [profiles, setProfiles] = useState<any[]>([]);
  console.log(profiles.slice(1));
  
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(
          "https://67205fcae7a5792f0531492a.mockapi.io/api/v1/jobs"
        );
      

        setProfiles(response.data || []);
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
    <div className="min-h-screen bg-[linear-gradient(150deg,_#969696,_#818482,_#6c7370,_#566260,_#425153,_#2f4047,_#1d303e,_#0e1f38)]  p-4 flex flex-col items-center gap-6">
      {loading ? (
      <p>Loading...</p> 
    ) : profiles.length === 0 ? (
        <p>No data found</p>
      ) : (
        <TalentProfileCard profile={profiles[0]} />
      )}

      <div className="w-full max-w-4xl">
      {loading ? (
      <p>Loading...</p> 
    ) : profiles.length === 0 ? (
          <p>No data found</p>
        ) : (
          <DataTableDemo data={profiles.slice(1) ?? []} />
        )}
      </div>
    </div>
  );
}