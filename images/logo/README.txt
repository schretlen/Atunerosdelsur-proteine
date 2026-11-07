LOGO — ASSET REQUIRED
=====================
The header and footer currently render the wordmark as text next to a CSS
gradient bar (.brand__mark in css/style.css).

Supply the official logo as:
  images/logo/company-logo.svg   (preferred, scalable)
  images/logo/company-logo.png   (fallback, min 400px wide, transparent)

Then replace the <span class="brand__mark"></span> in each page header/footer
with:
  <img class="brand__logo" src="images/logo/company-logo.svg" alt="Atuneros del Sur" />
