import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { currentPassword, newPassword, confirmNewPassword } = body;

    // 1. Validation: required fields
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json(
        { error: 'All fields (current, new, and confirm password) are required.' },
        { status: 400 }
      );
    }

    // 2. Validation: length requirement
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters in length.' },
        { status: 400 }
      );
    }

    // 3. Validation: confirmation match
    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        { error: 'New password and confirmation do not match.' },
        { status: 400 }
      );
    }

    // 4. Validation: new != current
    if (newPassword === currentPassword) {
      return NextResponse.json(
        { error: 'New password cannot be the same as the current password.' },
        { status: 400 }
      );
    }

    // 5. Fetch user from database
    const user = await prisma.adminUser.findUnique({
      where: { email: session.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // 6. Verify current password
    const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentValid) {
      return NextResponse.json(
        { error: 'The current password you entered is incorrect.' },
        { status: 400 }
      );
    }

    // 7. Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // 8. Update in database
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { password: newPasswordHash },
    });

    // 9. Return safe response without password
    return NextResponse.json({
      success: true,
      message: 'Password has been successfully changed.',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'An unexpected system error occurred while updating password.' },
      { status: 500 }
    );
  }
}
