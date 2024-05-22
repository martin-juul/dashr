import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function proxyImgUrls(htmlStr: string): string {
  const imgRegex = /<img[^>]+src="(.*?)"/g;

  // Replace the src attribute in img tags
  return htmlStr.replace(imgRegex, (match, src) => {
    return match.replace(src, `https://dashr.test/api/imageproxy?url=${encodeURIComponent(src)}`);
  });
}
