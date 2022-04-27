export class User{
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public phoneNumber: string,
        public gender: number,
        public birthDate: string,
        public username: string,
        public password: string,
        public confirmPassword: string,
        public bio: string,
        public skills: [],
        public interests: []
    ){}
} 