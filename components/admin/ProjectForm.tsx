'use client';

import React, { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Loader2,
  Save,
  ArrowLeft,
  UploadCloud,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Trash2,
  Star,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  X,
  CheckCircle2,
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DbProject, ProjectInput, projectCategoryEnum } from '@/lib/validations/project';
import { createProject, updateProject, deleteProjectStorageImage } from '@/app/actions/projects';
import { slugify } from '@/lib/supabase/queries';
import { processImageForUpload, uploadProjectImageBlob } from '@/lib/image-client';
import { ProjectImageKind } from '@/types';

interface ProjectFormProps {
  initialData?: DbProject | null;
}

const CATEGORIES = [
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Solar & Hybrid', label: 'Solar & Hybrid' },
] as const;

export interface FormProjectImage {
  id: string;
  project_id?: string;
  url: string;
  alt: string;
  caption: string;
  kind: ProjectImageKind;
  sort_order: number;
  width?: number | null;
  height?: number | null;
  blur_data_url?: string | null;
}

interface UploadQueueItem {
  id: string;
  file: File;
  fileName: string;
  progress: number;
  status: 'resizing' | 'uploading' | 'error' | 'done';
  error?: string;
}

function SortableImageCard({
  image,
  index,
  total,
  isCover,
  onMoveUp,
  onMoveDown,
  onMakeCover,
  onChangeKind,
  onChangeAlt,
  onChangeCaption,
  onDelete,
  altError,
}: {
  image: FormProjectImage;
  index: number;
  total: number;
  isCover: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMakeCover: () => void;
  onChangeKind: (kind: ProjectImageKind) => void;
  onChangeAlt: (alt: string) => void;
  onChangeCaption: (caption: string) => void;
  onDelete: () => void;
  altError?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 30 : 1,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-2xl p-4 transition-all shadow-xs space-y-3 ${
        isCover ? 'border-[#C8102E]/40 ring-1 ring-[#C8102E]/20' : 'border-[#E5E5EA]'
      } ${isDragging ? 'shadow-lg bg-[#FAFBFD]' : ''}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Drag handle & thumbnail */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Drag to reorder photo"
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1.5 text-[#86868B] hover:text-[#0B1E3D] hover:bg-[#F5F5F7] rounded-lg transition-colors focus:outline-none"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-[#0B1E3D]/5 border border-[#E5E5EA] shrink-0">
            <Image
              src={image.url}
              alt={image.alt || 'Project preview'}
              fill
              sizes="96px"
              className="object-cover"
              unoptimized={image.url.startsWith('/') || image.url.startsWith('http')}
            />
            {isCover && (
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#C8102E] text-white shadow-xs">
                Cover
              </span>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 w-full space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#0B1E3D]">
                Photo #{index + 1}
              </span>
              {isCover && (
                <span className="text-[11px] font-medium text-[#C8102E] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Cover Image
                </span>
              )}
            </div>

            {/* Reorder and Cover Actions */}
            <div className="flex items-center gap-1">
              {!isCover && (
                <button
                  type="button"
                  onClick={onMakeCover}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg text-[#0B1E3D] bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors cursor-pointer"
                  title="Make this photo the cover image"
                >
                  Make cover
                </button>
              )}

              <button
                type="button"
                onClick={onMoveUp}
                disabled={index === 0}
                aria-label={`Move photo ${index + 1} up`}
                title="Move up"
                className="p-1.5 rounded-lg text-[#5B6779] hover:text-[#0B1E3D] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onMoveDown}
                disabled={index === total - 1}
                aria-label={`Move photo ${index + 1} down`}
                title="Move down"
                className="p-1.5 rounded-lg text-[#5B6779] hover:text-[#0B1E3D] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onDelete}
                aria-label={`Delete photo ${index + 1}`}
                title="Delete photo"
                className="p-1.5 rounded-lg text-[#5B6779] hover:text-[#C8102E] hover:bg-red-50 transition-colors ml-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Kind Select */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5B6779] mb-1">
                Type
              </label>
              <select
                value={image.kind}
                onChange={(e) => onChangeKind(e.target.value as ProjectImageKind)}
                className="w-full px-2.5 py-1.5 bg-white border border-[#E5E5EA] rounded-lg text-xs text-[#0B1E3D] focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all"
              >
                <option value="gallery">Gallery</option>
                <option value="before">Before</option>
                <option value="after">After</option>
              </select>
            </div>

            {/* Alt Text (Required) */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5B6779] mb-1">
                Alt Text <span className="text-[#C8102E]">*</span>
              </label>
              <input
                type="text"
                value={image.alt}
                onChange={(e) => onChangeAlt(e.target.value)}
                placeholder="Describe engineering subject in image"
                className={`w-full px-2.5 py-1.5 bg-white border rounded-lg text-xs text-[#0B1E3D] placeholder:text-[#5B6779]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all ${
                  altError ? 'border-[#C8102E] bg-red-50/20' : 'border-[#E5E5EA]'
                }`}
              />
              {altError && (
                <p className="text-[11px] text-[#C8102E] font-medium mt-1">{altError}</p>
              )}
            </div>
          </div>

          {/* Caption (Optional) */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5B6779] mb-1">
              Caption (Optional)
            </label>
            <input
              type="text"
              value={image.caption}
              onChange={(e) => onChangeCaption(e.target.value)}
              placeholder="e.g. 33kV switchgear replacement in progress"
              className="w-full px-2.5 py-1.5 bg-white border border-[#E5E5EA] rounded-lg text-xs text-[#0B1E3D] placeholder:text-[#5B6779]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate or preserve project id
  const [projectId] = useState<string>(() => {
    if (initialData?.id) return initialData.id;
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `proj-${Date.now()}`;
  });

  const [title, setTitle] = useState(initialData?.title || '');
  const [clientName, setClientName] = useState(initialData?.client_name || '');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]['value']>(
    (initialData?.category as any) || 'Industrial'
  );
  const [description, setDescription] = useState(initialData?.description || '');
  const [outcome, setOutcome] = useState(initialData?.outcome || '');
  const [published, setPublished] = useState(initialData?.published ?? false);

  // Existing slug or live preview for new
  const isSlugLocked = Boolean(initialData?.slug && initialData?.published);
  const currentSlug = initialData?.slug || (title ? slugify(title) : '');

  // Multi-image list
  const [images, setImages] = useState<FormProjectImage[]>(() => {
    if (initialData?.images && initialData.images.length > 0) {
      return initialData.images.map((img, idx) => ({
        id: img.id || `img-${idx}-${Date.now()}`,
        project_id: img.project_id || initialData.id,
        url: img.url,
        alt: img.alt || initialData.title || '',
        caption: img.caption || '',
        kind: img.kind || 'gallery',
        sort_order: img.sort_order ?? idx,
        width: img.width ?? null,
        height: img.height ?? null,
        blur_data_url: img.blur_data_url ?? null,
      }));
    }
    if (initialData?.cover_image_path) {
      return [
        {
          id: `img-cover-${Date.now()}`,
          project_id: initialData.id,
          url: initialData.cover_image_path,
          alt: initialData.title || '',
          caption: '',
          kind: 'gallery',
          sort_order: 0,
        },
      ];
    }
    return [];
  });

  // Upload queue for progress and retry
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Deletion confirm dialog state
  const [deletingImage, setDeletingImage] = useState<FormProjectImage | null>(null);

  // Inline errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered.map((img, idx) => ({ ...img, sort_order: idx }));
      });
    }
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    setImages((items) => {
      const updated = arrayMove(items, fromIndex, toIndex);
      return updated.map((img, idx) => ({ ...img, sort_order: idx }));
    });
  };

  const makeCover = (index: number) => {
    if (index === 0) return;
    setImages((items) => {
      const updated = arrayMove(items, index, 0);
      return updated.map((img, idx) => ({ ...img, sort_order: idx }));
    });
  };

  // Process & Upload a single file
  const startFileUpload = async (item: UploadQueueItem, indexOffset: number) => {
    // 1. Set status to resizing
    setUploadQueue((prev) =>
      prev.map((q) => (q.id === item.id ? { ...q, status: 'resizing', progress: 10, error: undefined } : q))
    );

    try {
      // 2. Client-side resize in browser
      const processed = await processImageForUpload(item.file);

      // 3. Set status to uploading
      setUploadQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'uploading', progress: 20 } : q))
      );

      // 4. Upload to projects bucket at {projectId}/{timestamp}-{n}.webp
      const timestamp = Date.now();
      const res = await uploadProjectImageBlob({
        blob: processed.blob,
        projectId,
        index: indexOffset,
        timestamp,
        onProgress: (percent) => {
          setUploadQueue((prev) =>
            prev.map((q) => (q.id === item.id ? { ...q, progress: Math.max(20, percent) } : q))
          );
        },
      });

      // 5. Add new image to list
      const newImage: FormProjectImage = {
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        project_id: projectId,
        url: res.url,
        alt: title ? title : '',
        caption: '',
        kind: 'gallery',
        sort_order: images.length,
        width: processed.width,
        height: processed.height,
        blur_data_url: processed.blurDataUrl,
      };

      setImages((prev) => {
        const next = [...prev, newImage];
        return next.map((img, idx) => ({ ...img, sort_order: idx }));
      });

      // Remove from queue
      setUploadQueue((prev) => prev.filter((q) => q.id !== item.id));
    } catch (err: any) {
      setUploadQueue((prev) =>
        prev.map((q) =>
          q.id === item.id
            ? { ...q, status: 'error', error: err?.message || 'Failed to upload photo.' }
            : q
        )
      );
    }
  };

  const handleFilesAdded = (fileList: FileList | File[]) => {
    const rawFiles = Array.from(fileList);
    const validFiles = rawFiles.filter((f) =>
      f.type.startsWith('image/') || f.name.match(/\.(jpe?g|png|webp)$/i)
    );

    if (validFiles.length === 0) {
      setGeneralError('Please select valid JPEG, PNG, or WebP images.');
      return;
    }

    const availableSlots = 12 - (images.length + uploadQueue.length);
    if (availableSlots <= 0) {
      setGeneralError('Maximum limit of 12 images reached.');
      return;
    }

    const filesToUpload = validFiles.slice(0, availableSlots);
    if (filesToUpload.length < validFiles.length) {
      setGeneralError(`Only ${availableSlots} more photo(s) can be added (12 images max).`);
    } else {
      setGeneralError(null);
    }

    const newQueueItems: UploadQueueItem[] = filesToUpload.map((f, i) => ({
      id: `queue-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 5)}`,
      file: f,
      fileName: f.name,
      progress: 0,
      status: 'resizing',
    }));

    setUploadQueue((prev) => [...prev, ...newQueueItems]);

    // Start upload for each
    newQueueItems.forEach((qItem, i) => {
      startFileUpload(qItem, images.length + i);
    });
  };

  const retryUpload = (item: UploadQueueItem) => {
    startFileUpload(item, images.length);
  };

  const cancelUpload = (id: string) => {
    setUploadQueue((prev) => prev.filter((q) => q.id !== id));
  };

  const confirmDelete = async () => {
    if (!deletingImage) return;
    const target = deletingImage;
    setDeletingImage(null);

    // Remove from state first
    setImages((prev) => {
      const remaining = prev.filter((img) => img.id !== target.id);
      return remaining.map((img, idx) => ({ ...img, sort_order: idx }));
    });

    // Delete storage object in background
    try {
      await deleteProjectStorageImage(target.url);
    } catch {
      // storage deletion logged on server
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!title.trim() || title.trim().length < 2) {
      errors.title = 'Title must be at least 2 characters.';
    }

    if (published) {
      if (!outcome.trim()) {
        errors.outcome = 'Outcome is required before publishing.';
      }
      if (images.length === 0) {
        errors.images = 'At least one image is required to publish this project.';
      } else {
        images.forEach((img, idx) => {
          if (!img.alt.trim()) {
            errors[`image_alt_${img.id}`] = 'Alt text is required before publishing.';
          }
        });
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      setGeneralError('Please resolve the highlighted validation errors before saving.');
      return;
    }

    const coverUrl = images.length > 0 ? images[0].url : null;

    const payload: ProjectInput = {
      id: projectId,
      slug: initialData?.slug,
      title: title.trim(),
      client_name: clientName.trim() || '',
      category,
      description: description.trim() || '',
      outcome: outcome.trim() || null,
      cover_image_path: coverUrl,
      sort_order: initialData?.sort_order ?? 0,
      published,
      images: images.map((img, idx) => ({
        id: img.id.startsWith('img-') || img.id.startsWith('temp-') ? undefined : img.id,
        project_id: projectId,
        url: img.url,
        alt: img.alt.trim(),
        caption: img.caption.trim() || null,
        kind: img.kind,
        sort_order: idx,
        width: img.width ?? null,
        height: img.height ?? null,
        blur_data_url: img.blur_data_url ?? null,
      })),
    };

    startTransition(async () => {
      let res;
      if (initialData?.id) {
        res = await updateProject(initialData.id, payload);
      } else {
        res = await createProject(payload);
      }

      if (!res.success) {
        setGeneralError(res.error || 'An error occurred while saving the project.');
      } else {
        router.push('/admin/projects');
        router.refresh();
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white border border-[#E5E5EA] p-6 sm:p-8 rounded-2xl shadow-xs">
        {/* General Error Banner */}
        {generalError && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-[#C8102E] font-medium flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#C8102E]" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Project Images Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0B1E3D] flex items-center gap-2">
                <span>Project Photography</span>
                <span className="text-xs font-normal text-[#5B6779]">
                  ({images.length}/12 photos)
                </span>
              </h2>
              <p className="text-xs text-[#5B6779] mt-0.5">
                Upload up to 12 photos. The first image serves as the case study cover.
              </p>
            </div>
          </div>

          {/* Inline Image Error */}
          {fieldErrors.images && (
            <p className="text-xs text-[#C8102E] font-medium flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{fieldErrors.images}</span>
            </p>
          )}

          {/* Drag & Drop Upload Dropzone */}
          {images.length < 12 ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (e.dataTransfer.files) {
                  handleFilesAdded(e.dataTransfer.files);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-[#C8102E] bg-red-50/20'
                  : 'border-[#DDE2EA] hover:border-[#0B1E3D]/40 bg-[#F6F7F9]/50 hover:bg-[#F6F7F9]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFilesAdded(e.target.files);
                    e.target.value = '';
                  }
                }}
              />
              <div className="max-w-xs mx-auto space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-white border border-[#DDE2EA] flex items-center justify-center text-[#0B1E3D]">
                  <UploadCloud className="w-5 h-5 text-[#C8102E]" />
                </div>
                <div className="text-xs font-semibold text-[#0B1E3D]">
                  Drag & drop photos here, or <span className="text-[#C8102E] underline">browse</span>
                </div>
                <p className="text-[11px] text-[#5B6779]">
                  JPEG, PNG, or WebP. Automatically resized to max 2000px, converted to WebP with blur placeholder.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-[#F6F7F9] border border-[#DDE2EA] p-3 text-center text-xs text-[#5B6779]">
              Maximum 12 photos reached. Delete an image to upload more.
            </div>
          )}

          {/* In-Flight Upload Queue Items */}
          {uploadQueue.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6779]">
                Uploading Files ({uploadQueue.length})
              </span>
              <div className="space-y-2">
                {uploadQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white border border-[#E5E5EA] rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-[#0B1E3D] truncate">{item.fileName}</span>
                        <span className="text-[11px] text-[#5B6779]">
                          {item.status === 'resizing' && 'Resizing & optimizing...'}
                          {item.status === 'uploading' && `Uploading: ${item.progress}%`}
                          {item.status === 'error' && 'Failed'}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-[#E5E5EA] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            item.status === 'error' ? 'bg-[#C8102E]' : 'bg-[#0B1E3D]'
                          }`}
                          style={{ width: `${item.status === 'error' ? 100 : item.progress}%` }}
                        />
                      </div>

                      {item.error && (
                        <p className="text-[11px] text-[#C8102E] mt-1">{item.error}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {item.status === 'error' && (
                        <button
                          type="button"
                          onClick={() => retryUpload(item)}
                          className="px-2 py-1 rounded bg-[#0B1E3D] text-white text-[11px] font-medium flex items-center gap-1 hover:bg-[#122B55] cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => cancelUpload(item.id)}
                        className="p-1 rounded text-[#5B6779] hover:text-[#0B1E3D] transition-colors"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reorderable Image Cards */}
          {images.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="text-[11px] text-[#5B6779] flex items-center justify-between">
                <span>Drag handle or use arrow buttons to arrange order.</span>
                <span>Cover photo is position #1</span>
              </div>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={images.map((img) => img.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {images.map((img, idx) => (
                      <SortableImageCard
                        key={img.id}
                        image={img}
                        index={idx}
                        total={images.length}
                        isCover={idx === 0}
                        onMoveUp={() => moveImage(idx, idx - 1)}
                        onMoveDown={() => moveImage(idx, idx + 1)}
                        onMakeCover={() => makeCover(idx)}
                        onChangeKind={(kind) =>
                          setImages((prev) =>
                            prev.map((item) => (item.id === img.id ? { ...item, kind } : item))
                          )
                        }
                        onChangeAlt={(alt) =>
                          setImages((prev) =>
                            prev.map((item) => (item.id === img.id ? { ...item, alt } : item))
                          )
                        }
                        onChangeCaption={(caption) =>
                          setImages((prev) =>
                            prev.map((item) => (item.id === img.id ? { ...item, caption } : item))
                          )
                        }
                        onDelete={() => setDeletingImage(img)}
                        altError={fieldErrors[`image_alt_${img.id}`]}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="pt-6 border-t border-[#E5E5EA] space-y-6">
          {/* Project Title */}
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="block text-xs font-semibold uppercase tracking-wider text-[#0B1E3D]"
            >
              Project Title <span className="text-[#C8102E]">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (fieldErrors.title) {
                  setFieldErrors((prev) => ({ ...prev, title: '' }));
                }
              }}
              placeholder="e.g. 33kV/11kV Heavy Industrial Substation Overhaul"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#0B1E3D] placeholder:text-[#5B6779]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all ${
                fieldErrors.title ? 'border-[#C8102E] bg-red-50/20' : 'border-[#E5E5EA]'
              }`}
            />
            {fieldErrors.title && (
              <p className="text-xs text-[#C8102E] font-medium">{fieldErrors.title}</p>
            )}

            {/* Slug Info */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#5B6779]">
              <span>Slug:</span>
              <code className="px-2 py-0.5 rounded bg-[#F6F7F9] border border-[#E5E5EA] font-mono text-[#0B1E3D]">
                /projects/{currentSlug || 'auto-generated-slug'}
              </code>
              {isSlugLocked && (
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Locked (Published)
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Client Name (Optional) */}
            <div className="space-y-1.5">
              <label
                htmlFor="clientName"
                className="block text-xs font-semibold uppercase tracking-wider text-[#0B1E3D]"
              >
                Client / Facility Name <span className="text-[#5B6779] font-normal lowercase">(optional)</span>
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Tema Heavy Steel Mills Ltd."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#0B1E3D] placeholder:text-[#5B6779]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label
                htmlFor="category"
                className="block text-xs font-semibold uppercase tracking-wider text-[#0B1E3D]"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#0B1E3D] focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description (Optional) */}
          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="block text-xs font-semibold uppercase tracking-wider text-[#0B1E3D]"
            >
              Project Scope & Description <span className="text-[#5B6779] font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe engineering scope, challenges resolved, equipment installed, and technical execution..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm text-[#0B1E3D] placeholder:text-[#5B6779]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all resize-y"
            />
          </div>

          {/* Outcome / Result (Required for publish) */}
          <div className="space-y-1.5">
            <label
              htmlFor="outcome"
              className="block text-xs font-semibold uppercase tracking-wider text-[#0B1E3D]"
            >
              Measured Outcome / Impact {published && <span className="text-[#C8102E]">*</span>}
            </label>
            <textarea
              id="outcome"
              rows={2}
              value={outcome}
              onChange={(e) => {
                setOutcome(e.target.value);
                if (fieldErrors.outcome) {
                  setFieldErrors((prev) => ({ ...prev, outcome: '' }));
                }
              }}
              placeholder="e.g. 99.99% operational uptime achieved; eliminated monthly unplanned grid trip-outs."
              className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-[#0B1E3D] placeholder:text-[#5B6779]/60 focus:outline-none focus:ring-1 focus:ring-[#C8102E] transition-all resize-y ${
                fieldErrors.outcome ? 'border-[#C8102E] bg-red-50/20' : 'border-[#E5E5EA]'
              }`}
            />
            {fieldErrors.outcome && (
              <p className="text-xs text-[#C8102E] font-medium">{fieldErrors.outcome}</p>
            )}
          </div>

          {/* Published Toggle */}
          <div className="pt-4 border-t border-[#E5E5EA] flex items-center justify-between">
            <div>
              <label
                htmlFor="published"
                className="text-sm font-semibold text-[#0B1E3D] block cursor-pointer"
              >
                Live Visibility Status
              </label>
              <p className="text-xs text-[#5B6779]">
                Publishing requires a title, measured outcome, and at least 1 image with alt text.
              </p>
            </div>
            <input
              id="published"
              type="checkbox"
              checked={published}
              onChange={(e) => {
                setPublished(e.target.checked);
                setFieldErrors({});
              }}
              className="w-5 h-5 rounded border-[#DDE2EA] text-[#C8102E] focus:ring-[#C8102E] cursor-pointer accent-[#C8102E]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E5E5EA] flex items-center justify-between gap-4">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#5B6779] hover:text-[#0B1E3D] bg-white border border-[#E5E5EA] hover:bg-[#F6F7F9] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </Link>

            <button
              type="submit"
              disabled={isPending || uploadQueue.some((q) => q.status === 'uploading' || q.status === 'resizing')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C8102E] hover:bg-[#A60D25] text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{initialData ? 'Update Project' : 'Create Project'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {deletingImage && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#E5E5EA] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center shrink-0 border border-red-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setDeletingImage(null)}
                className="w-8 h-8 rounded-lg bg-[#F5F5F7] hover:bg-[#E5E5EA] flex items-center justify-center text-[#5B6779] hover:text-[#0B1E3D] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[#0B1E3D]">
                Delete this photo?
              </h3>
              <p className="text-xs text-[#5B6779] leading-relaxed">
                This will remove the photo from the case study and delete its file from storage. This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingImage(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5B6779] hover:text-[#0B1E3D] bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#C8102E] hover:bg-[#A60D25] shadow-xs transition-colors"
              >
                Delete Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
