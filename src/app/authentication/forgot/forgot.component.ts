import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.sass'],
  providers: [ToastrService],
})
export class ForgotComponent {
  constructor(private toastrService: ToastrService, private router: Router) {}

  onSubmit() {
    console.log('Forgot component');
    Swal.fire({
      title: 'Password Reset?',
      text: 'Do you want to proceed with resetting the password!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Please proceed',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        if (localStorage.getItem('currentUser')) {
          this.router.navigate(['/user/reset']);
          return;
        }
        this.router.navigate(['/authentication/reset']);
        // console.log('Submitted - ' + result.value);
        // this.toastrService.success('Submitted successfully', '', {
        //   progressBar: true,
        // });
        // setTimeout(() => {
        //   console.log('Forgot component');
        // }, 5000);
      } else {
        console.log('Not-Submitted - ' + result.value);
      }
    });
  }
}
