const express = require('express');
const router = express.Router();
const YourModel = require('../models/yourModel');
const YourModell = require('../models/userModel');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

router.post('/items', async (req, res) => {
  try {
    const newItem = await YourModel.create(req.body);
    res.status(201).json(newItem);

    const { name, email ,position,startDate,salary} = req.body;
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const imagePath = 'A://ReactProjects//employee-offer-letter//front-end//src//asserts//Logo.png'; 
    const imageBuffer = fs.readFileSync(imagePath); 
    

    // Generate PDF content
    const pdfDoc = new PDFDocument();
    pdfDoc.image(imageBuffer, 50, 50, { width: 200})
      .moveDown()
      .moveDown()
      .moveDown()
      .moveDown()
      .moveDown();
    pdfDoc.font('Helvetica-Bold').fontSize(20).text('Internship Offer Letter', { align: 'center' })
      .moveDown();
    pdfDoc.font('Helvetica').fontSize(12).text(`${formattedDate},`)
      .moveDown();
    pdfDoc.font('Helvetica').fontSize(12).text(`Dear ${name},`)
      .moveDown();
    pdfDoc.moveDown().text(`We are pleased to offer you the full-time position of ${position} at Suvidha Foundation ${startDate}.`)
      .moveDown()
      .text('We believe your skills and experience are an excellent match for our company.')
      .moveDown()
      .text('In this role, you will be managing and working on various software development projects, making the best use of your programming skills.')
      .moveDown()
      .text(`The starting stipend for this position is INR ${salary} per month, which may grow with your consistently impressive performance. You may also have the opportunity to continue working with us as a full-time employee after this internship, based on your performance.`)
      .moveDown()
      .text('Your working hours will be 4PM - 12AM, Monday - Saturday, and you will be reporting to various stakeholders including your Manager, Team, and Clients.')
      .moveDown()
      .text('Please confirm your acceptance of this offer with in 24 hours')
      .moveDown()
      .text('We are excited to have you join our team!')
      .moveDown()
      .text('If you have any questions, please feel free to reach out at any time.')
      .moveDown()
      .text('Sincerely,')
      .moveDown()
      .text(' Founder’s office, Suvidha Foundation');


    const buffers = [];
    pdfDoc.on('data', buffers.push.bind(buffers));
    pdfDoc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);

      // Create transporter for sending email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'reddyabhilashreddy6@gmail.com',
          pass: 'kmva tmcx vxlp ntkt',
        },
      });

      // Send email with attached PDF
      const mailOptions = {
        from: 'reddyabhilashreddy6@gmail.com',
        to: email,
        subject: 'Your Job Offer',
        text: `Dear ${name},\n\nCongratulations! We are pleased to offer you the job as Inten.Go through the attachment!\n\nSincerely,\nsuvidha foundation`,
        attachments: [
          {
            filename: 'Offer_Letter.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    });

    pdfDoc.end(); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const newUser = await YourModell.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await YourModell.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

  
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }


    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});






module.exports = router;





