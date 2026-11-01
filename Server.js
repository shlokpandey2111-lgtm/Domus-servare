const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());
app.get('/', (req, res) => {
res.send('Domus-servare V3 is LIVE!');
});
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
