import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Gigger } from '../../models/giggers';

import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { RoutingModule } from '../../app.routing';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { PayloadAction } from '../actions/actions.gigger';
import { AlertService } from '../../services/alert/alert.service';
import { GiggersService } from '../../giggers.service';
import * as GiggerActions from '../actions/actions.gigger';

@Injectable()
export class GiggerEffects {
    constructor(
      private actions$: Actions,
      private giggersService: GiggersService,
      private router: Router,
      private alertService: AlertService,
    ){}

    @Effect()
    addgigger$: Observable<Action> = this.actions$
      .ofType(GiggerActions.ADD_GIGGER)
      .switchMap((action: PayloadAction): ObservableInput<Action> => {
        return this.giggersService
          .creategigger(action.payload)
          .switchMap((data) => {
            return of(GiggerActions.addgiggerCompleted());
          })
          .catch(err => {
            return of(GiggerActions.addgiggerFailed());
          });
      });
  

      @Effect({ dispatch: false})
      addgiggerCompleted$: Observable<Action> = this.actions$
        .ofType(GiggerActions.ADD_GIGGER_COMPLETED)
        .do(_ => this.router.navigate(['/giggers']));



@Effect()
login$: Observable<Action> = this.actions$
  .ofType(GiggerActions.REQ_LOGIN)
  .switchMap((action: PayloadAction): ObservableInput<Action> => {
    return (
      this.giggersService
        .login(action.payload.username, action.payload.password)
        .mergeMap((data) => {
          return (
            this.giggersService
              .getgiggerbyid(data.id)
              .mergeMap((data) => {
                return Observable.from([
                  GiggerActions.updateGiggerDetails(
                    data.id,
                    data.username,
                    data.name,
                    data.email,
                  ),
                  GiggerActions.loginCompleted(),
                ]);
              })
            .catch(err => {
              this.alertService.error('ERROR GETTING GIGGER INFO');
              return of(GiggerActions.loginFailed());
            })
          )
        })
      );
    }
  )}