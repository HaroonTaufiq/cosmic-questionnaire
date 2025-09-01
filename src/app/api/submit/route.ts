import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface FormSubmission {
  id: string;
  timestamp: string;
  tradingType: 'stocks' | 'crypto' | 'both';
  cryptoPlatforms: string[];
  stockBrokers: string[];
  investmentRange: string;
  email: string;
  otherCrypto?: string;
  otherBroker?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['tradingType', 'investmentRange', 'email'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create submission object
    const submission: FormSubmission = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      tradingType: body.tradingType,
      cryptoPlatforms: body.cryptoPlatforms || [],
      stockBrokers: body.stockBrokers || [],
      investmentRange: body.investmentRange,
      email: body.email,
      otherCrypto: body.otherCrypto,
      otherBroker: body.otherBroker,
    };

    // Get the project root directory
    const projectRoot = process.cwd();
    const submissionsFile = path.join(projectRoot, 'submissions.json');

    let submissions: FormSubmission[] = [];

    try {
      // Try to read existing submissions
      const fileContent = await fs.readFile(submissionsFile, 'utf-8');
      submissions = JSON.parse(fileContent);
    } catch {
      // File doesn't exist or is invalid, start with empty array
      submissions = [];
    }

    // Ensure submissions is an array
    if (!Array.isArray(submissions)) {
      submissions = [];
    }

    // Add new submission
    submissions.push(submission);

    // Write back to file
    await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
} 