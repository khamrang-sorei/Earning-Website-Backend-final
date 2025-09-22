import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// MSG91 Configuration
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_OTP_TEMPLATE_ID = process.env.MSG91_OTP_TEMPLATE_ID; // Template ID for OTP
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID;

/**
 * Function to send OTP using MSG91
 * @param {string} phone - Phone number
 * @param {string} otp - OTP to send
 */
const sendOtp = async (phone, otp) => {
    try {
        if (!MSG91_AUTH_KEY) {
            throw new Error('MSG91_AUTH_KEY is not configured');
        }

        if (!MSG91_OTP_TEMPLATE_ID) {
            throw new Error('MSG91_OTP_TEMPLATE_ID is not configured');
        }

        if (!MSG91_SENDER_ID) {
            throw new Error('MSG91_SENDER_ID is not configured');
        }

        // Remove any spaces or special characters from mobile number
        const cleanMobile = phone.replace(/\D/g, '');
        
        // Ensure mobile number has country code
        const formattedMobile = cleanMobile.startsWith('91') ? `+${cleanMobile}` : `+91${cleanMobile}`;

        const response = await axios.post('https://api.msg91.com/api/v5/flow/', {
            authkey: MSG91_AUTH_KEY,
            mobiles: formattedMobile,
            flow_id: MSG91_OTP_TEMPLATE_ID,
            sender: MSG91_SENDER_ID,
            var: otp
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        // Fallback to older API method
        try {
            const fallbackResponse = await axios.get('https://api.msg91.com/api/sendhttp.php', {
                params: {
                    authkey: MSG91_AUTH_KEY,
                    mobiles: formattedMobile,
                    message: `Dear Customer, your OTP for login is ${otp}. Please do not share it with anyone. - VERANIX AI`,
                    sender: MSG91_SENDER_ID,
                    route: '4',
                    country: '91'
                }
            });
            return fallbackResponse.data;
        } catch (fallbackError) {
            throw new Error('Failed to send OTP. Please try again.');
        }
    }
};

/**
 * Function to verify OTP and handle user login/signup
 * @param {string} phone - Phone number
 * @param {string} otp - OTP to verify
 * @param {string} referredBy - Referral ID (optional)
 */
const verifyOtp = async (phone, otp, referredBy = null) => {
    try {
        if (!MSG91_AUTH_KEY) {
            throw new Error('MSG91_AUTH_KEY is not configured');
        }

        if (!MSG91_OTP_TEMPLATE_ID) {
            throw new Error('MSG91_OTP_TEMPLATE_ID is not configured');
        }

        if (!MSG91_SENDER_ID) {
            throw new Error('MSG91_SENDER_ID is not configured');
        }

        // Remove any spaces or special characters from mobile number
        const cleanMobile = phone.replace(/\D/g, '');
        
        // Ensure mobile number has country code
        const formattedMobile = cleanMobile.startsWith('91') ? `+${cleanMobile}` : `+91${cleanMobile}`;

        const response = await axios.post('https://api.msg91.com/api/v5/otp/verify', {
            authkey: MSG91_AUTH_KEY,
            mobile: formattedMobile,
            otp: otp
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to verify OTP. Please try again.');
    }
};

/**
 * Function to resend OTP
 * @param {string} phone - Phone number
 */
const resendOtp = async (phone) => {
    try {
        if (!MSG91_AUTH_KEY) {
            throw new Error('MSG91_AUTH_KEY is not configured');
        }

        if (!MSG91_OTP_TEMPLATE_ID) {
            throw new Error('MSG91_OTP_TEMPLATE_ID is not configured');
        }

        if (!MSG91_SENDER_ID) {
            throw new Error('MSG91_SENDER_ID is not configured');
        }

        // Remove any spaces or special characters from mobile number
        const cleanMobile = phone.replace(/\D/g, '');
        
        // Ensure mobile number has country code
        const formattedMobile = cleanMobile.startsWith('91') ? `+${cleanMobile}` : `+91${cleanMobile}`;

        const response = await axios.post('https://api.msg91.com/api/v5/flow/', {
            authkey: MSG91_AUTH_KEY,
            mobiles: formattedMobile,
            flow_id: MSG91_OTP_TEMPLATE_ID,
            sender: MSG91_SENDER_ID
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to resend OTP. Please try again.');
    }
};

export { sendOtp, verifyOtp, resendOtp };