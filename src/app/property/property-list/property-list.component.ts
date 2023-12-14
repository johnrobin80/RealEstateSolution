import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnInit {
  numbers: any;
  page = 0;
  size = 10;
  filteredData: Array<data> = [];

  realtyData = [
    {
      id: 1,
      url: 'https://images.freeimages.com/images/large-previews/996/easter-1399885.jpg',
    },
    {
      id: 2,
      url: 'https://images.freeimages.com/images/large-previews/0b3/burning-tree-1377053.jpg',
    },
    {
      id: 3,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
    {
      id: 4,
      url: 'https://images.freeimages.com/images/large-previews/310/resting-peacefully-1574880.jpg',
    },
    {
      id: 5,
      url: 'https://images.freeimages.com/images/large-previews/aae/lomo-spider-1386711.jpg',
    },
    {
      id: 6,
      url: 'https://images.freeimages.com/images/large-previews/996/easter-1399885.jpg',
    },
    {
      id: 7,
      url: 'https://images.freeimages.com/images/large-previews/0b3/burning-tree-1377053.jpg',
    },
    {
      id: 8,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
    {
      id: 9,
      url: 'https://images.freeimages.com/images/large-previews/996/easter-1399885.jpg',
    },
    {
      id: 10,
      url: 'https://images.freeimages.com/images/large-previews/0b3/burning-tree-1377053.jpg',
    },
    {
      id: 11,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
    {
      id: 12,
      url: 'https://images.freeimages.com/images/large-previews/310/resting-peacefully-1574880.jpg',
    },
    {
      id: 13,
      url: 'https://images.freeimages.com/images/large-previews/aae/lomo-spider-1386711.jpg',
    },
    {
      id: 14,
      url: 'https://images.freeimages.com/images/large-previews/996/easter-1399885.jpg',
    },
    {
      id: 15,
      url: 'https://images.freeimages.com/images/large-previews/0b3/burning-tree-1377053.jpg',
    },
    {
      id: 16,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
    {
      id: 17,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
    {
      id: 18,
      url: 'https://images.freeimages.com/images/large-previews/310/resting-peacefully-1574880.jpg',
    },
    {
      id: 19,
      url: 'https://images.freeimages.com/images/large-previews/aae/lomo-spider-1386711.jpg',
    },
    {
      id: 20,
      url: 'https://images.freeimages.com/images/large-previews/996/easter-1399885.jpg',
    },
    {
      id: 21,
      url: 'https://images.freeimages.com/images/large-previews/0b3/burning-tree-1377053.jpg',
    },
    {
      id: 22,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
    {
      id: 23,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
    {
      id: 24,
      url: 'https://images.freeimages.com/images/large-previews/310/resting-peacefully-1574880.jpg',
    },
    {
      id: 25,
      url: 'https://images.freeimages.com/images/large-previews/aae/lomo-spider-1386711.jpg',
    },
    {
      id: 26,
      url: 'https://images.freeimages.com/images/large-previews/996/easter-1399885.jpg',
    },
    {
      id: 27,
      url: 'https://images.freeimages.com/images/large-previews/0b3/burning-tree-1377053.jpg',
    },
    {
      id: 28,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
    {
      id: 29,
      url: 'https://images.freeimages.com/images/large-previews/0b3/burning-tree-1377053.jpg',
    },
    {
      id: 30,
      url: 'https://images.freeimages.com/images/large-previews/346/cemetery-1404186.jpg',
    },
  ];
  constructor() {
    this.numbers = Array(5)
      .fill(5)
      .map((x, i) => i); // [0,1,2,3,4]
    //this.numbers = Array(20).fill(4); // [4,4,4,4,4]
  }

  ngOnInit() {
    this.getData({ pageIndex: this.page, pageSize: this.size });
  }

  getData(obj: any) {
    let index = 0;
    const startingIndex = obj.pageIndex * obj.pageSize;
    const endingIndex = startingIndex + obj.pageSize;

    this.filteredData = this.realtyData.filter(() => {
      index++;
      this.onWindowScrollToTheTop();
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }

  onWindowScrollToTheTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    console.log('Scroller');
  }
}
export interface data {
  id: number;
  url: string;
}
