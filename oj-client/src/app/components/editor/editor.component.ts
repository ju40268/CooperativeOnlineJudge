import { Component, OnInit } from '@angular/core';
import 'ace-builds/ace'
import 'ace-builds/src-min/ace';
import 'ace-builds/src-min/theme-monokai';
import 'ace-builds/src-min/mode-java';

declare const ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor : any;

  defaultContent = {
    'Java' : "Hello Java"
  };
  constructor() { }

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/twilight');
    this.editor.getSession().setMode('ace/mode/java')
    this.editor.setValue(this.defaultContent['Java']);
  }

}
