# **App Name**: SwiftRoute

## Core Features:

- Student Registration with Registry Verification: Allows students to register using their regNumber, email, and password. Validates regNumber against a pre-populated registry to ensure only valid students can sign up.
- Route Display and Seat Booking: Displays available routes, scheduled times, and real-time seat availability. Allows students and staff to select seats from a visual seat map and create bookings.
- PDF Ticket Generation: Generates a PDF ticket upon successful booking containing passenger details, route, date/time, seat number, and a QR code. Ticket generated and stored with redundant client-side and server-side PDF generator implementations.
- Real-Time Bus Tracking: Displays a real-time map with bus marker movements based on GPS updates from drivers. Interpolates positions for smooth animation.  Includes ETA calculation as a tool using distance and speed.
- Admin Dashboard for User and Route Management: Provides an admin interface to manage unions, routes, buses, staff, drivers, generate demo data, and view live bus tracker.
- Driver Dashboard with Trip Updates: Offers a driver dashboard to update their status (idle, departed, on_route, arrived) and broadcast GPS updates. Shows passenger list and ability to mark passengers as boarded.
- Firebase Cloud Messaging Notifications: Sends web notifications for booking confirmations, 15-min reminders, driver departure/arrival, and route delays. Implemented via Firebase Cloud Messaging, after permission request.

## Style Guidelines:

- Primary color: Deep Blue (#0B5FFF), evokes trust and aligns with technological aesthetics.
- Background color: Very light gray (#F8F9FA), ensures a neutral and clean backdrop, reducing visual fatigue.
- Accent color: Emerald Green (#00C897), provides a positive confirmation cue and symbolizes success in booking processes.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text, creating a balance of tech-forward clarity and readability.
- Use consistent, clear icons from a minimalist set (e.g., Font Awesome or Material Icons) to represent routes, bus stops, user roles, and notifications.
- Employ a responsive, mobile-first design using Tailwind CSS grid and flexbox. Prioritize clear information hierarchy and easy navigation.
- Use subtle, engaging Lottie animations for the landing page hero section to represent the bus in motion, creating a welcoming and dynamic first impression.