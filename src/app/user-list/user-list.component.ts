import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User [] = [];
  totalUser: User[] = [];
  private usersSubscription!: Subscription;
  searchBy: 'name' | 'role' = 'name';
  searchTerm: string = '';
  curPage: number = 1;
  pageSize: number = 8;
  totalPageSize: number = 0;


  constructor(private userService: UserService){}

  ngOnInit(): void {
  this.showUsers();
  }

  loadUsers(): Promise<void> {
    // promise based so that show user can load correct data when loaduser is finish
    return new Promise((resolve, reject) => {
      this.usersSubscription = this.userService.searchUser(this.searchTerm, this.searchBy).subscribe(data => {
        this.totalUser = data; // feed in all the data the match name or role
        this.totalPageSize = data.length; // get total size of data
        resolve();
    },
    error => {
      console.error('Error Loading Users', error);
      reject(error);
    })
    })
  }

  async showUsers(){
    await this.loadUsers();
    // slice data to get "pageSize" amount to load
    this.users = this.totalUser.slice(this.pageSize * (this.curPage - 1),(this.pageSize * (this.curPage - 1)) + this.pageSize )
  }

  onSearch(): void {
    // reset current page to 1
    this.curPage = 1;
    this.showUsers();
  }


  ngOnDestroy(): void {
    // unsubsribe on destroy
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  onPageChange(pageNumber: number){
    // restrict loading non existence pages
    if ((pageNumber > 0) && (pageNumber <= this.totalPages().length)){
      this.curPage = pageNumber;
      // reload
      this.showUsers();
    }
  }

  totalPages(): number[] {
    // get the amount of pages based on data size / pagesize
    const page =  Math.ceil( this.totalPageSize / this.pageSize);
    return new Array(page).fill(0).map((_, index) => index + 1)
  }

  
}
