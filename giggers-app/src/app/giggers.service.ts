import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Gigger } from './giggers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GiggersService {
    private baseUrl = 'http://localhost:3000/api';

    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    giggers: Gigger;
    gigger : Gigger;

    constructor(private http: Http) { }

    getgiggers() {
        return this.http.get(this.baseUrl + "/giggers")
        // .map(result => this.result = result.json().data);
        .map((res: Response) => res.json().data);
    } 
    
    getgigs() {
        return this.http.get(this.baseUrl + "/gigs")
        // .map(result => this.result = result.json().data);
        .map((res: Response) => res.json().data);
     }

    creategigger(gigger: Gigger) {
         return this.http.post(this.baseUrl + "/giggers", gigger, {headers: this.headers})
         .map((res: Response) => res.json());
     }

    // updategigger(id: number, values: Object = {}):Gigger {
    //     let gigger = this.getgiggerbyid(id);
    //     if (!gigger) {
    //         return null;
    //     }
    //     Object.assign(gigger, values);
    //     return gigger;
    // }

    deletegigger(id: number): Observable<Gigger>{
        return this.http
        .delete(this.baseUrl + ("/giggers" || "/gigs") + "/" + id, this.options)
        .map((res: Response) => res.json())
        //.catch(this.handleError);
        }

    getgiggerbyid(id: number): Observable<Gigger>{ 
        return this.getgiggers()
        .map(giggers => giggers.find(gigger => gigger.id == id));
    }
}


// private handleError(error: any): Promise<any> {
//     console.error('Error', error); // for demo purposes only
//     return Promise.reject(error.message || error);
//   }
// }