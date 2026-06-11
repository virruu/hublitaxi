# Fleet images

Drop your vehicle photos here. Each file name should match the `slug` in
`src/data/fleet.json` (e.g. `sedan.jpg` for the Sedan entry).

## Recommended

| Setting    | Value                          |
| ---------- | ------------------------------ |
| Format     | WebP (preferred) or JPG        |
| Size       | 900 × 600 px (3:2 landscape)   |
| File size  | Under 200 KB after compression |

## Updating paths

Set the `image` field in `src/data/fleet.json` to the public URL path:

```json
"image": "/images/fleet/sedan.webp"
```

If you use WebP or another extension, update the path accordingly:

```json
"image": "/images/fleet/sedan.webp"
```

Until a file exists, the site shows a branded placeholder with the vehicle name.
