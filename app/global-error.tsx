"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, Home, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#313338]">
        <div className="h-screen flex flex-col items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertOctagon className="h-10 w-10 text-rose-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Critical Error
            </h1>
            <p className="text-gray-400 mb-8">
              Something went seriously wrong. Please try refreshing the page or return to the home page.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={reset}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-6">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
