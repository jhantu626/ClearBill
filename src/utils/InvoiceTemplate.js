import {convertInvoiceDate} from './util';

const printableTemplate = invoice => {
  // Format currency values
  const formatCurrency = (amount) => {
    return '₹' + parseFloat(amount).toFixed(2);
  };

  // Generate item rows
  const itemRow = invoice.items.map(item => `
    <tr class="item-row">
      <td class="col-item">
        ${item.name.length > 25 ? item.name.slice(0, 25) + '...' : item.name}
      </td>
      <td class="col-qty">${item.quantity}</td>
      <td class="col-unit">${item.unitType}</td>
      <td class="col-rate">${formatCurrency(item.price)}</td>
      <td class="col-amt">${formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  // Barcode data
  const barcodeData = `${invoice.name}-${invoice.id}`;

  const template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Invoice ${invoice.name}-${invoice.id}</title>
  <style>
    @page {
      size: 80mm auto;
      margin: 0;
    }
    body {
      font-family: 'Courier New', monospace;
      width: 76mm;
      margin: 0 auto;
      padding: 1mm 2mm;
      color: #000;
      font-size: 12px;
      line-height: 1.3;
    }
    .header {
      text-align: center;
      margin-bottom: 3mm;
    }
    .business-name {
      font-weight: bold;
      font-size: 16px;
      margin: 2mm 0;
      letter-spacing: 0.5px;
    }
    .business-info {
      font-size: 11px;
      line-height: 1.4;
    }
    .divider {
      border-top: 1px dashed #000;
      margin: 3mm 0;
      height: 0;
    }
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2mm;
      font-size: 11px;
    }
    .customer-info {
      margin: 2mm 0;
      font-size: 11px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 3mm 0;
    }
    th {
      text-align: left;
      padding: 1mm 0;
      border-bottom: 1px solid #000;
      font-weight: bold;
      font-size: 11px;
    }
    td {
      padding: 1mm 0;
      border-bottom: 1px dotted #ccc;
      vertical-align: top;
      font-size: 11px;
    }
    .col-item { width: 32%; }
    .col-qty { width: 12%; text-align: center; }
    .col-unit { width: 16%; text-align: center; }
    .col-rate { width: 20%; text-align: right; }
    .col-amt { width: 20%; text-align: right; }
    .totals {
      margin-top: 3mm;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      margin: 1mm 0;
      font-size: 12px;
    }
    .grand-total {
      font-weight: bold;
      font-size: 14px;
      border-top: 1px solid #000;
      padding-top: 2mm;
      margin-top: 2mm;
    }
    .footer {
      text-align: center;
      margin-top: 5mm;
      font-size: 11px;
    }
    .terms {
      margin-top: 3mm;
      font-size: 9px;
      line-height: 1.4;
    }
    .barcode-container {
      margin: 3mm auto;
      text-align: center;
    }
    .barcode {
      height: 30px;
      image-rendering: crisp-edges;
    }
    .center {
      text-align: center;
    }
    .highlight {
      background-color: #f5f5f5;
      padding: 1mm 2mm;
      border-radius: 2px;
    }
    @media print {
      body {
        width: 76mm;
        padding: 0 2mm;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="business-name">${invoice.business.name}</div>
    <div class="business-info">
      ${invoice.business.address}<br>
      ${invoice.business.gstNo ? 'GSTIN: ' + invoice.business.gstNo : ''}
    </div>
  </div>
  
  <div class="divider"></div>
  
  <div class="invoice-meta">
    <div>
      <strong>Invoice No:</strong> ${invoice.name}-${invoice.id}<br>
      <strong>Date:</strong> ${convertInvoiceDate(invoice.createdAt)}
    </div>
  </div>
  
  <div class="customer-info">
    <strong>Customer:</strong> ${invoice.customerName}<br>
    <strong>Mobile:</strong> +91 ${invoice.customerMobile}
  </div>
  
  <div class="barcode-container">
    <img class="barcode" alt="Barcode" src="https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(barcodeData)}&code=Code128&dpi=96&qunit=Mm&quiet=0" />
  </div>
  
  <div class="divider"></div>
  
  <table>
    <thead>
      <tr>
        <th class="col-item">Item</th>
        <th class="col-qty">Qty</th>
        <th class="col-unit">Unit</th>
        <th class="col-rate">Rate</th>
        <th class="col-amt">Amount</th>
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
      <span>GST:</span>
      <span>${formatCurrency(invoice.totalGst)}</span>
    </div>
    <div class="total-row grand-total">
      <span>TOTAL:</span>
      <span>${formatCurrency(invoice.totalAmount)}</span>
    </div>
  </div>
  
  <div class="divider"></div>
  
  <div class="terms highlight">
    <strong>Terms & Conditions:</strong><br>
    1. Payment due upon receipt<br>
    2. 1% monthly interest on late payments<br>
    3. Goods once sold cannot be returned<br>
    4. Subject to our jurisdiction
  </div>
  
  <div class="footer">
    Thank you for your business!<br>
    <strong>${invoice.business.name}</strong>
  </div>
</body>
</html>`;

  return template;
};



export {printableTemplate};
