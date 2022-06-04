import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from 'src/app/model/experience.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { User } from '../../registration/user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  qrCodeBitmap: any
  showQrAndInput = false;
  code = ""

  codeForm = new FormControl('', [Validators.required, this.codeValidator()]);
  codeValidator(): ValidatorFn {
    return Validators.pattern('[0-9]{6}');
  }

  maxDate: Date;
  genders: number[] = [0, 1];
  userId: string | null = "";

  newPassword: string = ""
  confirmNewPassword: string = ""
  oldPassword: string = ""

  newUsername: string = ""

  newExperience: Experience = new Experience;

  newSkill: string = "";
  newInterest: string = "";

  user = new User("", "", "", "", 0, "", "", "", "", "", [], [], false, false)
  experiences = [] as Experience[]

  nameForm = new FormControl('', [Validators.required]);
  surnameForm = new FormControl('', [Validators.required]);
  emailForm = new FormControl('', [Validators.required, Validators.email]);
  dateForm = new FormControl('', [Validators.required]);
  phoneForm = new FormControl('', [this.phoneNumberValidator()]);
  usernameForm = new FormControl('', [Validators.required]);

  newPasswordForm = new FormControl('', [Validators.required])
  confirmPasswordForm = new FormControl('', [Validators.required, this.equalsToPasswordValidator()]);
  oldPasswordForm = new FormControl('', [Validators.required])

  newUsernameForm = new FormControl('', [Validators.required, Validators.minLength(3)])

  experiencePlace = new FormControl('', [Validators.required])
  experienceTitle = new FormControl('', [Validators.required])
  experienceStartDate = new FormControl('', [Validators.required])
  experienceEndDate = new FormControl('', [Validators.required])

  newSkillForm = new FormControl('', [Validators.required]);

  newInterestForm = new FormControl('', [Validators.required]);

  phoneNumberValidator(): ValidatorFn {
    return Validators.pattern('[- +()0-9]+');
  }

  equalsToPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value?.toLowerCase() == this.newPassword.toLowerCase() ? null : { passwordsNotEqual: true };
  }

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.maxDate = new Date()
  }

  ngOnInit(): void {
    if (localStorage.getItem('userId') != null) {
      this.userId = localStorage.getItem('userId');
      this.userService.getUserData(this.userId!).subscribe((res: any) => {
        this.user.name = res.user.name
        this.user.surname = res.user.surname
        this.user.email = res.user.email
        this.user.birthDate = res.user.birthDate.split(" ")[0];
        this.user.phoneNumber = res.user.phoneNumber
        this.user.username = res.user.username
        this.user.gender = Number(res.user.gender)
        this.user.bio = res.user.bio
        this.user.skills = res.user.skills
        this.user.interests = res.user.interests
        this.user.TFAEnabled = res.user.TFAEnabled
        this.user.isPrivate = res.user.private

        this.newExperience.userId = this.userId!

        this.userService.getExperiences(this.userId!).subscribe((res: any) => {
          this.experiences = res.experiences
        })
      })
    }

  }

  getnameErrorMessage() {
    return this.usernameForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  getsurnameErrorMessage() {
    return this.surnameForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  getEmailErrorMessage() {
    return this.emailForm.hasError('required') ? 'You must enter a value' :
      this.emailForm.hasError('email') ? 'Not a valid email' :
        '';
  }

  getDateErrorMessage() {
    return this.dateForm.hasError('required') ? 'You must enter a value' :
      '';
  }

  getPhoneErrorMessage() {
    return this.phoneForm.hasError('validators') ? '' :
      'Phone number not in correct format';
  }

  getUsernameErrorMessage() {
    return this.usernameForm.hasError('required') ? 'You must enter a value' :
      '';
  }
  getConfirmPasswordErrorMessage() {
    return this.confirmPasswordForm.hasError('required') ? 'You must enter a value' :
      'Passwords must match';
  }

  edit() {
    this.userService.edit(this.user, this.userId!).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully registrated',
            text: 'Here can login',
            timer: 3000,
            showConfirmButton: false,
          })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  editUsername() {
    this.userService.editUsername(this.newUsername, this.userId!).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Username changed',
            text: 'Username succefully changed',
            timer: 3000,
            showConfirmButton: false,
          })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  editPassword() {
    this.userService.editPassword(this.newPassword, this.confirmNewPassword, this.oldPassword, this.userId!).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Password changed',
            text: 'Password succefully changed',
            timer: 3000,
            showConfirmButton: false,
          })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  addNewExperience() {
    this.userService.addNewExperience(this.newExperience).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Successfully added new experience',
            text: 'New experience added',
            timer: 3000,
            showConfirmButton: false,
          })
        this.userService.getExperiences(this.userId!).subscribe((res: any) => {
          this.experiences = res.experiences
        })
        this.newExperience = new Experience
        this.newExperience.userId = this.userId!

      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  delete(experienceId: string) {
    this.userService.deleteExperience(experienceId).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Experience deleted succesfully',
            text: 'Deleted',
            timer: 3000,
            showConfirmButton: false,
          })
        this.userService.getExperiences(this.userId!).subscribe((res: any) => {
          this.experiences = res.experiences
        })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  addNewSkill() {
    this.userService.addNewSkill(this.newSkill, this.userId!).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Skill added succesfully',
            text: 'Added',
            timer: 3000,
            showConfirmButton: false,
          })
        this.userService.getUserData(this.userId!).subscribe((res: any) => {
          this.user.skills = res.user.skills
          this.user.interests = res.user.interests
        })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  addNewInterest() {
    this.userService.addNewInterest(this.newInterest, this.userId!).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Interest added succesfully',
            text: 'Added',
            timer: 3000,
            showConfirmButton: false,
          })
        this.userService.getUserData(this.userId!).subscribe((res: any) => {
          this.user.skills = res.user.skills
          this.user.interests = res.user.interests
        })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  deleteSkill(skill: string) {
    this.userService.deleteSkill(this.userId!, skill).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Experience deleted succesfully',
            text: 'Deleted',
            timer: 3000,
            showConfirmButton: false,
          })
        this.userService.getUserData(this.userId!).subscribe((res: any) => {
          this.user.skills = res.user.skills
          this.user.interests = res.user.interests
        })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  deleteInterest(interest: string) {
    this.userService.deleteInterest(this.userId!, interest).subscribe(
      (data) => {
        Swal.fire(
          {
            icon: 'success',
            title: 'Experience deleted succesfully',
            text: 'Deleted',
            timer: 3000,
            showConfirmButton: false,
          })
        this.userService.getUserData(this.userId!).subscribe((res: any) => {
          this.user.skills = res.user.skills
          this.user.interests = res.user.interests
        })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  getQR2fa() {
    this.authService.getQR2fa().subscribe(
      (data: any) => {
        this.qrCodeBitmap = data.qrCode
        this.showQrAndInput = true
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 1000,
            showConfirmButton: false,
          })
      }
    )
  }

  disable2fa() {
    this.authService.disable2fa().subscribe(
      (data: any) => {
        this.user.TFAEnabled = false
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 1000,
            showConfirmButton: false,
          })
      }
    )
  }

  verify() {
    this.authService.enable2fa(this.code).subscribe(
      (data) => {
        this.user.TFAEnabled = true
        Swal.fire(
          {
            icon: 'success',
            title: "Successfully activated two-factor authentication",
            timer: 1000,
            showConfirmButton: false,
          })
      },
      (error) => {
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 1000,
            showConfirmButton: false,
          })

      }
    )
  }

  changePrivacy(){
    this.userService.changePrivacy(this.userId!).subscribe(
      (data)=>{
        this.user.isPrivate = !this.user.isPrivate
      },
      (error)=>{
        Swal.fire(
          {
            icon: 'error',
            title: error.error.message,
            timer: 1000,
            showConfirmButton: false,
          })
      }
    )
  }
}
