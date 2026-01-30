const API_URL = 'https://script.google.com/macros/s/AKfycbyxP6n0O-O26qaMBAsy7fs3x7L8ghLciArnb-JMq85StlK6hWA4pKDkUUfPkpn4uoM4Xw/exec';

export interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
  timestamp?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  count?: number;
  wishes?: Wish[];
  wish?: Wish;
  error?: string;
  stack?: string;
}

// Simple GET request with cache busting
export const fetchWishes = async (): Promise<Wish[]> => {
  try {
    // Add timestamp to prevent caching
    const timestamp = Date.now();
    const url = `${API_URL}?t=${timestamp}`;
    
    // const response = await fetch(url);
    const response = await fetch(url, { mode: 'no-cors' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    const data: ApiResponse = JSON.parse(text);
    
    if (data.success && data.wishes) {
      console.log(`Fetched ${data.wishes.length} wishes from API`);
      return data.wishes;
    } else {
      console.error('API returned failure:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching wishes from API:', error);
    // Return empty array instead of throwing to prevent UI crash
    return [];
  }
};

// Submit using URL parameters (works better with Google Apps Script)
export const submitWish = async (name: string, message: string): Promise<Wish | null> => {
  try {
    // URL encode the parameters
    const encodedName = encodeURIComponent(name);
    const encodedMessage = encodeURIComponent(message);
    
    // Use GET request with parameters as a fallback method
    // Google Apps Script can read parameters from doPost
    const url = `${API_URL}?name=${encodedName}&message=${encodedMessage}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // Also send as form data
      body: `name=${encodedName}&message=${encodedMessage}`
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    const data: ApiResponse = JSON.parse(text);
    
    if (data.success && data.wish) {
      console.log('Successfully submitted wish:', data.wish);
      return data.wish;
    } else {
      console.error('Submission failed:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error submitting wish:', error);
    return null;
  }
};

// Alternative: JSON submission
export const submitWishJson = async (name: string, message: string): Promise<Wish | null> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, message })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    const data: ApiResponse = JSON.parse(text);
    
    if (data.success && data.wish) {
      console.log('JSON submission successful:', data.wish);
      return data.wish;
    } else {
      console.error('JSON submission failed:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error in JSON submission:', error);
    return null;
  }
};

// Test function to verify API is working
export const testApiConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}?test=true`);
    const text = await response.text();
    const data = JSON.parse(text);
    
    console.log('API Test response:', data);
    return data.success === true;
  } catch (error) {
    console.error('API Test failed:', error);
    return false;
  }
};