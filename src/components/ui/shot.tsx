import Image from "next/image";

type ShotProps = {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the capture. Reserves space so nothing shifts. */
  width?: number;
  height?: number;
  /** The hero shot is the LCP element and must not be lazy-loaded. */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * A real capture of the app, floated on the canvas with no outline. Depth comes
 * from a single shadow tinted to the canvas hue rather than a drawn border, so
 * the capture reads as the product sitting on the page instead of a picture
 * pinned to it.
 */
export function Shot({
  src,
  alt,
  width = 2880,
  height = 1708,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 1200px",
  className = "",
}: ShotProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg ${className}`}
      style={{ boxShadow: "0 40px 100px -44px rgba(20, 23, 26, 0.45)" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </div>
  );
}
