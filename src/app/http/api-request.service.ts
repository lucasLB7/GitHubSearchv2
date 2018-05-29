import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'url';
import { reject } from 'q';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiRequestService {

  private username: string;
  private access_token: string = environment.access_token;
  loading: boolean;
  message_status: boolean;
  message: string;
  results: Object[];
  results1: Object[];
  results2: Object[];
  results3: Object[];

  constructor(private http:HttpClient) {
    this.username = 'Sarah-Marion';
    this.loading = false;
    this.results = [];
    this.results1 = [];
    this.results2 = [];
    this.results3 = [];
   }

   getUserProfile() {
    return this.http.get('https://api.github.com/users/' + this.username + '?access_token=' + this.access_token)
      .map(result => result);
  }
  
    getUserRepos() {
      return this.http.get('https://api.github.com/users/' + this.username  + '/repos?access_token=' + this.access_token)
        .map(result => result);
    }
  
    updateUserProfile(username: string) {
      this.username = username;
    }

   isEmptyObject(obj) {
     for (var property in obj) {
       if (obj.hasOwnProperty(property)) {
         return false;
       }
     }
     return true;
   }
   search(term: string) {
     let httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
        //  'Authorization': environment.Authorization
       })
     }
     
     let promise = new Promise((resolve, reject) => {
       this.http.get<any>(environment.apiRoot + "users/" + term, httpOptions).toPromise().then(
         response => {

           if (this.isEmptyObject(response)){
           } else {
             this.results2.push(response)
           }
           resolve()
         },
         err => {
           this.message = "Cant seem to find what your looing for.."
         }),
         this.http.get<any>(environment.apiRoot + "search/repositories?q= {" + term + "}", httpOptions).toPromise().then(
           response => {

            if (this.isEmptyObject(response['items'])) {
            } else {
              this.results1.push(response)
              this.results3 = response.items;
            }
            resolve()
           },
           err => {
             this.message = "Not found";
           })
     })
     return promise;
   }

}
