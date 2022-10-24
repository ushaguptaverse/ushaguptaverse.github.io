import { Component, HostListener, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import * as ace from "ace-builds";

let consoleOutput = []
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnInit {

  @ViewChild("editor", { static: false }) private editor: ElementRef<HTMLInputElement> = {} as ElementRef;

  private editorCode = "console.log('Happy Coding');";

  public isMobile

  public isEditorView

  public javaScriptSegmentValue = "javaScript"
  public outputSegmentValue = "output"

  public segmentValue = this.javaScriptSegmentValue

  public output

  private console = window.console

  constructor(private changeDetector: ChangeDetectorRef) {
    this.isMobile = true
    this.isEditorView = true
  }

  ngOnInit(): void {

    if (window.innerWidth < 768) { // 768px portrait
      this.isMobile = true
    }
    else {
      this.isMobile = false;
    }

    this.initilizeConsole()
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 768) { // 768px portrait
      this.isMobile = true;
    }
    else {
      this.isMobile = false;
    }

    this.changeDetector.detectChanges();
    if (!this.isMobile || this.isEditorView) {
      this.loadEditor();
    }
  }

  public getEditorOutputSegmentValue(event: any) {
    if (event.detail.value === this.javaScriptSegmentValue) {
      this.isEditorView = true
      this.segmentValue = this.javaScriptSegmentValue
      this.changeDetector.detectChanges();
      this.loadEditor();
    }
    else {
      this.isEditorView = false
      this.segmentValue = this.outputSegmentValue
    }
  }

  ngAfterViewInit(): void {
    this.loadEditor()
  }

  private loadEditor() {
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue(this.editorCode);
    aceEditor.setTheme("ace/theme/chrome");
    aceEditor.session.setMode("ace/mode/javascript");
    aceEditor.on("change", () => {
      this.editorCode = aceEditor.getValue();
    });
  }

  public executeCode() {
    consoleOutput = []
    try {
      eval(this.editorCode)
    } catch (err) {
      this.console.error(err)
    }
    this.output = consoleOutput
  }

  private initilizeConsole() {
    this.console.log = function (obj) {
      consoleOutput.push({
        text: obj,
        logType: 'log'
      })
    }

    this.console.info = function (obj) {
      consoleOutput.push({
        text: obj,
        logType: 'info'
      })
    }

    this.console.warn = function (obj) {
      consoleOutput.push({
        text: obj,
        logType: 'warn'
      })
    }

    this.console.debug = function (obj) {
      consoleOutput.push({
        text: obj,
        logType: 'debug'
      })
    }

    this.console.error = function (obj) {
      consoleOutput.push({
        text: obj,
        logType: 'error'
      })
    }
  }

  public evalMobile() {
    this.isEditorView = false
    this.segmentValue = this.outputSegmentValue
    this.executeCode()
  }
}

