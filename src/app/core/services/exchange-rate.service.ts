import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private rateSubject = new BehaviorSubject<number>(1.1);
  private pollingSubscription: any;

  public rate$ = this.rateSubject.asObservable();

  constructor() {
    this.startPolling();
  }

  private startPolling(): void {
    this.pollingSubscription = interval(3000).subscribe(() => {
      const currentRate = this.rateSubject.value;
      const delta = parseFloat((Math.random() * 0.1 - 0.05).toFixed(4));
      const newRate = parseFloat((currentRate + delta).toFixed(4));
      this.rateSubject.next(newRate);
    });
  }

  public setFixedRate(rate: number) {
    this.rateSubject.next(rate);
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  public removeFixedRate(): void {
    this.startPolling();
  }

  public getCurrentRate(): number {
    return this.rateSubject.value;
  }
}
