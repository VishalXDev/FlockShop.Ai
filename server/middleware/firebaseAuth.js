const admin = require("firebase-admin");
require('dotenv').config();  // Ensure environment variables are loaded

// Get credentials from environment variables
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Fix private key formatting
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = async function (req, res, next) {
  // Skip authentication in development if configured
  if (process.env.SKIP_AUTH === 'true') {
    req.user = { uid: 'dev-user', email: 'dev@example.com' };
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;  // Attach user info to request
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);

    // More specific error messages
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: "Token expired. Please login again" });
    }

    res.status(401).json({ message: "Invalid token" });
  }
};
