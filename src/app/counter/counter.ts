import { ChangeDetectionStrategy, Component, Input, OnInit, signal, effect } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'app-counter',
    standalone: true,
    templateUrl: './counter.html',
    styleUrls: ['./counter.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
    @Input() startDay: string = '';
    @Input() partySeats: number = 0;
    @Input() totalSeats: number = 100;
    readonly elapsedTime = signal({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    get seatsPercentage(): number {
        if (!this.totalSeats) {
            return 0;
        }
        return Math.round((this.partySeats / this.totalSeats) * 1000) / 10;
    }

    constructor() {
        effect(() => {
            if (this.startDay) {
                this.updateElapsedTime();
            }
        });
    }

    ngOnInit(): void {
        if (this.startDay) {
            this.updateElapsedTime();
        }
        interval(1000).subscribe(() => {
            this.updateElapsedTime();
        });
    }

    private updateElapsedTime(): void {
        const startDate = new Date(this.startDay);
        const now = new Date();
        let diffMs = now.getTime() - startDate.getTime();

        if (diffMs < 0 || isNaN(diffMs)) {
            this.elapsedTime.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        diffMs -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        diffMs -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(diffMs / (1000 * 60));
        diffMs -= minutes * (1000 * 60);

        const seconds = Math.floor(diffMs / 1000);

        this.elapsedTime.set({ days, hours, minutes, seconds });
    }

    formatNumber(value: number): string {
        return String(value).padStart(2, '0');
    }
}
