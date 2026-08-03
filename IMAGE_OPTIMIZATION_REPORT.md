# Image optimization report

The production image directory was reduced from **4,362,660 bytes (4.16 MB)** to **3,413,644 bytes (3.26 MB)**, a reduction of **949,016 bytes (21.75%)**. Final values below include every AVIF/WebP responsive alternative generated for that source; a browser downloads only the best matching file for its format, viewport, and pixel density.

| Original source | Original | All final variants | Widths (px) | Formats |
| --- | ---: | ---: | --- | --- |
| about-banner.webp | 81.6 KB | 196 KB | 640/1024/1440 | AVIF + WebP |
| aubrey-novy.jpeg | 356.4 KB | 239.4 KB | 360/720/1200 | AVIF + WebP |
| building.webp | 71.4 KB | 187 KB | 480/800/925 | AVIF + WebP |
| cindy-vanlue.webp | 32.5 KB | 48 KB | 362 | AVIF + WebP |
| daniela-riley.webp | 22.7 KB | 34.5 KB | 362 | AVIF + WebP |
| directory-banner.webp | 120.2 KB | 286.7 KB | 640/1024/1440 | AVIF + WebP |
| hallway.webp | 30.2 KB | 72.4 KB | 320/473 | AVIF + WebP |
| hero-lobby.webp | 107.5 KB | 245 KB | 640/1024/1440 | AVIF + WebP |
| jenelle-suleyman.webp | 10.9 KB | 18.2 KB | 365 | AVIF + WebP |
| lobby-portrait.jpg | 336.3 KB | 308.7 KB | 480/768/1200 | AVIF + WebP |
| lobby-wide.jpg | 395.6 KB | 355.9 KB | 480/768/1200 | AVIF + WebP |
| lobby-window.jpg | 332.7 KB | 302.2 KB | 480/768/1200 | AVIF + WebP |
| malina-glaum.webp | 13.9 KB | 22.1 KB | 360 | AVIF + WebP |
| marblebackground.jpg | 725.2 KB | 71.7 KB | 768/1600 | AVIF + WebP |
| samantha-jacks.webp | 31.5 KB | 47.5 KB | 360 | AVIF + WebP |
| service-esthetician.jpeg | 220.2 KB | 130.3 KB | 480/800/1200 | AVIF + WebP |
| service-hair.jpg | 176.2 KB | 123.1 KB | 480/800/1200 | AVIF + WebP |
| service-lashes.jpg | 210.1 KB | 128.2 KB | 480/800/1200 | AVIF + WebP |
| service-nails.jpg | 224.9 KB | 181.2 KB | 480/800/1200 | AVIF + WebP |
| suites-banner.webp | 92.4 KB | 204.8 KB | 640/1024/1440 | AVIF + WebP |
| vanity.jpg | 173.2 KB | 125.2 KB | 480/768/1200 | AVIF + WebP |
| DiamondSuitesCrystalRiverLogo.webp | 5.5 KB | 5.5 KB | 1020 | WebP |

The 258.1 KB `coffee-station.jpg` and 231.3 KB legacy GIF logo were confirmed unused and excluded from production, but remain preserved in `client/image-sources`. The machine-readable JSON report records the byte size of every individual generated file.
