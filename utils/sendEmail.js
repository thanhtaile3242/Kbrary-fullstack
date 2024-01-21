import nodemailer from "nodemailer";

const sendEMail = async (email, codeEmail) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "thanhtaile3242@gmail.com",
            pass: "oagtbtqgzvkshqhe",
        },
    });

    const info = await transporter.sendMail({
        from: '"Kbrary" <Kbrary.edu@example.com>', // sender address
        to: email,
        subject: "Notification from Kbrary", // Subject line
        html: `
        <h2>Kmin Library Notification</h2>
    
        <p>Hello, our loved member</p>
        
        <p>Your password reset code is: <strong>${codeEmail}</strong></p>
        
        <p>If you did not request a password reset or have any concerns, please ignore this email.</p>
        
        <p><strong>Note:</strong> This code is valid for a single use only and will expire after use.</p>
        
        <p>If you have already used this code to reset your password, disregard this message.</p>
        
        <p>Thank you for using our services. If you have any questions or need further assistance, feel free to contact us.</p>
        
        <p>Best regards!</p>
        `, // html body
    });

    return info;
};
export default sendEMail;
