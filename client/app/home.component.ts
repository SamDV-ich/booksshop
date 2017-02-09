import {Component} from '@angular/core';

@Component({
    selector: 'home',
    template: `
        <div class="items books">
            <div *ngFor="let book of books" class="item">
                <div>{{book.title}}</div>
                <div>{{book.author}}</div>
                <div>{{book.description}}</div>
            </div>
        </div>
    `
})
export class HomeComponent {
    books = [
        {
            title: 'Journey to the Center of the Earth ',
            author: 'Jules Verne',
            cover: 'Hardcover',
            price: 3.75,
            description : 'First published in 1864, “Journey to the Center of the Earth” is Jules Verne’s classic tale of adventure, one of the earliest examples of science fiction. When German professor Otto Liedenbrock finds a coded message in an original runic manuscript of Snorri Sturluson’s Icelandic saga, “Heimskringla,” he discovers what he believes to be a secret passage to the center of the Earth. Professor Liedenbrock, who has long hypothesized that there are volcanic tubes which descend deep into the Earth, embarks immediately for Iceland on a journey of scientific discovery to prove his belief. Along with his reluctant nephew, Alex, and Icelandic guide Hans Bjelke, whom they have hired, the three descend into the bowels of a volcanic crater. A dangerous journey awaits them as they attempt to travel to the center of the Earth. Following a subterranean river to a vast ocean, which they traverse on a raft, they ultimately discover a world filled with prehistoric plants and animals. “Journey to the Center of the Earth” has captivated readers for generations, and remains to this day as one the most fantastical tales ever told. This edition follows the translation of Frederic Amadeus Malleson.'
        },
        {
            title: 'Journey to the Center of the Earth ',
            author: 'Jules Verne',
            cover: 'Hardcover',
            price: 3.75,
            description : 'First published in 1864, “Journey to the Center of the Earth” is Jules Verne’s classic tale of adventure, one of the earliest examples of science fiction. When German professor Otto Liedenbrock finds a coded message in an original runic manuscript of Snorri Sturluson’s Icelandic saga, “Heimskringla,” he discovers what he believes to be a secret passage to the center of the Earth. Professor Liedenbrock, who has long hypothesized that there are volcanic tubes which descend deep into the Earth, embarks immediately for Iceland on a journey of scientific discovery to prove his belief. Along with his reluctant nephew, Alex, and Icelandic guide Hans Bjelke, whom they have hired, the three descend into the bowels of a volcanic crater. A dangerous journey awaits them as they attempt to travel to the center of the Earth. Following a subterranean river to a vast ocean, which they traverse on a raft, they ultimately discover a world filled with prehistoric plants and animals. “Journey to the Center of the Earth” has captivated readers for generations, and remains to this day as one the most fantastical tales ever told. This edition follows the translation of Frederic Amadeus Malleson.'
        }
    ];
}