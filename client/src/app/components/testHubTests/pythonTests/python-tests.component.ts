import { Component, OnInit } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css'; // Make sure the path is correct

@Component({
  selector: 'app-python-tests',
  templateUrl: './python-tests.component.html',
  styleUrls: ['./python-tests.component.css']
})
export class PythonTestsComponent {
  highlightedCode: string = '';

  updateCode(code: string) {
    this.highlightedCode = Prism.highlight(code, Prism.languages['python'], 'python');
  }
}