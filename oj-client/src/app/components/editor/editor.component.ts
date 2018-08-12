import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    editor: any;
    private lang = 'Java';
    private sessionId: string;
    private lang_choice: string[] = ['Java', 'Python', 'Cpp'];
    private _divIdEditor: string = 'editor';
    defaultContent = {
      'Java' : `public class Solution {
    public static void main(String args[]) {
        // start your code here.
    }
}`
    }

    constructor(@Inject('collaboration') private collaboration,
    private route: ActivatedRoute) {
      console.log('Editor Load')
      console.log(this.route)

    }

    get divIdEditor(): string {
      return this._divIdEditor;
    }

    resetEditor(): void{
      this.editor.getSession().setMode('ace/mode/' + this.lang.toLowerCase());
      this.editor.setValue(this.defaultContent[this.lang]);
    }

    initEditor(): void {
      console.log('Init Editor ...')
      this.editor = ace.edit(this._divIdEditor);
      ace.config.set('basePath', '/libs/ace');
      this.editor.setTheme('ace/theme/dracula');
      this.resetEditor();
      this.editor.$blockScrolling = Infinity;

      document.getElementsByTagName("textarea")[0].focus();
      this.collaboration.init(this.editor, this.sessionId);
      this.editor.lastAppliedChange = null;

      this.editor.on('change', (e) => {
        console.log('editor changes: ' + JSON.stringify(e));
        if (this.editor.lastAppliedChange != e) {
          this.collaboration.change(JSON.stringify(e));
        }
      });

      this.editor.getSession().getSelection().on("changeCursor", () => {
        let cursor = this.editor.getSession().getSelection().getCursor();
        console.log('cursor moves: ' + JSON.stringify(cursor));
        this.collaboration.cursorMove(JSON.stringify(cursor));
      });

      this.collaboration.restoreBuffer();
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      });
    }

}
