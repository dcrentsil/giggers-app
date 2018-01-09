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

import { GiggersService } from '../../giggers.service';
import * as GiggerActions from '../actions/actions.gigger';

@Injectable()
export class GiggerEffects {
    constructor(
      private actions$: Actions,
      private giggersService: GiggersService,
      private router: Router,
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

    
  //   @Effect()
  //   loadGiggers$: Observable<Action>= this.actions$
  //   .ofType(GiggerActions.LOAD_GIGGERS)
  //   .switchMap((action: Action): ObservableInput<Action> => {
  //     return this.giggersService.getgiggers()}
  //   );
  // }
    }

//finish loadgigger and remove gigger