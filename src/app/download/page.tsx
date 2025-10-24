"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  BookOpen,
  ArrowLeft,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DownloadPage() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(0);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      try {
        // Validate token with your backend
        const response = await fetch(`/api/validate-download?token=${token}`);
        const data = await response.json();

        if (data.valid) {
          setIsValid(true);
          setDownloadCount(data.downloadCount || 0);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleDownload = async () => {
    try {
      // Track download in your analytics
      await fetch(`/api/track-download?token=${token}`, {
        method: "POST",
      });

      // Trigger actual download
      const response = await fetch("/api/download-ebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "The-Story-That-Sells-Framework.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setDownloadCount((prev) => prev + 1);
      } else {
        throw new Error("Download failed");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Please try again or contact support.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#073D93] via-[#0D60D8] to-[#1781FF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Validating download link...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#073D93] via-[#0D60D8] to-[#1781FF] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Invalid Download Link
          </h1>
          <p className="text-blue-200 mb-8">
            This download link is invalid or has expired. Please request a new
            download link.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Landing Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#073D93] via-[#0D60D8] to-[#1781FF]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <BookOpen className="w-10 h-10 text-purple-600" />
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Free Ebook is Ready! 🎉
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              "The Budding Storyteller: 5 Stories Your Business Needs to Tell to
              Sell"
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What You'll Learn
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-3">1.</span>
                <span>
                  <strong>The Hero Story:</strong> Transform your customers into
                  the main character of their own success story
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-3">2.</span>
                <span>
                  <strong>The Guide Story:</strong> Position your brand as the
                  trusted mentor who helps customers achieve their goals
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-3">3.</span>
                <span>
                  <strong>The Strategy Story:</strong> Present your process as a
                  clear, actionable framework customers can follow
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-3">4.</span>
                <span>
                  <strong>The Failed Story:</strong> Build trust through honest
                  mistakes and lessons learned along the way
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-3">5.</span>
                <span>
                  <strong>The Success Story:</strong> Showcase transformation
                  and results that inspire action
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-200 shadow-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              Download Your Free Ebook Now
            </motion.button>

            <p className="text-sm text-gray-500 mt-4">
              PDF format • 47 pages • Instant download
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Ready to Take Your Storytelling Further?
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Free Consultation
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get personalized guidance on implementing storytelling in your
                  business
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Schedule Now
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  WhatsApp Community
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Daily tips, peer support, exclusive content
                </p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                  Join Now
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Workshop Waitlist
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Be first to know about upcoming storytelling workshops
                </p>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
                  Get on Waitlist
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
