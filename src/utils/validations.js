const verifyEmail = email => {
  // Basic email regex pattern (covers most common cases)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export {verifyEmail};
