import { AlertifyService } from '@service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@service/user.service';
import { AuthService } from '@service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@interface/user';
import { Pagination, PaginatedResult } from '@interface/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users      = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.likesParam = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam).subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users      = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertifyService.error(error);
        }
      );
  }

}
