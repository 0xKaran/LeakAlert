// regexPatterns.js

// Example specifics object
let specifics = {
  "AWS Access Key": "AKIA[0-9A-Z]{16}",
  "Slack Token": "(xox[pboa]-[0-9]{12}-[0-9]{12}-[0-9]{12}-[a-z0-9]{32})",
  "Generic API Key": "[A-Za-z0-9]{32}",
  // Add more patterns as needed...
};

const specificPatterns = Object.keys(specifics).map(name => ({
  name,
  regex: new RegExp(specifics[name], "g")
}));

// Additional generic patterns
const genericPatterns = [
  {
    name: "Google API Key",
    regex: /AIza[0-9A-Za-z\-_]{35}/g
  },
  {
    name: "Private Key Block",
    regex: /-----BEGIN (RSA|DSA|EC) PRIVATE KEY-----[\s\S]+?-----END (RSA|DSA|EC) PRIVATE KEY-----/g
  }
];

// Final combined array
const regexPatterns = [...genericPatterns, ...specificPatterns];
