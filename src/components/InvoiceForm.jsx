// src/components/InvoiceForm.jsx

import { useState } from "react";
import { generateInvoice } from "../services/invoiceService";

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected once into <head>)
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Nunito:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0f0f14; }

  .inv-root {
    font-family: 'Nunito', sans-serif;
    background: #0f0f14;
    min-height: 100vh;
    padding: 2.5rem 1rem 4rem;
  }

  .inv-shell {
    max-width: 960px;
    margin: 0 auto;
  }

  /* ── Page title ── */
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

  /* ── Card ── */
  .inv-card {
    background: #16161f;
    border-radius: 20px;
    border: 1px solid #232334;
    overflow: hidden;
  }

  /* ── Header ── */
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
  .inv-logo-hint {
    font-size: 10px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.5px;
    text-align: center;
  }
  .inv-logo-icon { font-size: 22px; color: #7c6af5; pointer-events: none; }

  /* ── Body ── */
  .inv-body {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 2.25rem;
  }

  /* ── Section label ── */
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
  .inv-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #232334;
  }

  /* ── Grid layouts ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
  .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }

  /* ── Fields ── */
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
  .inv-field input.mono {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.5px;
  }
  .inv-field textarea {
    resize: none;
    line-height: 1.6;
  }
  .inv-field select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%234b4b6a'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    cursor: pointer;
  }

  .field-group { display: flex; flex-direction: column; gap: 10px; }

  /* ── Tax section ── */
  .tax-panel {
    background: #0f0f14;
    border: 1px solid #232334;
    border-radius: 14px;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .tax-mode-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
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
  .toggle-btn.active {
    background: rgba(124,106,245,0.15);
    border-color: #7c6af5;
    color: #9d8ff5;
  }

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
  .pct-input-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .pct-input-row input {
    font-family: 'DM Mono', monospace !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    padding: 8px 10px !important;
    border-radius: 8px !important;
    flex: 1;
    text-align: center;
  }
  .pct-sym {
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    color: #4b4b6a;
    font-weight: 500;
  }
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

  /* ── Grand Total ── */
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
  .total-left .subtotal-line {
    font-size: 12px;
    color: rgba(255,255,255,0.2);
    margin-top: 4px;
    font-family: 'DM Mono', monospace;
  }
  .total-amt {
    font-family: 'DM Mono', monospace;
    font-size: 30px;
    font-weight: 500;
    color: #fff;
    letter-spacing: -1px;
  }
  .total-amt .currency {
    font-size: 18px;
    color: #7c6af5;
    margin-right: 2px;
  }

  /* ── Product table ── */
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

  .product-table td {
    padding: 6px 6px;
    border-bottom: 1px solid #1c1c28;
    vertical-align: middle;
  }
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
  .product-table td input:focus {
    border-color: #7c6af5;
    background: rgba(124,106,245,0.06);
  }
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
  .product-table td:nth-child(n+3):not(:last-child) input:not([readonly]) {
    text-align: right;
  }

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
  .btn-remove:hover {
    border-color: #e24b4a;
    color: #e24b4a;
    background: rgba(226,75,74,0.08);
  }

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
  .btn-add-row:hover {
    border-color: #7c6af5;
    color: #9d8ff5;
    background: rgba(124,106,245,0.05);
  }

  /* ── Footer ── */
  .inv-footer {
    padding: 1.25rem 2.5rem;
    border-top: 1px solid #232334;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #13131c;
  }
  .inv-footer-note {
    font-size: 11px;
    color: #3a3a55;
    letter-spacing: 0.3px;
  }
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

/* ─────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
───────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div className="inv-section-label">{children}</div>
);

const Field = ({ label, children }) => (
  <div className="inv-field">
    <label>{label}</label>
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const InvoiceForm = () => {
  // Tax mode: "amount" = direct Rs. entry | "percent" = % entry that auto-calculates
  const [taxMode, setTaxMode] = useState("percent");

  const [formData, setFormData] = useState({
    companyLogo: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyGstin: "",
    buyerName: "",
    buyerAddress: "",
    buyerPhone: "",
    buyerGstin: "",
    placeOfSupply: "",
    invoiceNumber: "",
    invoiceDate: "",
    deliveryNote: "",
    paymentTerms: "",
    // Tax amounts (Rs.)
    cgst: "",
    sgst: "",
    igst: "",
    roundOff: "",
    grandTotal: "",
    // Tax percentages
    cgstPct: "",
    sgstPct: "",
    igstPct: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    declaration:
      "We declare that this invoice shows the actual price of goods and all particulars are true and correct.",
    products: [
      { productName: "", hsnSac: "", quantity: "", rate: "", amount: "" },
    ],
  });

  /* ── Helpers ── */
  const productSubtotal = (products) =>
    products.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const calcGrandTotal = (data) => {
    const sub = productSubtotal(data.products);
    return (
      sub +
      Number(data.cgst || 0) +
      Number(data.sgst || 0) +
      Number(data.igst || 0) +
      Number(data.roundOff || 0)
    );
  };

  // Recalculate tax Rs. amounts from percentages
  const applyTaxPercents = (data, products) => {
    const sub = productSubtotal(products || data.products);
    const cgstAmt = ((Number(data.cgstPct || 0) / 100) * sub).toFixed(2);
    const sgstAmt = ((Number(data.sgstPct || 0) / 100) * sub).toFixed(2);
    const igstAmt = ((Number(data.igstPct || 0) / 100) * sub).toFixed(2);
    const grand =
      sub +
      Number(cgstAmt) +
      Number(sgstAmt) +
      Number(igstAmt) +
      Number(data.roundOff || 0);
    return { cgst: cgstAmt, sgst: sgstAmt, igst: igstAmt, grandTotal: grand };
  };

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    if (taxMode === "percent" && ["cgstPct", "sgstPct", "igstPct", "roundOff"].includes(name)) {
      const taxes = applyTaxPercents(updated, updated.products);
      updated = { ...updated, ...taxes };
    } else if (taxMode === "amount" && ["cgst", "sgst", "igst", "roundOff"].includes(name)) {
      updated.grandTotal = calcGrandTotal(updated);
    }

    setFormData(updated);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData((prev) => ({ ...prev, companyLogo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...formData.products];
    updatedProducts[index][name] = value;
    const qty = Number(updatedProducts[index].quantity || 0);
    const rate = Number(updatedProducts[index].rate || 0);
    updatedProducts[index].amount = qty * rate;

    let updated = { ...formData, products: updatedProducts };

    if (taxMode === "percent") {
      const taxes = applyTaxPercents(updated, updatedProducts);
      updated = { ...updated, ...taxes };
    } else {
      updated.grandTotal = calcGrandTotal(updated);
    }

    setFormData(updated);
  };

  const addProductRow = () =>
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { productName: "", hsnSac: "", quantity: "", rate: "", amount: "" },
      ],
    });

  const removeProductRow = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    let updated = { ...formData, products: updatedProducts };
    if (taxMode === "percent") {
      const taxes = applyTaxPercents(updated, updatedProducts);
      updated = { ...updated, ...taxes };
    } else {
      updated.grandTotal = calcGrandTotal(updated);
    }
    setFormData(updated);
  };

  const switchTaxMode = (mode) => {
    setTaxMode(mode);
    if (mode === "percent") {
      // Recalculate from current percents
      const taxes = applyTaxPercents(formData, formData.products);
      setFormData((prev) => ({ ...prev, ...taxes }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await generateInvoice(formData);
      alert("PDF Generated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF");
    }
  };

  const subtotal = productSubtotal(formData.products);
  const cgstDerived = ((Number(formData.cgstPct || 0) / 100) * subtotal).toFixed(2);
  const sgstDerived = ((Number(formData.sgstPct || 0) / 100) * subtotal).toFixed(2);
  const igstDerived = ((Number(formData.igstPct || 0) / 100) * subtotal).toFixed(2);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="inv-root">
        <div className="inv-shell">
          <div className="inv-page-title">Invoice Generator</div>

          <div className="inv-card">
            {/* ── Header ── */}
            <div className="inv-header">
              <div className="inv-header-left">
                <h1>Tax Invoice</h1>
                <div className="inv-num">
                  {formData.invoiceNumber ? `#${formData.invoiceNumber}` : "#INV-000"}
                </div>
              </div>
              <div className="inv-logo-zone">
                <div className="inv-logo-box" title="Click to upload logo">
                  {formData.companyLogo ? (
                    <img src={formData.companyLogo} alt="Logo" />
                  ) : (
                    <span className="inv-logo-icon">+</span>
                  )}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} />
                </div>
                <div className="inv-logo-hint">Upload Logo</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="inv-body">

                {/* ── Company + Buyer ── */}
                <div className="grid-2">
                  <div>
                    <SectionLabel>From — Seller</SectionLabel>
                    <div className="field-group">
                      <Field label="Company Name">
                        <input name="companyName" placeholder="Your Company Ltd." onChange={handleChange} value={formData.companyName} />
                      </Field>
                      <Field label="Address">
                        <input name="companyAddress" placeholder="123 Business Park, City" onChange={handleChange} value={formData.companyAddress} />
                      </Field>
                      <Field label="Phone">
                        <input name="companyPhone" placeholder="+91 98765 43210" onChange={handleChange} value={formData.companyPhone} />
                      </Field>
                      <Field label="GSTIN">
                        <input name="companyGstin" placeholder="27AABCU9603R1ZM" onChange={handleChange} value={formData.companyGstin} className="mono" />
                      </Field>
                    </div>
                  </div>
                  <div>
                    <SectionLabel>Bill To — Buyer</SectionLabel>
                    <div className="field-group">
                      <Field label="Buyer Name">
                        <input name="buyerName" placeholder="Client Company Pvt. Ltd." onChange={handleChange} value={formData.buyerName} />
                      </Field>
                      <Field label="Address">
                        <input name="buyerAddress" placeholder="456 Commerce St, City" onChange={handleChange} value={formData.buyerAddress} />
                      </Field>
                      <Field label="Phone">
                        <input name="buyerPhone" placeholder="+91 98765 43210" onChange={handleChange} value={formData.buyerPhone} />
                      </Field>
                      <Field label="Buyer GSTIN">
                        <input name="buyerGstin" placeholder="27AABCU9603R1ZM" onChange={handleChange} value={formData.buyerGstin} className="mono" />
                      </Field>
                    </div>
                  </div>
                </div>

                {/* ── Invoice Details ── */}
                <div>
                  <SectionLabel>Invoice Details</SectionLabel>
                  <div className="grid-4">
                    <Field label="Invoice No.">
                      <input name="invoiceNumber" placeholder="INV-001" onChange={handleChange} value={formData.invoiceNumber} />
                    </Field>
                    <Field label="Invoice Date">
                      <input name="invoiceDate" type="date" onChange={handleChange} value={formData.invoiceDate} />
                    </Field>
                    <Field label="Delivery Note">
                      <input name="deliveryNote" placeholder="Optional" onChange={handleChange} value={formData.deliveryNote} />
                    </Field>
                    <Field label="Payment Terms">
                      <input name="paymentTerms" placeholder="Net 30" onChange={handleChange} value={formData.paymentTerms} />
                    </Field>
                  </div>
                  <div style={{ marginTop: "1rem", maxWidth: "280px" }}>
                    <Field label="Place of Supply">
                      <input name="placeOfSupply" placeholder="Maharashtra" onChange={handleChange} value={formData.placeOfSupply} />
                    </Field>
                  </div>
                </div>

                {/* ── Line Items ── */}
                <div>
                  <SectionLabel>
                    Line Items
                    <span className="badge">
                      {formData.products.length} {formData.products.length === 1 ? "item" : "items"}
                    </span>
                  </SectionLabel>
                  <div style={{ overflowX: "auto" }}>
                    <table className="product-table">
                      <thead>
                        <tr>
                          <th style={{ width: "34%", paddingLeft: "10px" }}>Product / Service</th>
                          <th style={{ width: "12%" }}>HSN/SAC</th>
                          <th style={{ width: "11%" }}>Qty</th>
                          <th style={{ width: "14%" }}>Rate (₹)</th>
                          <th style={{ width: "14%" }}>Amount (₹)</th>
                          <th style={{ width: "5%" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.products.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                name="productName"
                                placeholder="Product or service name"
                                value={product.productName}
                                onChange={(e) => handleProductChange(index, e)}
                              />
                            </td>
                            <td>
                              <input
                                name="hsnSac"
                                placeholder="998314"
                                value={product.hsnSac}
                                onChange={(e) => handleProductChange(index, e)}
                              />
                            </td>
                            <td>
                              <input
                                name="quantity"
                                type="number"
                                placeholder="1"
                                value={product.quantity}
                                onChange={(e) => handleProductChange(index, e)}
                              />
                            </td>
                            <td>
                              <input
                                name="rate"
                                type="number"
                                placeholder="0.00"
                                value={product.rate}
                                onChange={(e) => handleProductChange(index, e)}
                              />
                            </td>
                            <td>
                              <input
                                name="amount"
                                placeholder="0.00"
                                value={product.amount !== "" ? Number(product.amount).toFixed(2) : ""}
                                readOnly
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn-remove"
                                onClick={() => removeProductRow(index)}
                                title="Remove row"
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button type="button" className="btn-add-row" onClick={addProductRow}>
                    + Add line item
                  </button>
                </div>

                {/* ── Tax & Totals ── */}
                <div>
                  <SectionLabel>Tax &amp; Totals</SectionLabel>

                  <div className="tax-panel">
                    {/* Mode toggle */}
                    <div className="tax-mode-toggle">
                      <span>Tax Input Mode</span>
                      <button
                        type="button"
                        className={`toggle-btn ${taxMode === "percent" ? "active" : ""}`}
                        onClick={() => switchTaxMode("percent")}
                      >
                        % Percentage
                      </button>
                      <button
                        type="button"
                        className={`toggle-btn ${taxMode === "amount" ? "active" : ""}`}
                        onClick={() => switchTaxMode("amount")}
                      >
                        ₹ Fixed Amount
                      </button>
                    </div>

                    {/* Percentage mode */}
                    {taxMode === "percent" && (
                      <div className="tax-grid-pct">
                        {/* CGST */}
                        <div className="tax-pct-block">
                          <div className="pct-label">CGST</div>
                          <div className="pct-input-row">
                            <input
                              name="cgstPct"
                              type="number"
                              step="0.01"
                              placeholder="0"
                              value={formData.cgstPct}
                              onChange={handleChange}
                            />
                            <span className="pct-sym">%</span>
                          </div>
                          <div className="pct-derived">
                            ₹ <span>{cgstDerived}</span>
                          </div>
                        </div>

                        {/* SGST */}
                        <div className="tax-pct-block">
                          <div className="pct-label">SGST</div>
                          <div className="pct-input-row">
                            <input
                              name="sgstPct"
                              type="number"
                              step="0.01"
                              placeholder="0"
                              value={formData.sgstPct}
                              onChange={handleChange}
                            />
                            <span className="pct-sym">%</span>
                          </div>
                          <div className="pct-derived">
                            ₹ <span>{sgstDerived}</span>
                          </div>
                        </div>

                        {/* IGST */}
                        <div className="tax-pct-block">
                          <div className="pct-label">IGST</div>
                          <div className="pct-input-row">
                            <input
                              name="igstPct"
                              type="number"
                              step="0.01"
                              placeholder="0"
                              value={formData.igstPct}
                              onChange={handleChange}
                            />
                            <span className="pct-sym">%</span>
                          </div>
                          <div className="pct-derived">
                            ₹ <span>{igstDerived}</span>
                          </div>
                        </div>

                        {/* Round Off */}
                        <div className="tax-pct-block">
                          <div className="pct-label">Round Off</div>
                          <div className="pct-input-row">
                            <input
                              name="roundOff"
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              value={formData.roundOff}
                              onChange={handleChange}
                              style={{ textAlign: "right" }}
                            />
                            <span className="pct-sym">₹</span>
                          </div>
                          <div className="pct-derived" style={{ color: "#4b4b6a" }}>
                            direct value
                          </div>
                        </div>

                        {/* GST note */}
                        <div className="igst-note">
                          💡 <strong>GST Rule:</strong> For intra-state supply use CGST + SGST (both at equal rate).
                          For inter-state supply use IGST alone (CGST + SGST = 0). All three percentages add up in the grand total.
                        </div>
                      </div>
                    )}

                    {/* Amount mode */}
                    {taxMode === "amount" && (
                      <div className="tax-grid">
                        <Field label="CGST (₹)">
                          <input name="cgst" type="number" placeholder="0.00" value={formData.cgst} onChange={handleChange} />
                        </Field>
                        <Field label="SGST (₹)">
                          <input name="sgst" type="number" placeholder="0.00" value={formData.sgst} onChange={handleChange} />
                        </Field>
                        <Field label="IGST (₹)">
                          <input name="igst" type="number" placeholder="0.00" value={formData.igst} onChange={handleChange} />
                        </Field>
                        <Field label="Round Off (₹)">
                          <input name="roundOff" type="number" placeholder="0.00" value={formData.roundOff} onChange={handleChange} />
                        </Field>
                      </div>
                    )}
                  </div>

                  {/* Grand Total */}
                  <div className="total-box">
                    <div className="total-left">
                      <div className="total-lbl">Grand Total</div>
                      <div className="subtotal-line">
                        subtotal ₹{subtotal.toFixed(2)}
                        {taxMode === "percent" && (Number(formData.cgstPct || 0) + Number(formData.sgstPct || 0) + Number(formData.igstPct || 0)) > 0
                          ? ` + ${(Number(formData.cgstPct || 0) + Number(formData.sgstPct || 0) + Number(formData.igstPct || 0)).toFixed(2)}% tax`
                          : ""}
                      </div>
                    </div>
                    <div className="total-amt">
                      <span className="currency">₹</span>
                      {Number(formData.grandTotal || 0).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* ── Bank Details ── */}
                <div>
                  <SectionLabel>Bank Details</SectionLabel>
                  <div className="grid-4">
                    <Field label="Bank Name">
                      <input name="bankName" placeholder="State Bank of India" onChange={handleChange} value={formData.bankName} />
                    </Field>
                    <Field label="Account Number">
                      <input name="accountNumber" placeholder="000011110000" onChange={handleChange} value={formData.accountNumber} className="mono" />
                    </Field>
                    <Field label="IFSC Code">
                      <input name="ifscCode" placeholder="SBIN0001234" onChange={handleChange} value={formData.ifscCode} className="mono" />
                    </Field>
                    <Field label="Branch">
                      <input name="branchName" placeholder="MG Road, Mumbai" onChange={handleChange} value={formData.branchName} />
                    </Field>
                  </div>
                </div>

                {/* ── Declaration ── */}
                <div>
                  <SectionLabel>Declaration</SectionLabel>
                  <div className="inv-field">
                    <textarea
                      name="declaration"
                      rows={2}
                      value={formData.declaration}
                      onChange={handleChange}
                    />
                  </div>
                </div>

              </div>

              {/* ── Footer ── */}
              <div className="inv-footer">
                <div className="inv-footer-note">
                  All amounts in Indian Rupees (INR) · GST applicable
                </div>
                <button type="submit" className="btn-generate">
                  Generate PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;