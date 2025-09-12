import { AuthService } from '../services/AuthService';

export interface AuthMiddleware {
  request: Request;
  response: Response;
  next: () => void;
}

export class AuthMiddleware {
  private authService = AuthService.getInstance();

  async requireAuth(request: Request, response: Response, next: () => void): Promise<void> {
    const token = this.authService.getAccessToken();
    
    if (!token) {
      this.redirectToLogin();
      return;
    }

    if (this.authService.isTokenExpired()) {
      try {
        const refreshToken = this.authService.getRefreshToken();
        if (refreshToken) {
          const newTokens = await this.authService.refreshToken(refreshToken);
          this.authService.setTokens(newTokens);
          next();
        } else {
          this.redirectToLogin();
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        this.redirectToLogin();
      }
      return;
    }

    next();
  }

  requireRole(allowedRoles: string[]) {
    return (request: Request, response: Response, next: () => void) => {
      // This would check user role from decoded token
      // Implementation depends on how user data is stored/retrieved
      const userRole = this.getUserRoleFromToken();
      
      if (!allowedRoles.includes(userRole)) {
        throw new Error('Insufficient permissions');
      }
      
      next();
    };
  }

  private redirectToLogin(): void {
    this.authService.clearTokens();
    window.location.href = '/login';
  }

  private getUserRoleFromToken(): string {
    // This would decode the JWT token to extract user role
    // For now, return a mock role
    return 'CLIENT';
  }
}