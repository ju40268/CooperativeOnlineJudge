import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from '../../models/problem.model';



const DEFAULT_PROBLEM: Problem = Object.freeze({
  id : 0,
  name: "",
  desc: "",
  difficulty: "easy",
});
@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {

  public difficulties = ["easy", "medium", "hard", "super"];
  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  constructor(@Inject("data") private data) { }

  ngOnInit() {
  }
  addProblem() {
    console.log("add problem clicked!")
    this.data.addProblem(this.newProblem);
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }
}
