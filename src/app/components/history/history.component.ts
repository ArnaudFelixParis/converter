import { Component, OnInit } from '@angular/core';
import { ConversionHistoryService, ConversionRecord } from '../../core/services/conversion-history.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: true,
  imports: [MaterialModule, DatePipe, DecimalPipe, CommonModule],
})
export class HistoryComponent {
  history: Observable<ConversionRecord[]>;
  displayedColumns: string[] = ['realRate', 'fixedRate', 'input', 'output', 'date'];

  constructor(private historyService: ConversionHistoryService) {
    this.history = this.historyService.getHistory();
  }
}
