function convertInvoiceDate(isoString) {
  const date = new Date(isoString);

  const options = {month: 'short', day: '2-digit', year: 'numeric'};
  const datePart = date.toLocaleDateString('en-US', options).replace(',', '');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${datePart} ${hours}:${minutes}`;
}


export {convertInvoiceDate}