import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (req.url.includes('/login')) { //deu errado
    return next(req);
  }

  if (authService.isTokenExpirado()) {
    authService.logout();
    router.navigate(['/login']);
    return new Observable<HttpEvent<unknown>>(observer => observer.complete());
  }

//adiona no headr
  const token = authService.pegarToken();
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
}