import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#313338]">
      <Loader2 className="h-12 w-12 text-indigo-500 animate-spin" />
      <p className="text-gray-400 mt-4 text-lg">Loading...</p>
    </div>
  );
}
