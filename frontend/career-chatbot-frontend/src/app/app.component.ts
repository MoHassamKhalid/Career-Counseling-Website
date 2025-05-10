import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showChat = false;
  currentQuoteIndex = 0;
  quoteInterval: any;
  isChatOpen = false; // Flag to control chat visibility

  toggleChat() {
    this.isChatOpen = !this.isChatOpen; // Toggle chat visibility
  }

  closeChat(event: boolean) {
    this.isChatOpen = event; // Close the chat when the event is emitted
  }

  careerQuotes = [
    { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
    { text: "Choose a job you love, and you will never have to work a day in your life.", author: "Confucius" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Opportunities don't happen, you create them.", author: "Chris Grosser" },
  ];

  widgets = [
    { title: "Career Skills Assessment", description: "Discover your strengths and areas for growth." },
    { title: "Skill Level", description: "Assess your skills in various areas and track your progress." },
    { title: "Industry Trends", description: "Stay updated with the latest trends in the job market." }
  ];

  ngOnInit() {
    // Start automatic quote slider
    this.quoteInterval = setInterval(() => {
      this.nextQuote();
    }, 5000);  // Change every 5 seconds
  }

  ngOnDestroy() {
    // Clear interval when component is destroyed
    if (this.quoteInterval) {
      clearInterval(this.quoteInterval);
    }
  }

  prevQuote() {
    if (this.currentQuoteIndex > 0) {
      this.currentQuoteIndex--;
    } else {
      this.currentQuoteIndex = this.careerQuotes.length - 1;
    }
  }

  nextQuote() {
    if (this.currentQuoteIndex < this.careerQuotes.length - 1) {
      this.currentQuoteIndex++;
    } else {
      this.currentQuoteIndex = 0;
    }
  }

  openChat() {
    this.showChat = !this.showChat;
  }
}
