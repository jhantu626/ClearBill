const verifyEmail = email => {
  // Basic email regex pattern (covers most common cases)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function isValidName(name) {
  if (typeof name !== 'string') return false;

  // Trim whitespace
  const trimmed = name.trim();

  // Check length
  if (trimmed.length < 2 || trimmed.length > 50) return false;

  // Validate allowed characters and pattern
  const nameRegex = /^[A-Za-z][A-Za-z' -]*[A-Za-z]$/;

  return nameRegex.test(trimmed);
}

function isValidGSTNumber(gstNumber) {
  if (typeof gstNumber !== 'string') return false;

  const trimmed = gstNumber.trim().toUpperCase();

  // Regex to match standard GST format
  const gstRegex =
    /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

  return gstRegex.test(trimmed);
}

function isValidIndianAddress(address) {
  if (typeof address !== 'string') return false;

  const trimmed = address.trim();

  // Length check
  if (trimmed.length < 10 || trimmed.length > 250) return false;

  // Basic character pattern
  const addressRegex = /^[A-Za-z0-9\s,'\-./#()]*[A-Za-z0-9]$/;

  // Ensure no invalid characters, and does not start or end with symbols
  const startsWithValidChar = /^[A-Za-z0-9]/.test(trimmed);
  const endsWithValidChar = /[A-Za-z0-9]$/.test(trimmed);

  return addressRegex.test(trimmed) && startsWithValidChar && endsWithValidChar;
}

function isValidIndianNumber(number) {
  const pattern = /^[6-9]\d{9}$/;
  return pattern.test(number);
}

function formatDateToMonthYear(dateStr) {
  const date = new Date(dateStr);

  // Array of short month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

function validateHsnCode(hsnCode) {
    const cleanedCode = hsnCode.replace(/\s+/g, '');

    if (![2, 4, 6, 8].includes(cleanedCode.length)) {
        return false;
    }

    if (!/^\d+$/.test(cleanedCode)) {
        return false;
    }

    return true;
}

function validateProductName(name) {
  if (typeof name !== 'string') return false;
  if (name.trim().length < 2 || name.trim().length > 100) return false;
  if (!/^[a-zA-Z0-9\s\-&()]+$/.test(name)) return false;
  return true;
}

export {
  verifyEmail,
  isValidName,
  isValidGSTNumber,
  isValidIndianAddress,
  isValidIndianNumber,
  formatDateToMonthYear,
  validateHsnCode,
  validateProductName
};
