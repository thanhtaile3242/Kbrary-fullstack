import nodemailer from "nodemailer";

const sendEmailRequest = async (data, email) => {
    const { fullname, allowDate, allowNote, allowDuration } = data;
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "thanhtaile3242@gmail.com",
            pass: "oagtbtqgzvkshqhe",
        },
    });
    let letter = "";
    // if outofstock all
    if (allowDate && allowDuration) {
        const formattedDate = allowDate?.toDateString();
        letter = `
        <h2>Kmin Library Notification</h2>
        <p>Hello <strong>${fullname}</strong>,</p>
    
        <p>Your request for borrowing books from the online library has been successfully handled.</p>
    
        <p>Please make sure to arrive at the library on time to collect your books.</p>
    
        <p><strong>Arrival Time:</strong> ${formattedDate}</p>
        <p><strong>Duration:</strong> ${allowDuration} days</p>
        <p><strong>Note:</strong> ${allowNote}</p>
    
        <p>Thank you for using our library services. If you have any further questions, feel free to contact us.</p>
    
        <p>Best regards,<br>Kmin Library Administration</p>
        `;
    } else {
        letter = `
        <h2>Kmin Library Notification</h2>
        <p>Hello <strong>${fullname}</strong>,</p>
    
        <p>Your request for borrowing books from the online library has been successfully handled.</p>
    
        <p><strong>
        We regret to inform you that the books you borrowed are currently out of stock in our library; we apologize for any inconvenience this may cause
        </strong>.</p>
    
        <p>Thank you for using our library services. If you have any further questions, feel free to contact us.</p>
    
        <p>Best regards,<br>Kmin Library Administration</p>
        `;
    }

    const info = await transporter.sendMail({
        from: '"Kbrary" <Kbrary.edu@example.com>',
        to: email,
        subject: "Notification from Kbrary",
        html: letter,
    });

    return info;
};
export default sendEmailRequest;
