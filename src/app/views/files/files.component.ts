import { Component, OnInit, ViewChild } from '@angular/core';
import { IMedia } from '../../domain/IMedia'
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  @ViewChild('largeModal', { static: false }) public largeModal: ModalDirective;
  value = "";
  currentIndex;
  selectedFiles: File = null;
  currentItem: IMedia;
  constructor() {
    // this.currentIndex = 0;
    // this.currentItem = this.playlist[ this.currentIndex ];
  }
  ngOnInit() {
  }
  onFilesSelected(event) {
    this.selectedFiles = <File>event.target.files[0];
  }

  playlist: Array<IMedia> = [
    {
      title: 'Neene Modalu Neene Kone - Kiss - Viraat, Sreeleela - A P Arjun - Adi Hari - Shreya Ghoshal',
      src: '../../../assets/videos/Neene Modalu Neene Kone - Kiss - Viraat, Sreeleela - A P Arjun - Adi Hari - Shreya Ghoshal.webm',
      type: 'video/webm'
    },
    {
      title: 'I Love The Way U Hate Me (Video Song) - Shreyas - Sanjith Hegde - Ajaneesh Loknath - Guru Deshpande',
      src: '../../../assets/videos/I Love The Way U Hate Me (Video Song) - Shreyas - Sanjith Hegde - Ajaneesh Loknath - Guru Deshpande.mp4',
      type: 'video/webm'
    },
    {
      title: 'Bell Bottom - Yethake (Video Song) - Rishab Shetty, Hariprriya - Jayatheertha - Ajaneesh Loknath',
      src: '../../../assets/videos/Bell Bottom - Yethake (Video Song) - Rishab Shetty, Hariprriya - Jayatheertha - Ajaneesh Loknath.webm',
      type: 'video/mp4'
    },
    {
      title: 'Wada raha',
      src: '../../../assets/videos/videoplayback.mp4',
      type: 'video/mp4'
    },
    {
      title: 'Crazy crazy feeling',
      src: '../../../assets/videos/1.mp4',
      type: 'video/mp4'
    }
    ,
    {
      title: 'Naanu Neenu Video Song - Pailwaan Kannada - Kichcha Sudeepa, Aakanksha Singh - Krishna - Arjun Janya.webm',
      src: '../../../assets/videos/Naanu Neenu Video Song - Pailwaan Kannada - Kichcha Sudeepa, Aakanksha Singh - Krishna - Arjun Janya.webm',
      type: 'video/webm'
    },
    {
      title: 'Nagabeda Ande Naanu (320Kbps).mp3',
      src: '../../../assets/videos/Nagabeda Ande Naanu (320Kbps).mp3',
      type: 'audio/mp3'
    }
  ];


  onClickPlaylistItem(item: IMedia, index) {
    this.currentIndex = index;
    this.currentItem = item;
    this.largeModal.show();
  }

}
