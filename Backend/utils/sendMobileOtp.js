const twilio = require('twilio');


const twilioPhoneNumber = '';


const sendOtp = async (mobile, otp) => {
    try {
        await client.messages.create({
            body: `Your OTP: ${otp}`,
            to: mobile,
            from: twilioPhoneNumber,
        });

        console.log('OTP sent successfully via SMS');
    } catch (error) {
        console.error('Error sending OTP via SMS:', error);
        throw new Error('Failed to send OTP');
    }
};

module.exports = sendOtp;