import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import { PROBLEMS } from "../mock-problems";

@Injectable()
export class DataService {

  localProblemList: Problem[] = PROBLEMS;
  constructor() { }

  getProblems(): Problem[] {
    return this.localProblemList;
  }

  getProblem(id: number): Problem {
    return this.localProblemList.find((problem) => problem.id === id);
  }
  addProblem(currentProblem: Problem): void{
    currentProblem.id = this.localProblemList.length + 1;
    this.localProblemList.push(currentProblem);
  }
}
