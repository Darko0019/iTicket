import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import axios from 'axios';

interface User {
    id: string;
    id_user: string;
    role: string;
    nom: string;
    prenom: string;
    email: string;
    phoneNumber: string;
    domain: string;
    notifications: any[];
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
    private apiUrl = 'http://localhost:5010';

    constructor(private router: Router) {
        this.loadCurrentUser();
    }

    private loadCurrentUser(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userData = localStorage.getItem('currentUser');
            if (userData) {
                const user = JSON.parse(userData);
                this.currentUserSubject.next(user);
                if (user.role === 'client') {
                    this.router.navigate(['/accueil-client']);
                } else if (user.role === 'gestionnaire') {
                    this.router.navigate(['/accueil-manager']);
                } else if (user.role === 'technicien') {
                    this.router.navigate(['/accueil-technician']);
                } else {
                    this.router.navigate(['/login']);
                }
            }
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.get<any[]>(`${this.apiUrl}/Users`);
            const users = response.data;

            const user = users.find(u =>
                u.email_user === email &&
                u.password === password
            );

            if (user) {
                const now = new Date().toISOString();
                await axios.patch(`${this.apiUrl}/Users/${user.id}`, { lastLogin: now });

                const userData: User = {
                    id: user.id,
                    id_user: user.id_user,
                    role: user.role,
                    nom: user.nom_user,
                    prenom: user.prenom_user,
                    email: user.email_user,
                    phoneNumber: user.tel_user,
                    domain: user.domain || '',
                    notifications: user.notifications || []
                };

                localStorage.setItem('currentUser', JSON.stringify(userData));
                this.currentUserSubject.next(userData);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async signup(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        role: string,
        domain: string = ''
    ): Promise<boolean> {
        try {
            const phoneNumberRegex = /^(?:\+212[567]\d{8}|(05|06|07)\d{8})$/;
            if (!phoneNumberRegex.test(phoneNumber)) {
                console.error('Invalid phone number format');
                return false;
            }

            const response = await axios.get('http://localhost:5010/Users');
            const users = response.data;

            let newId = this.generateNewId(users, role);
            const now = new Date().toISOString();

            const newUser = {
                id_user: newId,
                nom_user: lastName,
                prenom_user: firstName,
                email_user: email,
                password: password,
                role: role,
                phoneNumber: phoneNumber,
                domain: domain,
                dateJoined: now,
                lastLogin: now,
                notifications: []
            };

            await axios.post('http://localhost:5010/Users', newUser);
            window.alert('Vous avez été inscrit avec succès!');

            this.router.navigate(['/login']);

            return true;
        } catch (error) {
            console.error('There was an error registering the user:', error);
            throw error;
        }
    }

    generateNewId(users: any[], role: string): string {
        const rolePrefix = role === 'client' ? 'clt' : role === 'technicien' ? 'tech' : 'gest';
        const filteredUsers = users.filter(user => user.id_user && user.id_user.startsWith(rolePrefix));

        if (filteredUsers.length === 0) {
            return `${rolePrefix}1`;
        } else {
            const lastId = filteredUsers.reduce((maxId, user) => {
                const idNumber = parseInt(user.id_user.replace(rolePrefix, ''));
                return idNumber > parseInt(maxId.replace(rolePrefix, '')) ? user.id_user : maxId;
            }, filteredUsers[0].id_user);

            const idNumber = parseInt(lastId.replace(rolePrefix, ''));
            return `${rolePrefix}${idNumber + 1}`;
        }
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('currentUser');
    }

    getCurrentUser(): User | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    getUserRole(): string | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData).role : null;
    }

    getUserId(): string | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData).id : null;
    }

    getUserNom(): string | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? `${JSON.parse(userData).nom}` : null;
    }

    getUserPrenom(): string | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? `${JSON.parse(userData).prenom}` : null;
    }

    getUserEmail(): string | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData).email : null;
    }

    getUserPhoneNumber(): string | null {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData).phoneNumber : null;
    }

    async getUserById(userId: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/Users?id_user=${userId}`);
            return response.data[0];
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    async getUserDataById(userId: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/Users?id_user=${userId}`);
            if (response.data && response.data.length > 0) {
                return response.data[0];
            } else {
                console.warn(`User with ID ${userId} not found`);
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }

    async getTechnicians(): Promise<any[]> {
        try {
            const response = await axios.get(`${this.apiUrl}/Users?role=technicien`);
            return response.data;
        } catch (error) {
            console.error('Error fetching technicians:', error);
            throw error;
        }
    }
}