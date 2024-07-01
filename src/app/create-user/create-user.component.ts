import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  user: User = {id: 0, name: '', role: '', media: ''}

  constructor(private userService: UserService, private router: Router){}

  addUser(): void {
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/']);
    })
  }



}
