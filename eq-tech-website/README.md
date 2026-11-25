# EQ. Tech website

A responsive, one-page company profile for EQ. Tech (Equipped Technologies).

## Files
- `index.html` — page content and structure
- `styles.css` — responsive black-and-white visual system
- `script.js` — mobile navigation, contact form submission and footer year

## Preview locally
Open `index.html` in a browser. The Google Fonts import requires an internet connection; fallback fonts are included.

## Publish with GitHub Pages
1. Create a GitHub repository, for example `eq-tech`.
2. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. GitHub will provide the published Pages URL.

To use `equippedtechnologies.co.za`, configure the custom domain in GitHub Pages and add the DNS records GitHub specifies at your domain registrar. Enable HTTPS once DNS has propagated.

## Connect the contact form (required before launch)
The direct email links (`mailto:` and `tel:`) work as soon as the page is published. The website enquiry form needs a form-processing endpoint because GitHub Pages is static hosting and does not run server-side email code.

This project is prepared for Formspree:
1. Create a Formspree account and a new form.
2. Set the destination/recipient to `hello@equippedtechnologies.co.za`.
3. Verify the recipient address if Formspree asks.
4. Copy the unique endpoint, in the format `https://formspree.io/f/xxxxxxxx`.
5. Open `script.js` and replace `YOUR_FORMSPREE_ENDPOINT` with that endpoint.
6. Commit the change to GitHub.
7. Test the form from the published website and confirm the message arrives in the company inbox.

Do not publish a Formspree endpoint until the form is created and its recipient is verified. Never put an email account password, API secret or private token in this repository.

## Content and claims
The HealthOS section is intentionally careful: the business plan identifies technical, security, privacy and acceptance checks that must be completed before live patient-data deployment. Update the wording only when the relevant release evidence supports stronger claims.
