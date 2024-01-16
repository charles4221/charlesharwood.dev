import NodeMailer from 'nodemailer';

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string>;
  const { FirstName, LastName, Email, Phone, Company, Website, Description } =
    body;

  const transporter = NodeMailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_KEY,
    },
  });

  const mailOptions = {
    from: 'charlesharwood.dev <no-reply@charlesharwood.dev>',
    replyTo: `${FirstName} ${LastName} <${Email}>`,
    to: 'charles@harwood.digital',
    subject: 'New enquiry from charlesharwood.dev',
    text: `First Name: ${FirstName}\nLast Name: ${LastName}\nEmail: ${Email}\nPhone: ${Phone}\nCompany: ${Company}\nWebsite: ${Website}\nMessage: ${Description}`,
    html: `<p>First Name: ${FirstName}</p><p>Last Name: ${LastName}</p><p>Email: ${Email}</p><p>Phone: ${Phone}</p><p>Company: ${Company}</p><p>Website: ${Website}</p><p>Message: ${Description}</p>`,
  };

  try {
    const sentMessageInfo = await transporter.sendMail(mailOptions);
    const wasRejected = sentMessageInfo.rejected.length > 0;

    return Response.json(
      wasRejected
        ? {
            error: sentMessageInfo.response,
          }
        : {
            message: sentMessageInfo.response,
          },
      {
        status: wasRejected ? 500 : 200,
      },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Failed to send email',
      },
      { status: 500 },
    );
  }
}
