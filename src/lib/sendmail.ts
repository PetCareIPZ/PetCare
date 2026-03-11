import { transporter } from "./mail";

export async function sendMail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  await transporter.sendMail({
    from: `"PetCare" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
}