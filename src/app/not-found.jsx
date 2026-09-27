'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home } from 'lucide-react';


export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo - Made Bigger */}
        <Image
          src="/logo.avif"
          alt="Logo"
          width={128}
          height={128}
          className="w-32 h-32 object-contain mx-auto mb-8"
        />

        {/* 404 */}
        <h1 className="text-7xl font-bold text-[#298120] mb-3">
          404
        </h1>

        {/* Message */}
        <h2 className="text-xl font-semibold text-white mb-2 bg-[#298120] inline-block px-4 py-1 rounded-full">
          Page Not Found
        </h2>
        
        <p className="text-sm text-gray-800 mb-8 mt-4">
          The page you're looking for doesn't exist.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#298120] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e06600] transition-all"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white text-[#298120] border-2 border-[#298120] px-6 py-3 rounded-full font-semibold hover:bg-[#298120] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}