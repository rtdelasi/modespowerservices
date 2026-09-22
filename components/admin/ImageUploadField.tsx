'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { uploadImage, StorageBucket } from '@/lib/supabase/storage';
import { cn } from '@/lib/utils';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  bucket: StorageBucket;
  error?: string;
  required?: boolean;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  bucket,
  error,
  required = false,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image file must be under 10MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadImage(file, bucket);
      if (result.error) {
        setUploadError(result.error);
      } else if (result.publicUrl) {
        onChange(result.publicUrl);
      }
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setIsUrlMode(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider block">
          {label} {required && <span className="text-[#C8102E]">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setIsUrlMode(!isUrlMode)}
          className="text-[11px] text-[#86868B] hover:text-[#1D1D1F] underline transition-colors"
        >
          {isUrlMode ? 'Switch to file upload' : 'Enter direct URL instead'}
        </button>
      </div>

      {isUrlMode ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://... (or switch to file upload)"
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#E5E5EA] text-xs text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]/20 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 rounded-xl bg-[#1D1D1F] text-white text-xs font-semibold hover:bg-[#333336] transition-colors"
          >
            Apply URL
          </button>
        </div>
      ) : (
        <div
          onClick={() => !value && !isUploading && fileInputRef.current?.click()}
          className={cn(
            'relative w-full rounded-2xl border transition-all p-4 text-center flex flex-col items-center justify-center min-h-[140px]',
            value
              ? 'border-[#E5E5EA] bg-[#F5F5F7]'
              : 'border-dashed border-[#D1D1D6] hover:border-[#C8102E]/60 bg-[#FAFAFA] hover:bg-white cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]',
            isUploading && 'pointer-events-none opacity-60'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {value ? (
            <div className="relative w-full flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-[#1D1D1F] shrink-0 border border-[#E5E5EA]">
                <Image
                  src={value}
                  alt="Uploaded preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-left space-y-1 overflow-hidden w-full">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Image Uploaded</span>
                </div>
                <p className="text-[11px] font-mono text-[#86868B] truncate max-w-md">
                  {value}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="text-xs font-semibold text-[#1D1D1F] hover:text-[#C8102E] transition-colors cursor-pointer"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4 text-[#86868B]">
              <Loader2 className="w-5 h-5 animate-spin text-[#C8102E]" />
              <span className="text-xs font-medium">Uploading image to CDN storage...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-3 text-[#86868B] select-none">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E5EA] text-[#1D1D1F] flex items-center justify-center shadow-xs">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#1D1D1F]">Click to upload or drag image here</span>
                <p className="text-[11px] text-[#86868B] mt-0.5">
                  PNG, JPG, WEBP up to 10MB (Bucket: {bucket})
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {(uploadError || error) && (
        <p className="text-xs font-medium text-red-600 pt-0.5">
          {uploadError || error}
        </p>
      )}
    </div>
  );
}
