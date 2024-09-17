import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ConversionRecord {
  rate: number;
  fixedRate: number | null;
  inputAmount: number;
  inputCurrency: string;
  outputAmount: number;
  outputCurrency: string;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ConversionHistoryService {
  private history = new BehaviorSubject<ConversionRecord[]>([]);

  addConversion(record: ConversionRecord): void {
    record.timestamp = new Date();
    this.history.next([record, ...this.history.value]);
  
    if (this.history.value.length > 5) {
      this.history.value.pop();
    }
  }

  getHistory(): Observable<ConversionRecord[]> {
    return this.history.asObservable();
  }
}
