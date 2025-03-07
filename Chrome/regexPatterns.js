// regexPatterns.js

// Specific patterns provided as key-value pairs
let specifics = {
    "Slack Token": "(xox[pboa]-[0-9]{12}-[0-9]{12}-[0-9]{12}-[a-z0-9]{32})",
    "RSA private key": "-----BEGIN RSA PRIVATE KEY-----",
    "SSH (DSA) private key": "-----BEGIN DSA PRIVATE KEY-----",
    "SSH (EC) private key": "-----BEGIN EC PRIVATE KEY-----",
    "PGP private key block": "-----BEGIN PGP PRIVATE KEY BLOCK-----",
    "Amazon MWS Auth Token": "amzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
    "AWS AppSync GraphQL Key": "da2-[a-z0-9]{26}",
    "Facebook Access Token": "EAACEdEose0cBA[0-9A-Za-z]+",
    "Facebook OAuth": "[fF][aA][cC][eE][bB][oO][oO][kK].{0,20}['|\"][0-9a-f]{32}['|\"]",
    "GitHub": "[gG][iI][tT][hH][uU][bB].{0,20}['|\"][0-9a-zA-Z]{35,40}['|\"]",
    "Google API Key": "AIza[0-9A-Za-z\\-_]{35}",
    // "Google Cloud Platform API Key": "AIza[0-9A-Za-z\\-_]{35}",
    // "Google Cloud Platform OAuth": "[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com",
    // "Google Drive API Key": "AIza[0-9A-Za-z\\-_]{35}",
    // "Google Drive OAuth": "[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com",
    // "Google (GCP) Service-account": "\"type\": \"service_account\"",
    // "Google Gmail API Key": "AIza[0-9A-Za-z\\-_]{35}",
    "Google Gmail OAuth": "[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com",
    // "Google OAuth Access Token": "ya29\\.[0-9A-Za-z\\-_]+",
    "Google YouTube API Key": "AIza[0-9A-Za-z\\-_]{35}",
    "Google YouTube OAuth": "[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com",
    "Heroku API Key": "[hH][eE][rR][oO][kK][uU].{0,20}[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}",
    "Json Web Token": "eyJhbGciOiJ",
    "MailChimp API Key": "[0-9a-f]{32}-us[0-9]{1,2}",
    "Mailgun API Key": "key-[0-9a-zA-Z]{32}",
    "Password in URL": "[a-zA-Z]{3,10}://[^/\\s:@]{3,20}:[^/\\s:@]{3,20}@.{1,100}[\"'\\s]",
    "PayPal Braintree Access Token": "access_token\\$production\\$[0-9a-z]{16}\\$[0-9a-f]{32}",
    "Picatic API Key": "sk_live_[0-9a-z]{32}",
    "Slack Webhook": "https://hooks\\.slack\\.com/services/T[a-zA-Z0-9_]{8}/B[a-zA-Z0-9_]{8}/[a-zA-Z0-9_]{24}",
    "Stripe API Key": "sk_live_[0-9a-zA-Z]{24}",
    "Stripe Restricted API Key": "rk_live_[0-9a-zA-Z]{24}",
    "Square Access Token": "sq0atp-[0-9A-Za-z\\-_]{22}",
    "Square OAuth Secret": "sq0csp-[0-9A-Za-z\\-_]{43}",
    "Telegram Bot API Key": "[0-9]+:AA[0-9A-Za-z\\-_]{33}",
    "Twilio API Key": "SK[0-9a-fA-F]{32}",
    "Github Auth Creds": "https:\\/\\/[a-zA-Z0-9]{40}@github\\.com",
    "Azure SAS Token": "se=\\d+&sig=[0-9A-Za-z%]+",
    "Okta Token": "00[a-zA-Z0-9]{28}[a-zA-Z0-9]{2}",
    "Bitbucket App Password": "bbtoken_[0-9a-zA-Z]{32}",
    "Shopify Private App Token": "(shppa|shpss)_[0-9a-zA-Z]{32,64}",
    "DigitalOcean PAT": "do_[0-9a-zA-Z]{64}",
    "GitLab Personal Access Token": "glpat-[0-9A-Za-z\\-_]{20}"
  };
  
  // Convert the specifics object into an array of regex objects
  const specificPatterns = Object.keys(specifics).map(name => ({
    name,
    regex: new RegExp(specifics[name], "g")
  }));
  
  // Generic patterns defined separately
  const genericPatterns = [
    {
      name: "AWS Access Key",
      regex: /AKIA[0-9A-Z]{16}/g
    },
    {
      name: "Google API Key",
      regex: /AIza[0-9A-Za-z-_]{35}/g
    },
    {
      name: "Generic API Key",
      regex: /(?<![A-Za-z0-9])[A-Za-z0-9]{32}(?![A-Za-z0-9])/g
    },
    {
      name: ".env API Key",
      regex: /API_KEY\s*=\s*['"]?([A-Za-z0-9-_]+)['"]?/g
    },
    {
      name: "Private Key Block",
      regex: /-----BEGIN (RSA|DSA|EC) PRIVATE KEY-----[\s\S]+?-----END (RSA|DSA|EC) PRIVATE KEY-----/g
    }
  ];
  
  // Combine generic and specific patterns into a single array
  const regexPatterns = [
    ...genericPatterns,
    ...specificPatterns
  ];
  