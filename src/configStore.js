export const LANGUAGES = [
  { code: 'en', native: 'English' }, { code: 'hi', native: 'हिंदी' },
  { code: 'bn', native: 'বাংলা' }, { code: 'ta', native: 'தமிழ்' },
  { code: 'te', native: 'తెలుగు' }, { code: 'mr', native: 'मराठी' },
  { code: 'gu', native: 'ગુજરાતી' }, { code: 'kn', native: 'ಕನ್ನಡ' },
  { code: 'ml', native: 'മലയാളം' }, { code: 'pa', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', native: 'ଓଡ଼ିଆ' }, { code: 'as', native: 'অসমীয়া' },
  { code: 'ur', native: 'اردو' }, { code: 'brx', native: 'बड़ो' },
  { code: 'doi', native: 'डोगरी' }, { code: 'ks', native: 'कॉशुर' },
  { code: 'kok', native: 'कोंकणी' }, { code: 'mai', native: 'मैथिली' },
  { code: 'mni', native: 'মৈতৈলোন্' }, { code: 'ne', native: 'नेपाली' },
  { code: 'sa', native: 'संस्कृतम्' }, { code: 'sat', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'sd', native: 'سنڌي' },
];

const DEFAULT = {
  services: { "Full-Time Maid": 12000, "Deep Cleaning": 1499, "Expert Cooking": 8000, "Gardening": 2500 },
  platformFee: 99,
  adminMobile: '9876543210', // Tu andar se change kar payega
  customers: [],
  providers: [],
  selectedLang: null,
  currentUser: null,
};

export const getConfig = () => {
  try {
    const s = localStorage.getItem('domus_v7_final');
    return s ? JSON.parse(s) : DEFAULT;
  } catch { return DEFAULT; }
};
export const saveConfig = (c) => {
  localStorage.setItem('domus_v7_final', JSON.stringify(c));
  window.dispatchEvent(new Event('configUpdated'));
};
export const generateOTP = (mobile) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  localStorage.setItem(`otp_${mobile}`, JSON.stringify({ otp, expiry: Date.now() + 120000 }));
  return otp;
};
export const verifyOTP = (mobile, input) => {
  try {
    const d = JSON.parse(localStorage.getItem(`otp_${mobile}`));
    if (!d || Date.now() > d.expiry) return false;
    return d.otp === input;
  } catch { return false; }
};
