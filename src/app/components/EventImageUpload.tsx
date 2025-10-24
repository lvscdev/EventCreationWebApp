"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

export default function EventImageUpload() {
  const [image, setImage] = useState<string | null>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  }

  return (
    <div className="w-[230px] h-[260px] bg-white/10 rounded-md overflow-hidden relative flex items-center justify-center">
      {image ? (
        <Image src={image} alt="Event Cover" fill className="object-cover" />
      ) : (
        <div className="text-white/50 text-sm">Upload Cover</div>
      )}

      <label className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black/80 transition">
        <Camera size={16} />
        <input type="file" onChange={handleImage} className="hidden" />
      </label>
    </div>
  );
}
