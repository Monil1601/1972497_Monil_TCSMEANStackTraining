
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
 
import { QuestionClass } from './question-class';
import { ToastrService } from 'ngx-toastr';

//import {ModalDirective} from 'angular-bootstrap-md';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({

	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isQuestionCardShow: boolean = false;
	totalAnswered: number = 0;
	rightAnswer: number=1;
  msg:string="";
	questionObj = new QuestionClass();
    @ViewChild('submitModal') submitModal: any ;
	
	 @ViewChild('answerModal') answerModal : any
	@ViewChild('questionForm') questionForm: any;
	@ViewChild('questionTest') questionTest : any;

	constructor( private toastr: ToastrService,private modalService: NgbModal) { }

	answerArray = [];

	allQuestions: any = [{
		"id": 1,
		"question": "Which Class indicates a Dropdown Menu?",
		"a": ".dropdown",
		"b": ".select",
		"c": "dropdown-list",
		"d": "dropup-list",
		"answer": "a"
	},
	{
		"id": 2,
		"question": "Bootstrap's Grid System allows up to?",
		"a": "6 columns across the page",
		"b": "8 columns across the page",
		"c": "12 columns across the page",
		"d": "24 columns across the page",
		"answer": "c"
	},
	{
		"id": 3,
		"question": "Which of the following contextual class is used for warning purpose ?",
		"a": ".active",
		"b": ".warning",
		"c": ".danger",
		"d": "All of the above",
		"answer": "b"
	},
	{
		"id": 4,
		"question": "Which of the following class is used to create a button as a link in Bootstrap?",
		"a": ".btn-hyperlink",
		"b": ".btn-link",
		"c": ".btn-anchor",
		"d": "None of these",
		"answer": "b"
	},
	{
		"id": 5,
		"question": "Which class provides a responsive fixed width container in bootstrap?",
		"a": ".container-fixed",
		"b": ".container",
		"c": ".container-fluid",
		"d": "None of these",
		"answer": "b"
	},
	{
		"id": 6,
		"question": "Default size of h3 BootStrap heading",
		"a": "18px",
		"b": "24px",
		"c": "26px",
		"d": "30px",
		"answer": "b"
	},
	
	{
		"id": 7,
		"question": "Which plugin is used to cycle through elements, like a slideshow?",
		"a": "Orbit",
		"b": "Scrollspy",
		"c": "Slideshow",
		"d": "Carousel",
		"answer": "d"
	},
	{
		"id": 8,
		"question": "Which layout is used for providing 100% width in BootStrap?",
		"a": "Fluid layout",
		"b": "Fixed layout",
		"c": "Both (a) and (b)",
		"d": "None of these",
		"answer": "a"
	},
	{
		"id": 9,
		"question": "What are BootStrap Carousel plugins?",
		"a": ".carousel (options)",
		"b": ".carousel ('pause')",
		"c": ".carousel ('cycle')",
		"d": "All of these",
		"answer": "d"
	},
	
	{
		"id": 10,
		"question": "A standard navigation tab is created with?",
		"a": "<ul class='navigation-tabs'>",
		"b": "<ul class='nav Tabs'>",
		"c": "<ul class='navnav-tabs'>",
		"d": "<ul class='navnav-navbar'>",
		"answer": "b"
	}
	
	]

	/**Method call on submit the test */
	submitTest() {
		this.rightAnswer = 0;
		this.totalAnswered = 0;
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i] && (this.allQuestions[i]["selected"] != null)) {
				this.totalAnswered++;
				if (this.allQuestions[i]["selected"] == this.allQuestions[i]["answer"]) {
					this.rightAnswer++;
				}
			}

		}
		this.submitModal.show();

	}
	startQuiz() {
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i]) {
				delete this.allQuestions[i]["selected"];
			}

		}
		this.questionTest.reset();
		this.isQuestionCardShow = true;

	}
	HomePage() {
		this.isQuestionCardShow = false;
	}
	checkAnswers(){
		this.submitModal.hide();
		this.answerModal.show();
	}

	ngOnInit() {



	}

}