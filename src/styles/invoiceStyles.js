// src/styles/invoiceStyles.js

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Nunito:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0f0f14; }

  .inv-root {
    font-family: 'Nunito', sans-serif;
    background: #0f0f14;
    min-height: 100vh;
    padding: 2.5rem 1rem 4rem;
  }

  .inv-shell { max-width: 960px; margin: 0 auto; }

  .inv-page-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #4b4b6a;
    margin-bottom: 1.75rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .inv-page-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #2a2a40 0%, transparent 100%);
  }

  .inv-card {
    background: #16161f;
    border-radius: 20px;
    border: 1px solid #232334;
    overflow: hidden;
  }

  /* Header */
  .inv-header {
    background: linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%);
    padding: 2rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #232334;
    position: relative;
    overflow: hidden;
  }
  .inv-header::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(124,106,245,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .inv-header-left h1 {
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;
  }
  .inv-header-left .inv-num {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: rgba(255,255,255,0.3);
    margin-top: 4px;
  }

  .inv-logo-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
  .inv-logo-box {
    width: 64px; height: 64px;
    border-radius: 14px;
    background: rgba(255,255,255,0.95);
    border: 2px dashed rgba(124,106,245,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s;
  }
  .inv-logo-box:hover { border-color: #7c6af5; }
  .inv-logo-box img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
  .inv-logo-box input {
    position: absolute; opacity: 0; inset: 0;
    cursor: pointer; width: 100%; height: 100%;
  }
  .inv-logo-hint { font-size: 10px; color: rgba(255,255,255,0.25); letter-spacing: 0.5px; text-align: center; }
  .inv-logo-icon { font-size: 22px; color: #7c6af5; pointer-events: none; }

  /* Body */
  .inv-body { padding: 2.5rem; display: flex; flex-direction: column; gap: 2.25rem; }

  /* Section label */
  .inv-section-label {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #4b4b6a;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .inv-section-label .badge {
    font-size: 10px;
    padding: 2px 9px;
    border-radius: 100px;
    background: rgba(124,106,245,0.15);
    color: #9d8ff5;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    letter-spacing: 0;
  }
  .inv-section-label::after { content: ''; flex: 1; height: 1px; background: #232334; }

  /* Grid layouts */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
  .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }

  /* Fields */
  .inv-field { display: flex; flex-direction: column; gap: 6px; }
  .inv-field label {
    font-size: 11px;
    font-weight: 600;
    color: #4b4b6a;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .inv-field input,
  .inv-field textarea,
  .inv-field select {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 10px 14px;
    border: 1px solid #232334;
    border-radius: 10px;
    background: #0f0f14;
    color: #e0e0f0;
    outline: none;
    width: 100%;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .inv-field input:focus,
  .inv-field textarea:focus,
  .inv-field select:focus {
    border-color: #7c6af5;
    box-shadow: 0 0 0 3px rgba(124,106,245,0.12);
  }
  .inv-field input[readonly] {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #5a5a80;
    border-style: dashed;
    border-color: #232334;
    background: #0d0d12;
  }
  .inv-field input.mono { font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.5px; }
  .inv-field textarea { resize: none; line-height: 1.6; }
  .inv-field select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%234b4b6a'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    cursor: pointer;
  }

  .field-group { display: flex; flex-direction: column; gap: 10px; }

  /* Tax section */
  .tax-panel {
    background: #0f0f14;
    border: 1px solid #232334;
    border-radius: 14px;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .tax-mode-toggle { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .tax-mode-toggle span {
    font-size: 11px;
    color: #4b4b6a;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .toggle-btn {
    padding: 5px 14px;
    border-radius: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid #232334;
    background: transparent;
    color: #4b4b6a;
    transition: all 0.15s;
  }
  .toggle-btn.active { background: rgba(124,106,245,0.15); border-color: #7c6af5; color: #9d8ff5; }

  .tax-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }
  .tax-grid-pct { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem; }

  .tax-pct-block {
    background: #13131c;
    border: 1px solid #232334;
    border-radius: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .tax-pct-block .pct-label {
    font-size: 10px;
    font-weight: 700;
    color: #4b4b6a;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .pct-input-row { display: flex; align-items: center; gap: 6px; }
  .pct-input-row input {
    font-family: 'DM Mono', monospace !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    padding: 8px 10px !important;
    border-radius: 8px !important;
    flex: 1;
    text-align: center;
  }
  .pct-sym { font-family: 'DM Mono', monospace; font-size: 14px; color: #4b4b6a; font-weight: 500; }
  .pct-derived {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: #7c6af5;
    background: rgba(124,106,245,0.08);
    border-radius: 6px;
    padding: 4px 8px;
    text-align: center;
  }
  .pct-derived span { color: #9d8ff5; font-weight: 500; }

  .igst-note {
    font-size: 11px;
    color: #4b4b6a;
    padding: 8px 12px;
    background: rgba(124,106,245,0.06);
    border-radius: 8px;
    border: 1px solid rgba(124,106,245,0.1);
    grid-column: 1 / -1;
  }

  /* Grand Total */
  .total-box {
    background: linear-gradient(135deg, #1a1a2e, #0d0d1a);
    border: 1px solid #2d2d50;
    border-radius: 14px;
    padding: 1.25rem 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    position: relative;
    overflow: hidden;
  }
  .total-box::after {
    content: '';
    position: absolute;
    right: 160px; top: 50%;
    transform: translateY(-50%);
    width: 1px; height: 50%;
    background: rgba(255,255,255,0.06);
  }
  .total-left .total-lbl {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }
  .total-left .subtotal-line { font-size: 12px; color: rgba(255,255,255,0.2); margin-top: 4px; font-family: 'DM Mono', monospace; }
  .total-amt { font-family: 'DM Mono', monospace; font-size: 30px; font-weight: 500; color: #fff; letter-spacing: -1px; }
  .total-amt .currency { font-size: 18px; color: #7c6af5; margin-right: 2px; }

  /* Product table */
  .product-table { width: 100%; border-collapse: collapse; }
  .product-table thead th {
    font-family: 'Syne', sans-serif;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #4b4b6a;
    padding: 0 10px 12px;
    text-align: left;
    border-bottom: 1px solid #232334;
  }
  .product-table thead th:nth-child(n+3) { text-align: right; }
  .product-table thead th:last-child { text-align: center; width: 40px; }
  .product-table tbody tr:hover td { background: rgba(124,106,245,0.03); }
  .product-table td { padding: 6px 6px; border-bottom: 1px solid #1c1c28; vertical-align: middle; }
  .product-table td input {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 10px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: #e0e0f0;
    width: 100%;
    outline: none;
    transition: all 0.15s;
  }
  .product-table td input:focus { border-color: #7c6af5; background: rgba(124,106,245,0.06); }
  .product-table td input[readonly] {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #7c6af5;
    background: rgba(124,106,245,0.06);
    border-color: transparent;
    border-style: dashed;
    border-color: rgba(124,106,245,0.2);
    text-align: right;
  }
  .product-table td:nth-child(n+3):not(:last-child) input:not([readonly]) { text-align: right; }

  .btn-remove {
    width: 28px; height: 28px;
    border-radius: 7px;
    border: 1px solid #232334;
    background: transparent;
    color: #3a3a55;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    transition: all 0.15s;
  }
  .btn-remove:hover { border-color: #e24b4a; color: #e24b4a; background: rgba(226,75,74,0.08); }

  .btn-add-row {
    margin-top: 12px;
    padding: 8px 16px;
    border: 1px dashed #232334;
    border-radius: 9px;
    background: transparent;
    color: #4b4b6a;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.3px;
    transition: all 0.15s;
  }
  .btn-add-row:hover { border-color: #7c6af5; color: #9d8ff5; background: rgba(124,106,245,0.05); }

  /* Footer */
  .inv-footer {
    padding: 1.25rem 2.5rem;
    border-top: 1px solid #232334;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #13131c;
  }
  .inv-footer-note { font-size: 11px; color: #3a3a55; letter-spacing: 0.3px; }
  .btn-generate {
    padding: 11px 32px;
    background: #7c6af5;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: all 0.15s;
    position: relative;
    overflow: hidden;
  }
  .btn-generate:hover { background: #6857e0; transform: translateY(-1px); }
  .btn-generate:active { transform: translateY(0); }
`;