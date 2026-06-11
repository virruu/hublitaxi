# Open Graph (social sharing) image

Used when your site link is shared on WhatsApp, Facebook, X/Twitter, LinkedIn, etc.

## File

| Setting   | Value                    |
| --------- | ------------------------ |
| Path      | `public/images/og.jpg`   |
| URL       | `/images/og.jpg`         |
| Size      | **1200 × 630 px**        |
| Format    | JPG or PNG               |
| Safe zone | Keep text/logo inside center 80% |

## Replace the placeholder

1. Design or export your share image at 1200×630.
2. Save it as **`og.jpg`** in this folder (`public/images/`), overwriting the placeholder.
3. If you use another name or format, update `ogImage` in **`src/data/site.ts`**.

The path is wired into:

- Root layout Open Graph + Twitter metadata
- JSON-LD `TaxiService` structured data

Child pages (routes, services) inherit this image unless they set their own later.
