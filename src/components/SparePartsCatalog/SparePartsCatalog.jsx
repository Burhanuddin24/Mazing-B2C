import React from 'react';
import './SparePartsCatalog.css';

// ─── Brand color ────────────────────────────────────────────────────────────
const TEAL = '#00B5C8';

// ─── SVG: OPEL circle icon (teal circle with white 5-pointed star, rotated) ─
function OpelCircleIcon({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill={TEAL} />
      {/* White 5-pointed star, rotated ~−30° so top-left arm is dominant */}
      <polygon
        points="31.5,18 51.6,35.1 74.8,22.5 64.7,46.9 83.8,65.1 57.5,63 46.1,86.7 40,61.1 13.8,57.7 36.3,43.9"
        fill="white"
      />
    </svg>
  );
}

// ─── SVG: Hotel Select icon (placeholder — replace with actual asset) ────────
function HotelSelectCircleIcon({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill={TEAL} />
      {/* Simple hotel-style H icon */}
      <rect x="24" y="25" width="12" height="50" fill="white" />
      <rect x="64" y="25" width="12" height="50" fill="white" />
      <rect x="24" y="44" width="52" height="12" fill="white" />
      {/* Star above */}
      <polygon
        points="50,8 53,16 62,16 55,22 57.5,30 50,25 42.5,30 45,22 38,16 47,16"
        fill="white"
        opacity="0.85"
      />
    </svg>
  );
}

// ─── Logo Component ──────────────────────────────────────────────────────────
function BrandLogo({ brand = 'opel', iconSize = 24 }) {
  const textSize = Math.round(iconSize * 0.84);
  const regSize  = Math.round(iconSize * 0.34);

  if (brand === 'hotel-select') {
    return (
      <span className="brand-logo">
        <HotelSelectCircleIcon size={iconSize} />
        <span className="brand-logo__text" style={{ fontSize: textSize }}>
          HOTEL SELECT
        </span>
        <sup className="brand-logo__reg" style={{ fontSize: regSize }}>®</sup>
      </span>
    );
  }

  return (
    <span className="brand-logo">
      <OpelCircleIcon size={iconSize} />
      <span className="brand-logo__text" style={{ fontSize: textSize }}>
        PEL
      </span>
      <sup className="brand-logo__reg" style={{ fontSize: regSize }}>®</sup>
    </span>
  );
}

// ─── Watermark (faint background circle shown in hero area) ─────────────────
function PageWatermark({ brand = 'opel', size = 220 }) {
  if (brand === 'hotel-select') {
    return (
      <svg
        className="page-watermark"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="47" stroke={TEAL} strokeWidth="4" />
        <rect x="24" y="25" width="12" height="50" fill={TEAL} />
        <rect x="64" y="25" width="12" height="50" fill={TEAL} />
        <rect x="24" y="44" width="52" height="12" fill={TEAL} />
        <polygon
          points="50,8 53,16 62,16 55,22 57.5,30 50,25 42.5,30 45,22 38,16 47,16"
          fill={TEAL}
        />
      </svg>
    );
  }

  return (
    <svg
      className="page-watermark"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="47" stroke={TEAL} strokeWidth="4" />
      <polygon
        points="31.5,18 51.6,35.1 74.8,22.5 64.7,46.9 83.8,65.1 57.5,63 46.1,86.7 40,61.1 13.8,57.7 36.3,43.9"
        fill={TEAL}
      />
    </svg>
  );
}

// ─── Chevron background decoration for parts grid ────────────────────────────
function GridChevrons() {
  return (
    <svg
      className="grid-chevrons"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Five horizontal bands of chevrons, one per row */}
      {[0, 1, 2, 3, 4].map((row) => {
        const y = row * 20; // each band = 20% of SVG height
        return (
          <g key={row}>
            <polygon
              points={`
                ${22},${y + 2}
                ${46},${y + 2}
                ${58},${y + 10}
                ${46},${y + 18}
                ${22},${y + 18}
                ${34},${y + 10}
              `}
              fill={TEAL}
              opacity="0.13"
            />
            <polygon
              points={`
                ${40},${y + 2}
                ${64},${y + 2}
                ${76},${y + 10}
                ${64},${y + 18}
                ${40},${y + 18}
                ${52},${y + 10}
              `}
              fill={TEAL}
              opacity="0.09"
            />
            <polygon
              points={`
                ${58},${y + 2}
                ${82},${y + 2}
                ${94},${y + 10}
                ${82},${y + 18}
                ${58},${y + 18}
                ${70},${y + 10}
              `}
              fill={TEAL}
              opacity="0.06"
            />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Google Play badge (inline SVG) ─────────────────────────────────────────
function GooglePlayBadge() {
  return (
    <svg
      className="google-play-badge"
      viewBox="0 0 160 47"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="160" height="47" rx="6" fill="#000" />
      <text x="50" y="16" fill="white" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="400">
        GET IT ON
      </text>
      {/* Play triangle */}
      <polygon points="26,18 26,34 38,26" fill="white" />
      {/* Google Play wordmark approximation */}
      <text x="50" y="34" fill="white" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="700">
        Google Play
      </text>
    </svg>
  );
}

// ─── QR placeholder ──────────────────────────────────────────────────────────
function QrPlaceholder() {
  return (
    <div className="qr-placeholder">
      <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="60" height="60" fill="white" />
        {/* Corner squares */}
        <rect x="2"  y="2"  width="18" height="18" fill="none" stroke="#000" strokeWidth="2.5" />
        <rect x="5"  y="5"  width="12" height="12" fill="#000" />
        <rect x="40" y="2"  width="18" height="18" fill="none" stroke="#000" strokeWidth="2.5" />
        <rect x="43" y="5"  width="12" height="12" fill="#000" />
        <rect x="2"  y="40" width="18" height="18" fill="none" stroke="#000" strokeWidth="2.5" />
        <rect x="5"  y="43" width="12" height="12" fill="#000" />
        {/* Filler dots */}
        <rect x="24" y="4"  width="4" height="4" fill="#000" />
        <rect x="30" y="4"  width="4" height="4" fill="#000" />
        <rect x="24" y="10" width="4" height="4" fill="#000" />
        <rect x="30" y="10" width="4" height="4" fill="#000" />
        <rect x="24" y="16" width="4" height="4" fill="#000" />
        <rect x="4"  y="24" width="4" height="4" fill="#000" />
        <rect x="10" y="24" width="4" height="4" fill="#000" />
        <rect x="16" y="24" width="4" height="4" fill="#000" />
        <rect x="22" y="24" width="4" height="4" fill="#000" />
        <rect x="28" y="24" width="4" height="4" fill="#000" />
        <rect x="34" y="24" width="4" height="4" fill="#000" />
        <rect x="40" y="24" width="4" height="4" fill="#000" />
        <rect x="46" y="24" width="4" height="4" fill="#000" />
        <rect x="52" y="24" width="4" height="4" fill="#000" />
        <rect x="24" y="28" width="4" height="4" fill="#000" />
        <rect x="30" y="28" width="4" height="4" fill="#000" />
        <rect x="36" y="28" width="4" height="4" fill="#000" />
        <rect x="42" y="28" width="4" height="4" fill="#000" />
        <rect x="24" y="34" width="4" height="4" fill="#000" />
        <rect x="30" y="34" width="4" height="4" fill="#000" />
        <rect x="40" y="34" width="4" height="4" fill="#000" />
        <rect x="46" y="34" width="4" height="4" fill="#000" />
        <rect x="24" y="40" width="4" height="4" fill="#000" />
        <rect x="30" y="46" width="4" height="4" fill="#000" />
        <rect x="36" y="52" width="4" height="4" fill="#000" />
        <rect x="42" y="46" width="4" height="4" fill="#000" />
        <rect x="52" y="34" width="4" height="4" fill="#000" />
        <rect x="52" y="40" width="4" height="4" fill="#000" />
        <rect x="52" y="46" width="4" height="4" fill="#000" />
        <rect x="52" y="52" width="4" height="4" fill="#000" />
      </svg>
    </div>
  );
}

// ─── Default parts data (from SPARE PARTS 6-100 catalog) ────────────────────
export const DEFAULT_PARTS = [
  { code: 'MZ35696', name: 'AB WASHER' },
  { code: 'MZ35687', name: 'BEARING HOUSING PVC' },
  { code: 'MZ35690', name: 'BEARING HOUSING WITH BEARING' },
  { code: 'MZ35689', name: 'BEARING RUBBER' },
  { code: 'MZ35697', name: 'BODY SET' },
  { code: 'MZ35693', name: 'CARBON HOLDER' },
  { code: 'MZ35682', name: 'GEAR' },
  { code: 'MZ35684', name: 'GEAR BOX' },
  { code: 'MZ35681', name: 'GEAR SET STRAIGHT TEETH' },
  { code: 'MZ35688', name: 'KNOB ROD' },
  { code: 'MZ35685', name: 'LOCK SET' },
  { code: 'MZ35686', name: 'NIDDLE BEARING HK0810' },
  { code: 'MZ35694', name: 'SPANNER' },
  { code: 'MZ35695', name: 'SPANNER HEAVY' },
  { code: 'MZ35683', name: 'SPINDLE' },
  { code: 'MZ35692', name: 'SWITCH' },
  { code: 'MZ35691', name: 'SWITCH HEAVY QUALITY' },
  { code: 'MZ13072', name: 'ARMATURE' },
  { code: 'MZ07756', name: 'CARBON' },
  { code: 'MZ13066', name: 'COIL' },
];

// ─── Main Component ──────────────────────────────────────────────────────────
/**
 * SparePartsCatalog
 *
 * Props:
 *  brand           – 'opel' | 'hotel-select'   (default: 'opel')
 *  productCode     – badge label prefix         (default: '6-100')
 *  mainProductImage – URL/src for hero image    (default: null → placeholder)
 *  parts           – array of { code, name, image? }
 *  qrCodeImage     – URL/src for QR code        (default: null → placeholder)
 *  websiteUrl      – website shown in footer    (default: 'www.mazingbusiness.com')
 *  downloadText    – CTA text in footer         (default shown below)
 *  downloadSubText – sub-line below CTA         (default shown below)
 */
export default function SparePartsCatalog({
  brand           = 'opel',
  productCode     = '6-100',
  mainProductImage = null,
  parts           = DEFAULT_PARTS,
  qrCodeImage     = null,
  websiteUrl      = 'www.mazingbusiness.com',
  downloadText    = 'DOWNLOAD THE APP NOW!',
  downloadSubText = 'For better experience download our app',
}) {
  return (
    <div className="spc-page">

      {/* ══════════════════════════════════════════════════════════════
          HEADER — badge · logo · hero image · watermark
      ══════════════════════════════════════════════════════════════ */}
      <header className="spc-header">

        {/* Top bar: badge left, brand logo right */}
        <div className="spc-topbar">
          <div className="spc-badge">
            {productCode} SPARE PARTS
          </div>
          <div className="spc-header-logo">
            <BrandLogo brand={brand} iconSize={38} />
          </div>
        </div>

        {/* Hero area: main product image + faint watermark */}
        <div className="spc-hero">
          <PageWatermark brand={brand} size={220} />
          {mainProductImage
            ? <img className="spc-hero-img" src={mainProductImage} alt="Product" />
            : <div className="spc-hero-placeholder">
                <span>Main Product Image</span>
              </div>
          }
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          PARTS GRID — 4 columns × 5 rows
      ══════════════════════════════════════════════════════════════ */}
      <section className="spc-grid">

        {/* Decorative chevron watermark behind all cards */}
        <GridChevrons />

        {parts.slice(0, 20).map((part, idx) => (
          <div key={part.code || idx} className="spc-card">

            {/* Card header: small logo + part code */}
            <div className="spc-card-head">
              <BrandLogo brand={brand} iconSize={13} />
              <span className="spc-card-code">{part.code}</span>
            </div>

            {/* Thin divider */}
            <div className="spc-card-divider" />

            {/* Part name */}
            <div className="spc-card-name">{part.name}</div>

            {/* Part image */}
            <div className="spc-card-img-wrap">
              {part.image
                ? <img className="spc-card-img" src={part.image} alt={part.name} />
                : <div className="spc-card-img-ph" />
              }
            </div>

          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER — teal strip with large text watermark + CTA
      ══════════════════════════════════════════════════════════════ */}
      <footer className="spc-footer">

        {/* Large background text (decorative) */}
        <div className="spc-footer-bg-text" aria-hidden="true">
          SPARE PARTS
        </div>

        {/* Foreground content */}
        <div className="spc-footer-content">
          <div className="spc-footer-left">

            {/* QR Code */}
            {qrCodeImage
              ? <img className="spc-footer-qr" src={qrCodeImage} alt="QR Code" />
              : <QrPlaceholder />
            }

            {/* App download CTA */}
            <div className="spc-footer-cta">
              <div className="spc-footer-cta-icon">
                {/* Hand + phone icon */}
                <svg viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg" width="28" height="35">
                  <rect x="10" y="2" width="20" height="32" rx="3" fill="white" />
                  <rect x="12" y="5" width="16" height="22" rx="1" fill="#00B5C8" />
                  <circle cx="20" cy="30" r="2" fill="#ccc" />
                  <path d="M6 38 Q10 34 20 36 Q30 38 34 34 L36 40 Q28 48 20 46 Q12 44 4 48 Z" fill="white" opacity="0.8" />
                </svg>
              </div>
              <div className="spc-footer-cta-text">
                <p className="spc-footer-cta-title">{downloadText}</p>
                <p className="spc-footer-cta-sub">{downloadSubText}</p>
                <GooglePlayBadge />
              </div>
            </div>

          </div>
        </div>

        {/* Website URL — bottom left */}
        <div className="spc-footer-website">{websiteUrl}</div>

      </footer>
    </div>
  );
}
