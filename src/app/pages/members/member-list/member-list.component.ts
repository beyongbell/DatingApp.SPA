import { AlertifyService } from '@service/alertify.service';
import { PaginatedResult } from '@interface/pagination';
import { UserService } from '@service/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interface/user';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '@interface/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute, private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users      = data.users.result;
      this.pagination = data.users.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<User[]>) => {
        this.users      = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertifyService.error(error);
      }
    );
  }
}
