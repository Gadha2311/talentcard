"use client";

interface Skill {
  name: string;
  percentage: number;
}

export interface TalentProfile {
  companyName: string;
  companyProfile: string;
  createdAt: number;
  id: number;
  jobTitle: string;
  description: string;
  location: string;
  type: string;
}

interface TalentProfileCardProps {
  profile: TalentProfile;
}

export default function TalentProfileCard({ profile }: TalentProfileCardProps) {
  return (
    <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
      <div className="relative w-full md:w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 flex items-center justify-center p-6">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-64 h-64 bg-blue-300 rounded-full opacity-50"></div>
        </div>

        <div className="relative w-40 h-40 rounded-full overflow-hidden z-10 shadow-xl border-4 border-white">
          <img
            src={profile.companyProfile}
            alt="Profile Picture"
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Member Profile</h1>
        <h2 className="text-xl font-semibold text-blue-700">
          {profile.companyName}
        </h2>

        <p className="text-sm text-gray-600">{profile.jobTitle}</p>
        <p className="text-sm text-gray-700">{profile.type}</p>

        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
      </div>
    </div>
  );
}
