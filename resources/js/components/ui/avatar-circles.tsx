import { cn } from "@/lib/utils"

import dummy5 from '@/assets/image/dummy-1.jpg';

interface Avatar {
  src: string
  profileUrl?: string
}
interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: Avatar[]
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            key={index}
            className="h-9 w-9 rounded-full border-2 border-white dark:border-gray-800"
            src={url.src}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white overflow-hidden dark:border-gray-800">
          {/* Avatar image */}
          <img
            src={dummy5}
            alt="avatar"
            className="h-full w-full object-cover"
          />

          {/* Overlay hitam transparan */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-xs font-semibold text-white">
              +{numPeople}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
