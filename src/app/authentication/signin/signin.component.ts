import { AuthService } from 'src/app/core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ILoginResponse } from 'src/app/core/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [ToastrService],
})
export class SigninComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      UserName: ['johnrobin80@gmail.com', Validators.required],
      Password: ['P@ssw0rd', Validators.required],
      remember: [''],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  // onSubmit() {
  //   this.submitted = true;
  //   this.error = '';

  //   if (this.loginForm.invalid) {
  //     this.error = 'Username and Password not valid !';
  //     return;
  //   } else {
  //     this.authService.login(this.loginForm.value).subscribe({
  //       next: (res) => {
  //         alert('SigninComponent ==> ' + res.success);
  //         if (res.data.token) {
  //           if (res) {
  //             const token = this.authService.currentUserValue.token;
  //             if (token) {
  //               this.router.navigate(['/dashboard/main']);
  //             }
  //           } else {
  //             this.error = 'Invalid Login';
  //           }
  //         } else {
  //           this.error = 'Invalid Login';
  //         }
  //       },
  //       error: (error) => {
  //         this.error = error;
  //         this.submitted = false;
  //       },
  //     });
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    localStorage.setItem('UserName', 'Robin');
    if (this.loginForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          //alert('SigninComponent1 ==> ' + JSON.stringify(res));
          const jsonValues: ILoginResponse = JSON.parse(JSON.stringify(res));
          // alert(
          //   'SigninComponent2 ==> ' +
          //     jsonValues.data +
          //     ' | ' +
          //     jsonValues.success
          // );
          if (jsonValues.data && jsonValues.success === true) {
            if (jsonValues.data.token) {
              localStorage.setItem(
                'currentUser',
                JSON.stringify(jsonValues.data)
              );
              this.authService.currentUserSubject.next(jsonValues.data);
              this.router.navigate(['/dashboard/main']);
              this.toastrService.success('Loggedin successfully', '', {
                progressBar: true,
              });
            } else {
              this.error = 'Invalid Login';
              this.toastrService.error('Invalid Login', '', {
                progressBar: true,
              });
            }
          } else {
            this.error = 'Invalid Login';
            this.toastrService.error('Invalid Login', '', {
              progressBar: true,
            });
          }
        },
        error: (err: any) => {
          //alert('ERROR ==> ');
          this.error = err;
          this.submitted = false;
          this.toastrService.error(err, '', {
            progressBar: true,
          });
        },
      });
    }
  }
}
