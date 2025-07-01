function convertInvoiceDate(isoString) {
  const date = new Date(isoString);

  const options = {month: 'short', day: '2-digit', year: 'numeric'};
  const datePart = date.toLocaleDateString('en-US', options).replace(',', '');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${datePart} ${hours}:${minutes}`;
}

function convertInvoiceDate12Hour(isoString) {
  const date = new Date(isoString);

  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const datePart = date.toLocaleDateString('en-US', options).replace(',', '');

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 -> 12 for 12 AM

  return `${datePart} ${hours}:${minutes} ${ampm}`;
}


export {convertInvoiceDate,convertInvoiceDate12Hour}