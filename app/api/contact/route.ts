import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, company, serviceType, projectDetails } = body;

    // Basic Validation
    if (!fullName || !email || !phone || !serviceType || !projectDetails) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please complete all required fields (Full Name, Email, Phone, Service Type, and Details).',
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // TODO: Connect real CRM / Email service (e.g. Resend, SendGrid, HubSpot, or Nodemailer)
    // Example:
    // await resend.emails.send({
    //   from: 'leads@modespowerservices.com',
    //   to: 'engineering@modespowerservices.com',
    //   subject: `New Technical Lead: ${fullName} (${serviceType})`,
    //   text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company || 'N/A'}\nService: ${serviceType}\nDetails: ${projectDetails}`,
    // });

    console.log('[Modes Power Services] New Contact Inquiry Received:', {
      fullName,
      email,
      phone,
      company,
      serviceType,
      projectDetails,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your consultation request has been routed to our Lead Electrical Engineer.',
      referenceNo: `MPS-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again or call our 24/7 hotline.' },
      { status: 500 }
    );
  }
}
