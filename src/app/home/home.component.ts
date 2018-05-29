import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRequestService } from '../http/api-request.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userProfile: any = [];
  repos: any = [];
  username: string ;
  public loading: boolean = false;
  public message_status: boolean = false;

  constructor(private ApiRequestService: ApiRequestService,public AS: ApiRequestService, private http: HttpClient) {
    this.message_status = this.AS.message_status;
   }
   doSearch(term: string){
     term= term || "LucasLB7"
     this.AS.results = [];
     this.AS.results1 = [];
     this.AS.results2 = [];
     this.loading = true;
     this.AS.search(term).then(() => this.loading = false)
    //  console.log(term);
     return false;
     
   }

  ngOnInit() {
    this.doSearch("LucasLB7");
    this.ApiRequestService.getUserProfile().subscribe(users => {
      this.userProfile = users;
    });

    this.ApiRequestService.getUserRepos().subscribe(repos => {
      this.repos = repos;
    });
  }
  searchUserProfile() {
    this.ApiRequestService.updateUserProfile(this.username);
    // console.log(this.doSearch(this.username));
    this.ApiRequestService.getUserProfile().subscribe(users => {
      this.userProfile = users;
    });

    this.ApiRequestService.getUserRepos().subscribe(repos => {
      this.repos = repos;
    });

 }}
