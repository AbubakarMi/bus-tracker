import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OtpEmailProps {
  userEmail: string;
  userName: string;
  otp: string;
  userType: string;
  expiresAt: string;
}

export const OtpEmail = ({
  userEmail = 'user@example.com',
  userName = 'User',
  otp = '123456',
  userType = 'student',
  expiresAt = new Date(Date.now() + 15 * 60 * 1000).toLocaleString(),
}: OtpEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Bus Tracker password reset code: {otp}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Text style={logoText}>🚌 Bus Tracker</Text>
        </Section>

        <Heading style={h1}>Password Reset Request</Heading>

        <Text style={text}>
          Hello {userName},
        </Text>

        <Text style={text}>
          You requested to reset your password for your Bus Tracker {userType} account ({userEmail}).
        </Text>

        <Text style={text}>
          Your verification code is:
        </Text>

        <Section style={otpSection}>
          <Text style={otpCode}>{otp}</Text>
        </Section>

        <Text style={text}>
          This code will expire at: <strong>{expiresAt}</strong>
        </Text>

        <Text style={text}>
          If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
        </Text>

        <Text style={text}>
          For security reasons, this code can only be used once and expires in 15 minutes.
        </Text>

        <Text style={footer}>
          Best regards,<br />
          The Bus Tracker Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OtpEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #e6ebf1',
  maxWidth: '600px',
};

const logoSection = {
  padding: '20px 40px',
  borderBottom: '1px solid #e6ebf1',
  textAlign: 'center' as const,
};

const logoText = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#2563eb',
  margin: '0',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 0',
  padding: '0 40px',
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
  padding: '0 40px',
};

const otpSection = {
  textAlign: 'center' as const,
  padding: '20px 40px',
};

const otpCode = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#2563eb',
  backgroundColor: '#f3f4f6',
  padding: '20px 40px',
  borderRadius: '8px',
  border: '2px dashed #2563eb',
  letterSpacing: '8px',
  fontFamily: 'monospace',
  margin: '20px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '32px 0',
  padding: '0 40px',
  borderTop: '1px solid #e6ebf1',
  paddingTop: '20px',
};