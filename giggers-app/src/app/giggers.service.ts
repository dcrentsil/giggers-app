import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Gigger } from './models/giggers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { IAppState } from './redux/store/store';

const loginOptions = new RequestOptions({
    withCredentials: true,
  });

  
@Injectable()
export class GiggersService {
    private baseUrl = 'http://localhost:3000/api';

    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http,
                private store: Store<IAppState>) { }


    // getgiggers(): Observable<Gigger[]> {
    //     return this.http.get(this.baseUrl + "/giggers")
    //     .map((response: Response) => <Gigger[])
    // }
                
    getgiggers() {
        return this.http.get(this.baseUrl + "/giggers")
        .map((response: Response) => response.json().data);
    }

    getgigs() {
        return this.http.get(this.baseUrl + "/gigs")
        .map((response: Response) => response.json().data);
    }

    creategigger(gigger: Gigger) {
         return this.http.post(this.baseUrl + "/giggers", gigger, {headers: this.headers})
         .map(response => response.json());
     }

    deletegigger(id: number): Observable<Gigger>{
        return this.http
        .delete(this.baseUrl + ("/giggers") + "/" + id, this.options)
        .map((res: Response) => res.json())
        }
    
    deletegigs(id: number): Observable<Gigger>{
        return this.http
        .delete(this.baseUrl + ("/gigs") + "/" + id, this.options)
        .map((res: Response) => res.json())
        }
    
    getgiggerbyid(_id: number): Observable<Gigger>{ 
        return this.http
        .get(this.baseUrl + ("/giggers") + _id)
        .map(response => response.json());
    }

    login(username: string, password: string) {
        const body = `{"username":"${username}","password":"${password}"}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({
          headers: headers,
          withCredentials: true,
        });
        return this.http
        .post(this.baseUrl + ("/login"), body, options)
        .map(response => response.json());
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
      }
}
