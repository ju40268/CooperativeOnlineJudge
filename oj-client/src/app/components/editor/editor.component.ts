import { Component, OnInit } from '@angular/core';
// import 'ace-builds/src-noconflict/ace';
// import 'ace-builds/src-noconflict/ext-language_tools';
// import 'ace-builds/src-noconflict/theme-eclipse';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  private _divIdEditor: string = 'editor';
  defaultContent = {
    'Java' : `public class Solution {
  public static void main(String args[]) {
      // start your code here.
  }
}`
  }

  constructor() { }

  get divIdEditor(): string {
    return this._divIdEditor;
  }

  ngOnInit() {
    var editor = ace.edit(this._divIdEditor);
    editor.setTheme('ace/theme/eclipse');
    editor.getSession().setMode('ace/mode/java')
    editor.setValue(this.defaultContent['Java']);
    editor.$blockScrolling = Infinity;
  }

}
