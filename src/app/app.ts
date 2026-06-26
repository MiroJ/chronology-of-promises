import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProgramSectionComponent } from './program-section/program-section';
import { CounterComponent } from './counter/counter';
import { StatusMarkComponent } from './status-mark/status-mark';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ProgramSectionComponent, CounterComponent, StatusMarkComponent],
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
    private http = inject(HttpClient);

    readonly programSections = signal<ProgramSection[]>([]);
    readonly programTitle = signal('');
    readonly startDay = signal<string>('');
    readonly partySeats = signal<number>(0);
    readonly totalSeats = signal<number>(100);

    ngOnInit(): void {
        forkJoin({
            dataPrograms: this.http.get<ProgramDocument>('data-program.json'),
            dataResults: this.http.get<ResultItem[]>('data-results.json')
        }).subscribe(({ dataPrograms, dataResults }) => {
            this.programTitle.set(dataPrograms.programTitle);
            this.startDay.set(dataPrograms.startDay);
            this.partySeats.set(dataPrograms.partySeats ?? 0);
            this.totalSeats.set(dataPrograms.totalSeats ?? 100);

            const linkedProgramItems = dataPrograms.sections.map(section => ({
                ...section,
                relatedResults: [] as ResultItem[],
                items: section.items.map(item => ({
                    ...item,
                    relatedResults: [] as ResultItem[]
                }))
            }));

            for (const resultItem of dataResults) {
                if (!resultItem.programIds?.length) {
                    continue;
                }

                for (const id of resultItem.programIds) {
                    if (id.includes('.')) {
                        const [itemId, subpointId] = id.split('.').map(Number);
                        const programItem = linkedProgramItems.find(x => x.id === itemId);
                        const subpoint = programItem?.items.find(x => x.id === subpointId);

                        if (subpoint) {
                            subpoint.relatedResults.push(resultItem);
                        }
                    } else {
                        const itemId = Number(id);
                        const programItem = linkedProgramItems.find(pi => pi.id === itemId);

                        if (programItem) {
                            programItem.relatedResults.push(resultItem);
                        }
                    }
                }
            }

            const byDate = (a: ResultItem, b: ResultItem) =>
                String(a.date).localeCompare(String(b.date));

            for (const section of linkedProgramItems) {
                section.relatedResults.sort(byDate);
                for (const item of section.items) {
                    item.relatedResults.sort(byDate);
                }
            }

            this.programSections.set(linkedProgramItems);
        });
    }

}

// Models data-program.json

export interface ProgramDocument {
    programTitle: string;
    startDay: string;
    partySeats: number;
    totalSeats: number;
    sections: ProgramSection[];
}

export interface ProgramSection {
    id: number;
    sectionTitle: string;
    items: ProgramSectionItem[];
    relatedResults: ResultItem[];
}

export interface ProgramSectionItem {
    id: number;
    title: string;
    relatedResults: ResultItem[];
}

// Models data-results.json

export interface ResultItem {
    programIds: string[]; // References to program items (e.g., "1", "2.1")
    title: string;
    description: string;
    date: Date;
    status: 'in-progress' | 'undetermined' | 'succeeded' | 'failed';
    imageUrl: string;
    references: string[];
}
