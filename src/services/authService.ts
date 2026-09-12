// CRM Authentication Service for Aley Way Construction LLC
// Default Principal Password: Xiochil0105

const AUTH_STORAGE_KEY = 'aleyway_crm_auth_session';
const PASSWORD_STORAGE_KEY = 'aleyway_crm_master_pass';
const DEFAULT_PASS = 'Xiochil0105';

export const authService = {
  getMasterPassword(): string {
    return localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASS;
  },

  setMasterPassword(newPass: string): void {
    if (!newPass || newPass.trim().length < 4) {
      throw new Error('Password must be at least 4 characters');
    }
    localStorage.setItem(PASSWORD_STORAGE_KEY, newPass.trim());
  },

  changePassword(newPass: string, oldPass?: string): boolean {
    if (oldPass && oldPass.trim() !== this.getMasterPassword()) {
      return false;
    }
    this.setMasterPassword(newPass);
    return true;
  },

  isAuthenticated(): boolean {
    try {
      const session = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!session) return false;
      const parsed = JSON.parse(session);
      // Valid if authenticated within 30 days
      return Boolean(parsed.authenticated && parsed.timestamp && Date.now() - parsed.timestamp < 30 * 86400000);
    } catch {
      return false;
    }
  },

  login(password: string): boolean {
    const valid = this.getMasterPassword();
    if (password.trim() === valid) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          authenticated: true,
          user: 'Derek & Xiochil Blades',
          timestamp: Date.now(),
        })
      );
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  resetPasswordToDefault(): void {
    localStorage.removeItem(PASSWORD_STORAGE_KEY);
  }
};
