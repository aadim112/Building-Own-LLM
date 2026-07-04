import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

// Load configuration from environment variables, falling back to your provided credentials
// if environment variables are not loaded by the bundler.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBKhZs3cP8VkVIQmjkFtyVe8ZdyZxlgNI8",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "understandllm.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "understandllm",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "understandllm.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "836701335964",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:836701335964:web:d7b2430266c79300c85859"
};

// Detect if user is on a mobile device
const isMobile = () => /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Check if configuration is set and valid
const isConfigValid =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "your_api_key_here" &&
  firebaseConfig.apiKey.trim() !== "";

let auth;
let googleProvider;
let usingMockAuth = false;

// Mock callbacks for auth state tracking
const mockCallbacks = new Set();
let mockCurrentUser = null;

if (isConfigValid) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  } catch (error) {
    console.error("Firebase failed to initialize, switching to mock mode:", error);
    usingMockAuth = true;
  }
} else {
  usingMockAuth = true;
}

// Wrapper implementations that fail-safe to Mock when Firebase is not configured
let signInWithPopupWrapper;
let signOutWrapper;
let onAuthStateChangedWrapper;
let getRedirectResultWrapper;

if (usingMockAuth) {
  console.warn(
    "Firebase credentials are invalid or failed to initialize. Falling back to local Mock authentication preview."
  );

  auth = {
    currentUser: null
  };
  googleProvider = {};

  signInWithPopupWrapper = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: "mock-user-123",
          displayName: "Demo User",
          email: "guest@insidellms.com",
          photoURL: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        };
        mockCurrentUser = mockUser;
        auth.currentUser = mockUser;
        mockCallbacks.forEach(cb => cb(mockUser));
        resolve({ user: mockUser });
      }, 600);
    });
  };

  signOutWrapper = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockCurrentUser = null;
        auth.currentUser = null;
        mockCallbacks.forEach(cb => cb(null));
        resolve();
      }, 300);
    });
  };

  onAuthStateChangedWrapper = (authObj, callback) => {
    mockCallbacks.add(callback);
    callback(mockCurrentUser);
    return () => {
      mockCallbacks.delete(callback);
    };
  };

  getRedirectResultWrapper = async () => null;

} else {
  // Smart sign-in: use redirect on mobile (avoids popup blockers), popup on desktop
  signInWithPopupWrapper = async (authInstance, provider) => {
    if (isMobile()) {
      // On mobile, redirect is more reliable than popup
      await signInWithRedirect(authInstance, provider);
      return null; // Result is handled by getRedirectResult on app load
    } else {
      return signInWithPopup(authInstance, provider);
    }
  };

  signOutWrapper = signOut;
  onAuthStateChangedWrapper = onAuthStateChanged;
  getRedirectResultWrapper = getRedirectResult;
}

export {
  auth,
  googleProvider,
  signInWithPopupWrapper as signInWithPopup,
  signOutWrapper as signOut,
  onAuthStateChangedWrapper as onAuthStateChanged,
  getRedirectResultWrapper as getRedirectResult,
  usingMockAuth
};
export default isConfigValid && !usingMockAuth ? auth : null;
