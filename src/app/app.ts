import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {

    items = [
        { label: 'Първо обещание', details: 'Съдържание на първото обещание', completed: true },
        { label: 'Второ обещание', details: 'Съдържание на второто обещание', completed: false },
        { label: 'Трето обещание', details: 'Съдържание на третото обещание', completed: false },
    ];

    get activeIndex(): number {
        return this.items.findIndex(item => !item.completed);
    }

    selectedIndex = signal(0);

    select(index: number): void {
        this.selectedIndex.set(index);
    }

}
