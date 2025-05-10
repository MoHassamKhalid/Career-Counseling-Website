import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var webkitSpeechRecognition: any; // Declaring the SpeechRecognition interface

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput = '';
  messages: { sender: string, text: string }[] = [];
  isLoading = false;
  error: string | null = null;
  isRecording = false;
  
  @Output() closeChatEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  recognition = new webkitSpeechRecognition(); // Now this won't throw the "Cannot find name" error

  closeChat() {
    this.closeChatEvent.emit(false); // Emits false to hide the chat component
  }

  constructor(private http: HttpClient) {}

  suggestions: string[] = [
    'How can I improve my resume for a software engineering job?',
    'What are the best career paths for someone interested in AI?',
  ];

  // To populate the input field with the selected suggestion
  populateInput(suggestion: string): void {
    this.userInput = suggestion;
  }

  sendMessage() {
    const msg = this.userInput.trim();
    if (!msg) return;

    this.messages.push({ sender: 'You', text: msg });
    this.userInput = '';
    this.isLoading = true;
    this.error = null;

    this.http.post<any>('http://127.0.0.1:5000/chat', { message: msg })
      .subscribe({
        next: (res) => {
          this.messages.push({ sender: 'Bot', text: res.reply });
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Sorry, there was an error processing your request. Please try again.';
          this.isLoading = false;
          console.error('Error:', err);
        }
      });
  }

  startListening() {
    this.recognition.lang = 'en-US';
    this.recognition.start();
    this.isRecording = true;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.userInput = transcript;
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event);
    };

    this.recognition.onend = () => {
      this.isRecording = false;
    };
  }
}
