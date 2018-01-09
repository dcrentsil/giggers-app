import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { Gigger } from './models/giggers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { IAppState } from './redux/store/store';

@Injectable()
export class GiggersService {
    private baseUrl = 'http://localhost:3000/api';

    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http,
                private store: Store<IAppState>) { }

    getgiggers() {
        return this.http.get(this.baseUrl + "/giggers")
        .map((res: Response) => res.json().data);    } 
    
    getgigs() {
        return this.http.get(this.baseUrl + "/gigs")
        .map((res: Response) => res.json().data);
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
    
    getgiggerbyid(id: number): Observable<Gigger>{ 
        return this.getgiggers()
        .map(giggers => giggers.find(gigger => gigger.id == id));
    }
}
