import { supabase, isSupabaseConfigured } from '../supabase';

export interface UserSession {
  email: string;
  role: 'admin' | 'user';
}

const IS_BROWSER = typeof window !== 'undefined';

export const authService = {
  // Initiates OTP login
  async signInWithOtp(email: string): Promise<{ success: boolean; message: string }> {
    if (!isSupabaseConfigured) {
      console.log(`[Mock Auth] OTP Code 123456 sent to: ${email}`);
      return {
        success: true,
        message: 'Mock OTP code "123456" sent to your email. (Running in Mock Mode)'
      };
    }

    try {
      const { error } = await supabase!.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true
        }
      });

      if (error) throw error;
      return {
        success: true,
        message: 'OTP verification code has been sent to your email.'
      };
    } catch (e: any) {
      console.error('Supabase signInWithOtp error:', e);
      return {
        success: false,
        message: e.message || 'Failed to send OTP code. Please try again.'
      };
    }
  },

  // Verifies OTP code
  async verifyOtp(email: string, token: string): Promise<{ success: boolean; session: UserSession | null; error?: string }> {
    if (!isSupabaseConfigured) {
      if (token === '123456') {
        const session: UserSession = {
          email,
          role: email.includes('admin') || email === 'demo@nextron.com' ? 'admin' : 'user'
        };
        if (IS_BROWSER) {
          localStorage.setItem('nextron_session', JSON.stringify(session));
        }
        return { success: true, session };
      } else {
        return { success: false, session: null, error: 'Invalid verification code. Use 123456 for demo login.' };
      }
    }

    try {
      const { data, error } = await supabase!.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned');

      // Check role from profiles
      const { data: profile, error: profileError } = await supabase!
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      // If profile doesn't exist yet, wait 1 second and retry (in case trigger is slow)
      let role: 'admin' | 'user' = 'user';
      if (!profileError && profile) {
        role = profile.role as 'admin' | 'user';
      }

      const session: UserSession = {
        email: data.user.email || email,
        role
      };

      return { success: true, session };
    } catch (e: any) {
      console.error('Supabase verifyOtp error:', e);
      return {
        success: false,
        session: null,
        error: e.message || 'OTP verification failed. Please try again.'
      };
    }
  },

  // Gets current session
  async getCurrentSession(): Promise<UserSession | null> {
    if (!isSupabaseConfigured) {
      if (IS_BROWSER) {
        const local = localStorage.getItem('nextron_session');
        return local ? JSON.parse(local) : null;
      }
      return null;
    }

    try {
      const { data: { session }, error } = await supabase!.auth.getSession();
      if (error || !session?.user) return null;

      const { data: profile } = await supabase!
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      return {
        email: session.user.email || '',
        role: (profile?.role as 'admin' | 'user') || 'user'
      };
    } catch (e) {
      console.error('Supabase getCurrentSession error:', e);
      return null;
    }
  },

  // Signs out
  async logout(): Promise<void> {
    if (!isSupabaseConfigured) {
      if (IS_BROWSER) {
        localStorage.removeItem('nextron_session');
      }
      return;
    }

    try {
      await supabase!.auth.signOut();
    } catch (e) {
      console.error('Supabase signOut error:', e);
    }
  }
};
