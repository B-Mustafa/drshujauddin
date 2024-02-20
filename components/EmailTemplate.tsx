import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  phoneNumber: string;
  appointmentDate: string;
  complaints: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000/";

export const EmailTemplate = ({
  firstName,
  lastName,
  email,
  age,
  gender,
  phoneNumber,
  appointmentDate,
  complaints,
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Appointment Confirmation
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/koala-logo.png`}
          width="170"
          height="50"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi {firstName} {lastName},</Text>
        <Text style={paragraph}>
          Thank you for booking an appointment. Here are your details:
        </Text>
        <Text style={paragraph}>
          Age: {age}
        </Text>
        <Text style={paragraph}>
          Gender: {gender}
        </Text>
        <Text style={paragraph}>
          Email: {email}
        </Text>
        <Text style={paragraph}>
          Phone Number: {phoneNumber}
        </Text>
        <Text style={paragraph}>
          Appointment Date: {appointmentDate}
        </Text>
        <Text style={paragraph}>
          Complaints: {complaints}
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://getkoala.com">
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Koala team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA  94080
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles for the email template
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px  0  48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px  0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

export default EmailTemplate;
