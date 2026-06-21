/**
 * SparePartsCatalog — usage examples
 *
 * PDF generation options
 * ──────────────────────
 * Option A – Puppeteer (Node.js):
 *   Render this page in a headless browser at viewport 794×1123 (A4 @ 96dpi),
 *   then call page.pdf({ format: 'A4', printBackground: true }).
 *
 * Option B – react-to-pdf:
 *   import { usePDF } from 'react-to-pdf';
 *   const { toPDF, targetRef } = usePDF({ filename: 'spare-parts.pdf' });
 *   <div ref={targetRef}><SparePartsCatalog ... /></div>
 *
 * Option C – html2canvas + jsPDF:
 *   html2canvas(ref.current, { scale: 2 }).then(canvas => {
 *     const pdf = new jsPDF('p', 'mm', 'a4');
 *     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
 *     pdf.save('spare-parts.pdf');
 *   });
 */

import React from 'react';
import SparePartsCatalog, { DEFAULT_PARTS } from './SparePartsCatalog';

// ── 1. Default OPEL catalog (mirrors the reference PDF exactly) ────────────
export function OpelCatalogExample() {
  return (
    <SparePartsCatalog
      brand="opel"
      productCode="6-100"
      mainProductImage="/images/products/angle-grinder-6100.png"
      parts={DEFAULT_PARTS.map((p) => ({
        ...p,
        image: `/images/parts/${p.code}.png`,
      }))}
      qrCodeImage="/images/qr-code.png"
      websiteUrl="www.mazingbusiness.com"
    />
  );
}

// ── 2. Hotel Select brand variant ─────────────────────────────────────────
export function HotelSelectCatalogExample() {
  return (
    <SparePartsCatalog
      brand="hotel-select"
      productCode="6-100"
      mainProductImage="/images/products/angle-grinder-6100.png"
      parts={DEFAULT_PARTS.map((p) => ({
        ...p,
        image: `/images/parts/${p.code}.png`,
      }))}
      qrCodeImage="/images/qr-code.png"
      websiteUrl="www.mazingbusiness.com"
    />
  );
}

// ── 3. Dynamic brand switcher ──────────────────────────────────────────────
export function BrandSwitcherDemo() {
  const [brand, setBrand] = React.useState('opel');

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontFamily: 'sans-serif' }}>
        <button
          onClick={() => setBrand('opel')}
          style={{ background: brand === 'opel' ? '#00B5C8' : '#eee', color: brand === 'opel' ? '#fff' : '#333', border: 'none', padding: '8px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
        >
          OPEL
        </button>
        <button
          onClick={() => setBrand('hotel-select')}
          style={{ background: brand === 'hotel-select' ? '#00B5C8' : '#eee', color: brand === 'hotel-select' ? '#fff' : '#333', border: 'none', padding: '8px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
        >
          Hotel Select
        </button>
      </div>

      <SparePartsCatalog brand={brand} productCode="6-100" />
    </div>
  );
}
