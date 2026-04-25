import axios from "axios";

const API_URL = "https://invoice-generator-backend-xym5.onrender.com/api/invoice";

export const generateInvoice = async (data) => {
  const response = await axios.post(
    `${API_URL}/generate`,
    data,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "invoice.pdf");

  document.body.appendChild(link);
  link.click();
  link.remove();
};