// src/utils/invoiceUtils.js

export const productSubtotal = (products) =>
  products.reduce((sum, p) => sum + Number(p.amount || 0), 0);

export const calcGrandTotal = (data) => {
  const sub = productSubtotal(data.products);
  return (
    sub +
    Number(data.cgst || 0) +
    Number(data.sgst || 0) +
    Number(data.igst || 0) +
    Number(data.roundOff || 0)
  );
};

export const applyTaxPercents = (data, products) => {
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

export const initialFormData = {
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
  cgst: "",
  sgst: "",
  igst: "",
  roundOff: "",
  grandTotal: "",
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
};