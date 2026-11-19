# Akash Sunagar | Personal Portfolio

Static portfolio site (HTML5, CSS3, vanilla JavaScript). No build step, no backend, no Node.js. Works from `index.html` and from an Amazon S3 static website endpoint.

## Folder structure

```
personal-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── resume.pdf        (you add this)
    └── images/
```

All paths are relative.

## Run locally

- Open `index.html` in a browser, or
- In VS Code, install **Live Server**, right-click `index.html`, choose **Open with Live Server**.

Fonts (Manrope, JetBrains Mono) load from Google Fonts. Offline, the site falls back to system fonts.

## Where to edit

Search `index.html` for the comments marked `EDIT`.

| What | Where |
|---|---|
| Email | `mailto:your.email@example.com` (hero is unaffected; contact section has 2 occurrences) |
| GitHub profile | `https://github.com/YOUR_USERNAME` (hero link + contact section) |
| LinkedIn | `https://www.linkedin.com/in/YOUR_USERNAME/` (contact section) |
| Project repositories | Each project card's button: `https://github.com/YOUR_USERNAME/REPO_NAME` |
| KRIST tech stack | The `<ul class="tags">` inside the Project 5 card |
| Certifications | `<article class="card cert-card">` blocks in `#certifications`. Replace the bracketed placeholders; copy a block to add more |
| Achievements | `#achievements`. Replace the card, or add one `<div class="card ach-card">` per achievement |
| Colours | CSS variables at the top of `style.css` (`:root`) |

Tip: use your editor's Find and Replace to swap `YOUR_USERNAME` and `your.email@example.com` everywhere at once.

## Add a resume

1. Save your resume as `assets/resume.pdf`.
2. The **Download Resume** button in the Contact section already points to it.
3. Delete the "Resume placeholder" note line under the buttons.

Until the file exists, the button will return a 404.

## Deploy to Amazon S3 static website hosting

1. **Create a bucket.** S3 console, **Create bucket**. Choose a globally unique name and a region.
2. **Allow public access.** In the bucket creation page, under **Block Public Access settings**, untick **Block all public access** and tick the acknowledgement. (Or later: bucket, **Permissions**, **Block public access**, **Edit**.) Public access is blocked by default and must be explicitly enabled.
3. **Upload files.** Bucket, **Upload**, add `index.html`, `style.css`, `script.js`, and the `assets` folder (drag the folder in so its structure is kept). Do not upload the folder `personal-portfolio` itself; `index.html` must be at the bucket root.
4. **Enable website hosting.** Bucket, **Properties**, scroll to **Static website hosting**, **Edit**, choose **Enable**, hosting type **Host a static website**, set **Index document** to `index.html`, save.
5. **Add a bucket policy.** Bucket, **Permissions**, **Bucket policy**, **Edit**, paste (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

6. **Open the site.** Bucket, **Properties**, **Static website hosting**, copy the **Bucket website endpoint** (looks like `http://YOUR-BUCKET-NAME.s3-website-REGION.amazonaws.com`).

Notes:

- The S3 website endpoint serves **HTTP only**, not HTTPS. Use `http://`. For HTTPS, put CloudFront in front of the bucket (optional, beyond this assignment).
- If you get **403 Forbidden**: re-check that Block Public Access is off and the bucket policy has the correct bucket name followed by `/*`.
- If you get **404**: confirm `index.html` is at the bucket root and is set as the index document.
- To update the site, re-upload the changed files (overwrite). Hard-refresh the browser (Ctrl+Shift+R) to bypass cache.
- Optional: after deployment, add an `og:url` meta tag in `index.html` with your endpoint. An `og:image` needs an absolute URL, so add it only once you know your endpoint.

## Notes on content

- Project descriptions and tags contain only what was provided. No metrics, screenshots or repositories are invented.
- Certifications and achievements are placeholders, clearly labelled.
- The hero pipeline graphic is decorative and labelled "Illustration only".
