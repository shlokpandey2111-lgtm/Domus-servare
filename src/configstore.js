export const getConfig = () => {
  const saved = localStorage.getItem('domus_ceo_config');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    services: {
      "Full-Time Maid": 12000,
      "Deep Cleaning": 1499,
      "Expert Cooking": 8000,
      "Gardening": 2500,
      "Baby Sitting": 5000
    },
    platformFee: 99,
    adminPassword: '1234'
  };
};

export const saveConfig = (config) => {
  localStorage.setItem('domus_ceo_config', JSON.stringify(config));
  window.dispatchEvent(new Event('configUpdated'));
};
