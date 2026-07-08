#!/usr/bin/env python3
"""
Convert Hope//Punk pregen portrait PNGs to smaller JPG files for Roll20.

Recommended:
    python3 tools/convert_pregen_portraits_to_jpg.py --quality 88 --max-width 1024

This keeps the originals and writes converted images to portraits_jpg/.

Use JPG for large portrait art.
Keep PNG for tokens if tokens use transparency.
"""

from __future__ import annotations

import argparse
from pathlib import Path

try:
    from PIL import Image
except ImportError as exc:
    raise SystemExit(
        "Missing dependency: Pillow\n"
        "Install it with:\n"
        "  python3 -m pip install pillow\n"
    ) from exc


def resize_if_needed(img: Image.Image, max_width: int | None, max_height: int | None) -> Image.Image:
    width, height = img.size
    scale = 1.0

    if max_width and width > max_width:
        scale = min(scale, max_width / width)

    if max_height and height > max_height:
        scale = min(scale, max_height / height)

    if scale >= 1.0:
        return img

    new_size = (round(width * scale), round(height * scale))
    return img.resize(new_size, Image.Resampling.LANCZOS)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", default="portraits", help="Source folder. Default: portraits")
    parser.add_argument("--output-dir", default="portraits_jpg", help="Output folder. Default: portraits_jpg")
    parser.add_argument("--quality", type=int, default=88, help="JPEG quality. Default: 88")
    parser.add_argument("--max-width", type=int, default=1024, help="Downscale if wider than this. Default: 1024")
    parser.add_argument("--max-height", type=int, default=None, help="Optional max height")
    parser.add_argument("--optimize", action="store_true", help="Enable JPEG optimizer")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    input_dir = Path(args.input_dir)
    output_dir = Path(args.output_dir)

    if not input_dir.exists():
        raise SystemExit(f"Input folder not found: {input_dir}")

    files = sorted(
        list(input_dir.glob("*.png")) +
        list(input_dir.glob("*.jpg")) +
        list(input_dir.glob("*.jpeg")) +
        list(input_dir.glob("*.webp"))
    )

    if not files:
        raise SystemExit(f"No image files found in {input_dir}")

    if not args.dry_run:
        output_dir.mkdir(parents=True, exist_ok=True)

    before_total = 0
    after_total = 0

    for src in files:
        before = src.stat().st_size
        before_total += before

        with Image.open(src) as img:
            original_size = img.size
            # White background avoids black/transparent artifacts if a portrait has alpha.
            if img.mode in ("RGBA", "LA"):
                bg = Image.new("RGB", img.size, (255, 255, 255))
                bg.paste(img, mask=img.getchannel("A"))
                img = bg
            else:
                img = img.convert("RGB")

            img = resize_if_needed(img, args.max_width, args.max_height)
            out = output_dir / f"{src.stem}.jpg"

            if args.dry_run:
                print(f"{src} -> {out} {original_size[0]}x{original_size[1]} -> {img.size[0]}x{img.size[1]}")
                continue

            img.save(out, "JPEG", quality=args.quality, optimize=args.optimize, progressive=True)
            after = out.stat().st_size
            after_total += after
            print(f"{src.name}: {before/1024:.0f} KiB -> {after/1024:.0f} KiB ({img.size[0]}x{img.size[1]})")

    if not args.dry_run and before_total:
        print()
        print(f"Total: {before_total/1024/1024:.1f} MiB -> {after_total/1024/1024:.1f} MiB")
        print(f"Reduction: {(1 - after_total / before_total) * 100:.1f}%")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
