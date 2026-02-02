"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

        {/* Profile Image */}

        <div className="relative mx-auto w-32 h-32 mb-4 flex items-center justify-center">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-indigo-500"
            />
          ) : (
            <div className="w-full h-full rounded-full border-4 border-indigo-500 flex items-center justify-center bg-gray-100">
              <CgProfile size={64} className="text-gray-400" />
            </div>
          )}
          {/* Edit Icon */}
          <button
            onClick={() => router.push("/profile/edit")}
            className="cursor-pointer absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
            title="Edit Profile"
          >
            <FiEdit2 size={16} />
          </button>
        </div>

        {/* Email */}
        <p className="text-gray-600">{session?.user?.email}</p>
      </div>
    </div>
  );
}
