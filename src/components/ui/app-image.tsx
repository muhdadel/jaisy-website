import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/utils/base-path";

/**
 * next/image does not prepend `basePath` when `images.unoptimized` is on
 * (the GitHub Pages export). Every public asset must go through here.
 */
export function AppImage({ src, ...props }: ImageProps) {
  const resolved = typeof src === "string" ? withBasePath(src) : src;
  return <Image src={resolved} {...props} />;
}
