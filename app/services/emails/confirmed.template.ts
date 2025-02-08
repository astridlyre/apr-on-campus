import type { Incident } from "@prisma/client";

export interface EmailProps {
	user: {
		firstName: string;
		email: string;
	};
	subject: string;
	incident: Incident;
}

function text({ subject, user, incident }: EmailProps) {
	function paragraphifyPlain(text: string) {
		if (!text) return "";
		return text
			.split("\n")
			.filter(Boolean)
			.map((para) => para.trim())
			.join("\n\n");
	}

	return `Subject: ${subject}

Hi ${user.firstName},

Thank you for submitting your report to APR on Campus. We appreciate your time and effort in helping us document anti-Palestinian racism on campus.

Report ID: ${incident.id}

Below is an overview of what you can expect next:
• If you opted to have us forward your incident to legal, we’ll reach out to you via email with next steps once we’ve reviewed your submission.
• If you have questions at any time, please reach out to us at info@apr-on-campus.org and reference your Report ID.

We value your privacy and will treat your information with the utmost care. Thank you again for helping us build a safer environment.

Your Incident Details:
• Date: ${incident.date}
• Province: ${incident.province}
• Location: ${incident.location}
• Description:

${paragraphifyPlain(incident.description)}

• Your Name: ${incident.userFirstName} ${incident.userLastName}
• Your Email: ${incident.userEmail}
• Your Phone Number: ${incident.userPhoneNumber}

Sincerely,
The APR on Campus Team

© ${new Date().getFullYear()} APR on Campus
`;
}

function html({ subject, user, incident }: EmailProps) {
	function paragraphify(text: string) {
		if (!text) return "";
		return text
			.split("\n")
			.filter(Boolean)
			.map((para: string) => `<p>${para.trim()}</p>`)
			.join("");
	}

	return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <meta charset="utf-8">
    <!-- Ensure mobile responsiveness -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet" type="text/css">
    <!--<![endif]-->
    <title>${subject}</title>
    
    <style type="text/css">
      /* General resets */
      body, table, td, p {
        margin: 0;
        padding: 0;
        font-family: 'Source Sans 3', Helvetica, Arial, sans-serif;
        color: #334155; /* fg */
        font-size: 16px;
        line-height: 1.5;
      }
      
      body {
        background-color: #f8fafc; /* bg */
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
      }
      
      /* Container for the email body */
      .email-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff; 
        border: 1px solid #cbd5e1; /* border */
      }

      /* Header styles */
      .email-header {
        background-color: #facc15;
        text-align: center;
        padding: 20px;
        color: #ffffff;
        font-weight: 600;
        text-transform: uppercase;
      }

      /* Body content */
      .email-body {
        padding: 20px;
      }
      
      .highlight-block {
        background-color: #e2e8f0;
        padding: 15px;
        color: #334155; /* fg */
        margin: 20px 0;
      }
      
      /* Footer styles */
      .email-footer {
        background-color: #e2e8f0; /* bg2 or disabled */
        color: #334155; /* fg */
        text-align: center;
        padding: 10px;
        font-size: 14px;
      }
      
      /* Incident details block */
      .incident-details {
        margin: 20px 0;
        border: 1px solid #cbd5e1; /* divider/border */
        padding: 15px;
      }
      .incident-details h2 {
        margin-bottom: 10px;
        font-size: 18px;
      }
      .incident-details p {
        margin: 5px 0;
      }

      /* Responsive adjustments for smaller screens */
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body>
    <center class="email-container">
      <!-- Header -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="email-header">
            APR on Campus
          </td>
        </tr>
      </table>

      <!-- Body -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="email-body">
            <p style="margin-bottom: 20px;">
              Hi ${user.firstName},
            </p>
            <p style="margin-bottom: 20px;">
              Thank you for submitting your report to <strong>APR on Campus</strong>. We appreciate your time and effort in helping us document anti-Palestinian racism on campus.
            </p>
            
            <div class="highlight-block">
              <strong>Report ID:</strong> ${incident.id}
            </div>
            
            <p style="margin-bottom: 20px;">
              Below is an overview of what you can expect next:
            </p>
            <ul style="margin-bottom: 20px; padding-left: 20px;">
              <li>If you opted to have us forward your incident to legal, we’ll reach out to you via email with next steps once we’ve reviewed your submission.</li>
              <li>If you have questions at any time, please reach out to us at <a href="mailto:info@apr-on-campus.org" style="color:#2563eb; text-decoration:none;">info@apr-on-campus.org</a> and reference your Report ID.</li>
            </ul>
            <p style="margin-bottom: 20px;">
              We value your privacy and will treat your information with the utmost care. Thank you again for helping us build a safer environment.
            </p>

            <!-- Incident Details -->
            <div class="incident-details">
              <h2>Your Incident Details</h2>
              <p><strong>Date:</strong> ${incident.date}</p>
              <p><strong>Province:</strong> ${incident.province}</p>
              <p><strong>Location:</strong> ${incident.location}</p>
              <p><strong>Description:</strong></p>
              ${paragraphify(incident.description)}
              <p><strong>Your Name:</strong> ${incident.userFirstName} ${incident.userLastName}</p>
              <p><strong>Your Email:</strong> ${incident.userEmail}</p>
              <p><strong>Your Phone Number:</strong> ${incident.userPhoneNumber}</p>
            </div>

            <p style="margin-bottom: 0;">
              Sincerely,<br>
              The APR on Campus Team
            </p>
          </td>
        </tr>
      </table>

      <!-- Footer -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="email-footer">
            © <script>document.write(new Date().getFullYear())</script> APR on Campus
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`;
}

export default { text, html };
