"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";

export default function EditProfilePage() {
  const { data: session, update } = useSession();

  const [username, setUsername] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState<File | null>(null);

  const [openNameModal, setOpenNameModal] = useState(false);

  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user) {
      setUsername(session.user.name || "");
      setFrontendImage(session.user.image || "");
    }
  }, [session]);

  // IMAGE CHANGE
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  // SAVE IMAGE
  const handleImageSave = async () => {
    if (!backendImage) return;

    const formData = new FormData();
    formData.append("image", backendImage);

    const res = await fetch("/api/user/update-profile", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      await update({ image: data.image });
      alert("Image updated ✅");
    }
  };

  // SAVE NAME
  const handleNameSave = async () => {
    const res = await fetch("/api/user/update-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (res.ok) {
      await update({ name: data.name });
      setOpenNameModal(false);
      alert("Name updated ✅");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center relative">

        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        {/* IMAGE */}
        <div
          onClick={() => imageInput.current?.click()}
          className="relative mx-auto w-32 h-32 mb-4 cursor-pointer"
        >
          <input
            type="file"
            hidden
            accept="image/*"
            ref={imageInput}
            onChange={handleImage}
          />

          {frontendImage ? (
            <img
              src={frontendImage}
              className="w-full h-full rounded-full object-cover border-4 border-indigo-500"
            />
          ) : (
            <div className="w-full h-full rounded-full border-4 border-indigo-500 flex items-center justify-center">
              <CgProfile size={64} />
            </div>
          )}
        </div>

        {/* NAME + EDIT ICON */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <p className="text-lg font-semibold">{username}</p>
          <FiEdit2
            className="cursor-pointer text-gray-600 hover:text-black"
            onClick={() => setOpenNameModal(true)}
          />

        </div>
        {/* <p className="text-gray-500  text-sm">
          {session?.user?.email}
        </p> */}

        {/* SAVE IMAGE */}
        <button
          onClick={handleImageSave}
          className="bg-black cursor-pointer text-white py-2 rounded-full w-full"
        >
         Change Dp
        </button>

      

        {/* 🔥 NAME MODAL */}
        {openNameModal && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-sm rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Edit name</h2>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border px-4 py-2 rounded mb-4"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setOpenNameModal(false)}
                  className="w-1/2 py-2 rounded cursor-pointer border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleNameSave}
                  className="w-1/2 py-2 rounded cursor-pointer bg-black text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
