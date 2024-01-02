import nodemailer from "nodemailer";

const sendEMail = async (email, html) => {
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
        html: html, // html body
    });

    return info;
};
export default sendEMail;
