// chart.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable()
export class ChartEffects {

  constructor(private actions$: Actions) {}

} 
