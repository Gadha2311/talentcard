"use client";
import Image from "next/image";


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
            src={profile.image}
            alt="Profile Picture"

            className="object-cover"
          />
        </div>

        <div className="absolute bottom-8 left-4 bg-orange-500 text-white p-3 rounded-lg w-44 text-center shadow-md transform transition-all duration-300 hover:scale-110">
          <p className="text-xs italic">
            "This is a sample text. Insert your desired text here."
          </p>
        </div>
      </div>

    
      <div className="w-full md:w-1/2 p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Member Profile</h1>
        <h2 className="text-xl font-semibold text-blue-700">{profile.name}</h2>
        <p className="text-sm text-gray-600">{profile.title}</p>
        <p className="text-sm text-gray-700">{profile.bio}</p>

        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
        <div className="flex flex-col gap-3">
          {profile.skills.length > 0 ? (
            profile.skills.map((skill) => (
              <div key={skill.name}>
                <p className="text-xs font-medium text-gray-700">{skill.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300 hover:bg-blue-700"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No skills available.</p>
          )}
        </div>

      
        <button
          onClick={() => (window.location.href = `mailto:${profile.contact}`)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-105"
        >
          Contact
        </button>
      </div>
    </div>
  );
}
