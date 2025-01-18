
// src/components/auth/SignOutButton.tsx
'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function SignOutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sign Out
    </Button>
  );
}
