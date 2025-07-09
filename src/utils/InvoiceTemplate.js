import {FILE_URL} from './config';
import {convertInvoiceDate, convertInvoiceDate12Hour} from './util';
import RNPrint from 'react-native-print';

const printableTemplate = invoice => {
  // Format currency values
  const formatCurrency = amount => {
    return '₹' + parseFloat(amount).toFixed(2);
  };

  // Generate compact item rows (max 24 chars for item name)
  const itemRow = invoice.items
    .map(
      item => `
    <tr class="item-row">
      <td class="item-name">${item.name.length > 24 ? item.name.slice(0, 24) + '...' : item.name}</td>
      <td class="item-qty">${item.quantity} ${item.unitType}</td>
      <td class="item-amt right">${formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `,
    )
    .join('');

  const template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice ${invoice.id}</title>
  <style>
    /* Universal thermal printer styles */
    /* Based on research of common thermal printer specifications */
    @page {
      size: auto;   /* Auto detects printer width */
      margin: 0;    /* Remove default margins */
    }
    body {
      font-family: "Courier New", monospace; /* Best supported font for thermal printers */
      width: 100%;
      margin: 0;
      padding: 1mm 2mm;
      font-size: 11pt; /* Increased from 9pt */
      line-height: 1.2; /* Adjusted for larger font */
    }
    /* Header styles */
    .header {
      text-align: center;
      margin-bottom: 1mm;
    }
    .business-name {
      font-weight: bold;
      font-size: 14pt; /* Increased from 11pt */
      margin-bottom: 0.5mm;
    }
    .business-info {
      font-size: 10pt; /* Increased from 8pt */
      line-height: 1.2;
    }
    /* Divider line */
    .divider {
      border-top: 1px solid #000;
      margin: 1mm 0;
    }
    /* Invoice metadata */
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1mm;
      font-size: 10pt; /* Increased from 8pt */
    }
    /* Customer info */
    .customer-info {
      margin: 1mm 0;
      font-size: 10pt; /* Increased from 8pt */
    }
    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1mm 0;
    }
    th {
      text-align: left;
      border-bottom: 1px solid #000;
      padding: 0.5mm 0;
      font-size: 10pt; /* Increased from 8pt */
    }
    td {
      padding: 0.5mm 0;
      font-size: 10pt; /* Increased from 8pt */
      vertical-align: top;
    }
    .item-name {
      width: 50%;
    }
    .item-qty {
      width: 25%;
    }
    .item-amt {
      width: 25%;
    }
    .right {
      text-align: right;
    }
    /* Totals section */
    .totals {
      margin-top: 1mm;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      margin: 0.5mm 0;
      font-size: 10pt; /* Increased from 8pt */
    }
    .grand-total {
      font-weight: bold;
      border-top: 1px solid #000;
      padding-top: 1mm;
      margin-top: 1mm;
      font-size: 11pt; /* Increased from 9pt */
    }
    /* Footer */
    .footer {
      text-align: center;
      margin-top: 2mm;
      font-size: 9pt; /* Increased from 7pt */
    }
    /* Barcode - only included if needed */
    .barcode-container {
      text-align: center;
      margin: 1mm 0;
    }
    .barcode {
      height: 20px;
      image-rendering: crisp-edges;
    }
    /* Print-specific styles */
    @media print {
      body {
        padding: 0 !important;
        width: 100% !important;
      }
      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="business-name">${invoice.business.name}</div>
    <div class="business-info">
      ${invoice.business.address}<br>
      ${invoice.business.gstNo ? 'GST: ' + invoice.business.gstNo : ''}
    </div>
  </div>
  
  <div class="divider"></div>
  
  <div class="invoice-meta">
    <div>
      <strong>Invoice:</strong> ${invoice.name}-${invoice.id}<br>
      <strong>Date:</strong> ${convertInvoiceDate(invoice.createdAt)}
    </div>
  </div>
  
  <div class="customer-info">
    <div><strong>${invoice.customerName}</strong></div>
    <div>${invoice.customerMobile}</div>
  </div>
  
  <div class="divider"></div>
  
  <table>
    <thead>
      <tr>
        <th class="item-name">ITEM</th>
        <th class="item-qty">QTY</th>
        <th class="item-amt right">AMOUNT</th>
      </tr>
    </thead>
    <tbody>
      ${itemRow}
    </tbody>
  </table>
  
  <div class="divider"></div>
  
  <div class="totals">
    <div class="total-row">
      <span>Sub Total:</span>
      <span>${formatCurrency(invoice.subTotalAmount)}</span>
    </div>
    <div class="total-row">
      <span>Discount:</span>
      <span>-${formatCurrency(invoice.totalDiscount)}</span>
    </div>
    <div class="total-row">
      <span>Tax:</span>
      <span>${formatCurrency(invoice.totalGst)}</span>
    </div>
    <div class="total-row grand-total">
      <span>TOTAL:</span>
      <span>${formatCurrency(invoice.totalAmount)}</span>
    </div>
  </div>
  
  <div class="footer">
    Thank you for your business!<br>
    ${invoice.business.name}
  </div>
</body>
</html>`;

  return template;
};

const invoicePDFTemplate = invoice => {
  // Fix for logo image - use base64 or absolute URL
  const logoImage = invoice.business.logo
    ? `<img src="${FILE_URL+"/business/logo/"+invoice.business.logo}" alt="logo" style="height:25mm; max-width:100%;">`
    : '<div style="height:25mm; background:#eee; display:flex; align-items:center; justify-content:center;">No Logo</div>';

  const barcodeValue = `${invoice.name}-${invoice.id}`;
  // SVG placeholder for barcode
  const barcodeSVG = `<svg id="barcode" style="display:block; margin:10px auto 0; height:30mm;"></svg>`;

  const itemRow = invoice.items
    .map((item, index) => {
      const totalPrice = item.price * item.quantity;
      const discountAmount = totalPrice * (item.discount / 100);
      const gstAmount = (totalPrice - discountAmount) * (item.totalGst / 100);
      const amountAfterDiscount = totalPrice - discountAmount;
      const totalAmount = amountAfterDiscount + gstAmount;

      return `<tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.hsnCode || '-'}</td>
        <td class="text-center">${item.quantity}</td>
        <td class="text-center">${item.unitType || 'PCS'}</td>
        <td class="text-right">₹${item.price.toFixed(2)}</td>
        <td class="text-right">${item.discount || 0}%</td>
        <td class="text-right">${item.totalGst || 0}%</td>
        <td class="text-right">₹${gstAmount.toFixed(2)}</td>
        <td class="text-right">₹${totalAmount.toFixed(2)}</td>
      </tr>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${invoice.business.name}</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #333; margin: 0; padding: 0; }
    .a4-container { width: 100%; max-width: 180mm; margin: 0 auto; padding: 5mm; box-sizing: border-box; }
    .header { display: flex; justify-content: space-between; margin-bottom: 10px; width: 100%; }
    .invoice-title { text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0 10px 0; width: 100%; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; table-layout: fixed; }
    th { background: #2c3e50; color: white; padding: 8px; text-align: left; }
    td { padding: 6px; border-bottom: 1px solid #ddd; word-wrap: break-word; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .total-table { float: right; width: 45%; margin-top: 20px; }
    .grand-total { font-weight: bold; background: #2c3e50; color: white; }
    .customer-box { background: #f9f9f9; padding: 10px; margin: 15px 0; width: 100%; }
    .signature { margin-top: 40px; text-align: right; width: 100%; }
    .signature-line { border-top: 1px solid #333; width: 200px; display: inline-block; }
    .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #777; width: 100%; }
    .col-1 { width: 5%; }
    .col-2 { width: 25%; }
    .col-3 { width: 8%; }
    .col-4 { width: 6%; }
    .col-5 { width: 8%; }
    .col-6 { width: 12%; }
    .col-7 { width: 8%; }
    .col-8 { width: 8%; }
    .col-9 { width: 10%; }
    .col-10 { width: 10%; }
  </style>
  <!-- JsBarcode CDN -->
  <script src="https://cdn.jsdelivr.net/npm/jsbarcode/dist/JsBarcode.all.min.js"></script>
</head>
<body>
  <div class="a4-container">
    <div class="header">
      <div style="width: 40%;">${logoImage}</div>
      <div style="width: 60%; text-align: right;">
        <div style="font-size: 18px; font-weight: bold;">${invoice.business.name}</div>
        <div>${invoice.business.address}</div>
        <div>GSTIN: ${invoice.business.gstNo || 'Not Provided'} | State Code: ${invoice.business.stateCode || '-'}</div>
      </div>
    </div>

    <div class="invoice-title">BILL INVOICE</div>
    <div style="text-align:center;">
      ${barcodeSVG}
    </div>

    <div style="display: flex; justify-content: space-between; width: 100%;">
      <div><strong>Invoice #:</strong> ${invoice.name}-${invoice.id}</div>
      <div><strong>Date:</strong> ${new Date(invoice.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}</div>
    </div>

    <div class="customer-box">
      <div style="font-weight: bold;">${invoice.customerName}</div>
      <div><strong>Mobile:</strong> +91 ${invoice.customerMobile}</div>
    </div>

    <table>
      <thead>
        <tr>
          <th class="col-1">#</th>
          <th class="col-2">Item Description</th>
          <th class="col-3">HSN</th>
          <th class="col-4">Qty</th>
          <th class="col-5">Unit</th>
          <th class="col-6">Rate (₹)</th>
          <th class="col-7">Disc.%</th>
          <th class="col-8">GST%</th>
          <th class="col-9">GST Amt</th>
          <th class="col-10">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>${itemRow}</tbody>
    </table>

    <table class="total-table">
      <tr>
        <td>Sub Total:</td>
        <td class="text-right">₹${invoice.subTotalAmount.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Total Discount:</td>
        <td class="text-right">-₹${invoice.totalDiscount.toFixed(2)}</td>
      </tr>
      <tr>
        <td>Total GST:</td>
        <td class="text-right">₹${invoice.totalGst.toFixed(2)}</td>
      </tr>
      <tr class="grand-total">
        <td>GRAND TOTAL:</td>
        <td class="text-right">₹${invoice.totalAmount.toFixed(2)}</td>
      </tr>
    </table>

    <div style="clear: both;"></div>

    <div class="signature">
      <div class="signature-line"></div>
      <div>Authorized Signatory</div>
    </div>

    <div class="footer">
      Thank you for your business!<br>
      This is a computer-generated invoice.
    </div>
  </div>
  <script>
    // Render the barcode after the DOM is loaded
    window.onload = function() {
      JsBarcode("#barcode", "${barcodeValue}", {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 60,
        displayValue: true,
        fontSize: 16,
        margin: 0
      });
    }
  </script>
</body>
</html>`;
};


const printBill = async printableInvoice => {
  try {
    let printerUrl = null;
    if (RNPrint.selectPrinter) {
      const selectedPrinter = await RNPrint.selectPrinter();
      printerUrl = selectedPrinter?.url;
      console.log(
        'Selected Printer:',
        JSON.stringify(selectedPrinter, null, 2),
      );
    } else {
      console.warn(
        'selectPrinter not available, using default printer or manual URL',
      );
      printerUrl = 'ipp://192.168.1.100'; // Replace with your printer’s IP
    }

    if (!printerUrl) {
      console.error('No valid printer URL found');
      return;
    }

    const html = printableTemplate(printableInvoice);
    if (!html || typeof html !== 'string') {
      console.error('Invalid HTML generated from printableTemplate');
      return;
    }

    await RNPrint.print({
      printerURL: printerUrl,
      html,
    });
    console.log('Print job sent successfully');
  } catch (error) {
    console.error('Printing error:', error.message);
  }
};

const printInvoice = async printableInvoice => {
  try {
    let printerUrl = null;
    if (RNPrint.selectPrinter) {
      const selectedPrinter = await RNPrint.selectPrinter();
      printerUrl = selectedPrinter?.url;
      console.log(
        'Selected Printer:',
        JSON.stringify(selectedPrinter, null, 2),
      );
    } else {
      console.warn(
        'selectPrinter not available, using default printer or manual URL',
      );
      printerUrl = 'ipp://192.168.1.100'; // Replace with your printer’s IP
    }

    if (!printerUrl) {
      console.error('No valid printer URL found');
      return;
    }

    const html = invoicePDFTemplate(printableInvoice);
    if (!html || typeof html !== 'string') {
      console.error('Invalid HTML generated from printableTemplate');
      return;
    }

    await RNPrint.print({
      printerURL: printerUrl,
      html,
    });
    console.log('Print job sent successfully');
  } catch (error) {
    console.error('Printing error:', error.message);
  }
};

export {printableTemplate, printBill, invoicePDFTemplate, printInvoice};
