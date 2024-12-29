import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private MILLISECONDS_TO_SECONDS = 1000;
    private SECONDS_TO_MINUTES = 60;
    private MINUTES_TO_HOUR = 60;
    private HOUR_TO_DAY = 24;
    private DAY_TO_MONTH = 30;
    public isLoggedIn!: boolean;

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        const currentTime = Date.now();
        const endTimeSession = localStorage.getItem('endTimeSession');
        if (endTimeSession && currentTime <= parseInt(endTimeSession)) {
            this.isLoggedIn = true;
        } else {
            localStorage.removeItem('token');
            this.isLoggedIn = false;
            this.router.navigate(['/login'])
        }

        setInterval(() => {
            const endTimeSession = localStorage.getItem('endTimeSession')!;
            const currentTime = Date.now();

            if (currentTime <= parseInt(endTimeSession)) {
                this.isLoggedIn = true;
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('endTimeSession');
                this.isLoggedIn = false;
                this.router.navigate(['/login'])
            }
        }, 10000)
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.getToken()) {
            // authorised so return true
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login']);
            return false;
        }
    }

    getToken(): string | undefined {
        let token = localStorage.getItem('token')
        if (token && token.length > 10) {
            return token
        }
        return;
    }

    getSessionTimeout(type: "long" | "short"): string {
        const currentDate = Date.now();
        const monthQuantity = 3;
        const hourQuantity = 2;
        let sessionDuration: number = 0;
        switch (type) {
            case "long":
                sessionDuration = monthQuantity *
                    this.DAY_TO_MONTH *
                    this.HOUR_TO_DAY *
                    this.MINUTES_TO_HOUR *
                    this.SECONDS_TO_MINUTES *
                    this.MILLISECONDS_TO_SECONDS
                break;

            case "short":
                sessionDuration = hourQuantity *
                    this.MINUTES_TO_HOUR *
                    this.SECONDS_TO_MINUTES *
                    this.MILLISECONDS_TO_SECONDS
                break;
        }

        return (currentDate + sessionDuration).toString()
    }

    login(credentials: any): Promise<any> {
        let sessionTime: string;
        const sessionType = credentials.rememberme ? "long" : "short";
        sessionTime = this.getSessionTimeout(sessionType)
        credentials.sessionTime = sessionTime;

        let promise = new Promise((resolve, reject) => {
            let apiURL = environment.apiURLPrefix + "/api/login";
            this.http.post(apiURL, credentials)
                .toPromise()
                .then(
                    (res: any) => {
                        // Success
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('endTimeSession', sessionTime);
                        resolve(res);
                    }
                )
                .catch(error => {
                    reject(error.message)
                });
        });
        return promise;
    }

    // updateUser(user: UserModel): Promise<any> {
    //     let promise = new Promise((resolve, reject) => {
    //         let apiURL = environment.apiURLPrefix + "/api/user/" + user._id;
    //         this.http.put(apiURL, user)
    //             .toPromise()
    //             .then(
    //                 res => { // Success
    //                     resolve(res);
    //                 })
    //             .catch(
    //                 error => {
    //                     reject(error.message)
    //                 });
    //     });
    //     return promise;
    // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('endTimeSession');
        localStorage.setItem('menuActive', this.router.url);
        this.router.navigate(['/login']);
    }

    // getUser() {
    //     return new Promise<UserModel>((resolve, reject) => {
    //         let apiURL = environment.apiURLPrefix + "/api/user/" + this.getToken();
    //         this.http.get(apiURL)
    //             .toPromise()
    //             .then(
    //                 (res: any) => {
    //                     this.generalService.user = res;
    //                     resolve(res);
    //                 }
    //             )
    //             .catch(error => {
    //                 reject(error.message)
    //             });
    //     });
    // }
    // getUserLevels(): Promise<any> {
    //     return new Promise<UserModel>((resolve, reject) => {
    //         let apiURL = environment.apiURLPrefix + "/api/userLevels";
    //         this.http.get(apiURL)
    //             .toPromise()
    //             .then(
    //                 (res: any) => {
    //                     resolve(res);
    //                 }
    //             )
    //             .catch(error => {
    //                 reject(error.message)
    //             });
    //     });
    // }

}