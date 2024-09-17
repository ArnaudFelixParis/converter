import { Component } from '@angular/core';
import { ExchangeRateService } from '../../core/services/exchange-rate.service';
import { ConversionHistoryService } from '../../core/services/conversion-history.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from '../history/history.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  imports: [MaterialModule, FormsModule, CommonModule, HistoryComponent],
  providers: [DecimalPipe],
  standalone: true
})
export class ConverterComponent {
  rate: number = 1.1;
  amount: number = 1;
  convertedAmount: number = 1.1;
  isEUR: boolean = true; // true: saisir en EUR, false: saisir en USD
  fixedRate: number | null = null;
  targetCurrency: string = 'USD';
  currentCurrency: string = 'EUR';


  constructor(
    private exchangeRateService: ExchangeRateService,
    private historyService: ConversionHistoryService,
  ) {
    this.exchangeRateService.rate$.pipe(takeUntilDestroyed()).subscribe(rate => {
      this.rate = rate;
    });

    this.convert();
  }

  convert(): void {
    if (this.isEUR) {
      this.convertedAmount = this.amount * this.rate;
      this.targetCurrency = 'USD';
      this.currentCurrency = 'EUR';
    } else {
      this.convertedAmount = this.amount / this.rate;
      this.targetCurrency = 'EUR';
      this.currentCurrency = 'USD';
    }

    this.historyService.addConversion({
      rate: this.exchangeRateService.getCurrentRate(),
      fixedRate: this.fixedRate,
      inputAmount: this.amount,
      inputCurrency: this.currentCurrency,
      outputAmount: this.convertedAmount,
      outputCurrency: this.targetCurrency
    });
  }

  setFixedRate(): void {
    if (this.fixedRate !== null && this.fixedRate > 0) {
      this.exchangeRateService.setFixedRate(this.fixedRate);
    } else {
      this.exchangeRateService.removeFixedRate();
    }
    this.convert();
  }
}
