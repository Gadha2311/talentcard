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
        // console.log(response.data);

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
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center gap-6">
      {!profiles || profiles.length === 0 ? (
        <p>No data found</p>
      ) : (
        <TalentProfileCard profile={profiles[0]} />
      )}

      <div className="w-full max-w-4xl">
        {!profiles || profiles.length === 0 ? (
          <p>No data found</p>
        ) : (
          <DataTableDemo data={profiles.slice(1) ?? []} />
        )}
      </div>
    </div>
  );
}