/**
 * HakiLine Advocates AI Chatbot
 * Premium AI-powered client assistance
 */

class HakiChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.botName = "Haki Assistant";
        this.botAvatar = "./Assets/img/lady-lawyer.jpg"; // Using an existing asset
        
        this.init();
    }

    init() {
        this.createUI();
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    createUI() {
        const chatbotHTML = `
            <div class="chatbot-toggle" id="chatToggle">
                <i class="fas fa-comment-dots"></i>
            </div>
            <div class="chatbot-window" id="chatWindow">
                <div class="chat-header">
                    <img src="${this.botAvatar}" alt="Bot">
                    <div class="chat-header-info">
                        <h4>${this.botName}</h4>
                        <span>AI Legal Assistant • Online</span>
                    </div>
                    <div class="chat-close" id="chatClose">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div class="chat-messages" id="chatMessages"></div>
                <div class="typing" id="chatTyping">
                    <span></span><span></span><span></span>
                </div>
                <div class="quick-replies" id="quickReplies">
                    <button class="quick-reply">Corporate Law</button>
                    <button class="quick-reply">Family Law</button>
                    <button class="quick-reply">Property Dispute</button>
                    <button class="quick-reply">Book Consultation</button>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chatInput" placeholder="Type your inquiry here...">
                    <button class="chat-send-btn" id="chatSend">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatToggle');
        const close = document.getElementById('chatClose');
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSend');
        const quickReplies = document.querySelectorAll('.quick-reply');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.toggleChat());

        sendBtn.addEventListener('click', () => this.handleUserInput());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        quickReplies.forEach(btn => {
            btn.addEventListener('click', () => {
                input.value = btn.innerText;
                this.handleUserInput();
            });
        });
    }

    toggleChat() {
        const window = document.getElementById('chatWindow');
        const toggle = document.getElementById('chatToggle');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            window.classList.add('active');
            toggle.querySelector('i').className = 'fas fa-chevron-down';
        } else {
            window.classList.remove('active');
            toggle.querySelector('i').className = 'fas fa-comment-dots';
        }
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hello! I'm your HakiLine AI assistant. How can I help you with your legal inquiries today?", 'bot');
        }, 1000);
    }

    handleUserInput() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        
        if (!text) return;

        this.addMessage(text, 'user');
        input.value = '';
        
        this.showTyping(true);
        
        // Simulate AI Response
        setTimeout(() => {
            const response = this.getAIResponse(text);
            this.showTyping(false);
            this.addMessage(response, 'bot');
        }, 1500);
    }

    addMessage(text, sender) {
        const messagesDiv = document.getElementById('chatMessages');
        const msgElement = document.createElement('div');
        msgElement.className = `message ${sender}`;
        msgElement.innerText = text;
        
        messagesDiv.appendChild(msgElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    showTyping(show) {
        const typing = document.getElementById('chatTyping');
        typing.style.display = show ? 'flex' : 'none';
        const messagesDiv = document.getElementById('chatMessages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    getAIResponse(query) {
        const q = query.toLowerCase();
        
        if (q.includes('corporate') || q.includes('business') || q.includes('company')) {
            return "At HakiLine Advocates, we offer comprehensive corporate legal services including business formation, contract drafting, and regulatory compliance. Would you like to speak with James Otieno, our Senior Partner in Corporate Law?";
        }
        
        if (q.includes('family') || q.includes('divorce') || q.includes('custody')) {
            return "Our Family Law department, led by Sophia Njeri, handles delicate matters such as divorce, child custody, and matrimonial property with utmost sensitivity. We can schedule a private consultation for you.";
        }
        
        if (q.includes('property') || q.includes('land') || q.includes('real estate')) {
            return "Property and Real Estate law is one of our core strengths. We assist with land transactions, boundary disputes, and title verifications across Kenya. Are you looking to buy or lease property?";
        }

        if (q.includes('book') || q.includes('consultation') || q.includes('appointment')) {
            setTimeout(() => {
                if (confirm("Would you like to go to our booking page now?")) {
                    window.location.href = 'contact.html';
                }
            }, 1000);
            return "You can book a consultation through our website's contact form or call us directly at +254 700 000 000. I'm opening the booking options for you...";
        }

        if (q.includes('hello') || q.includes('hi')) {
            return "Hello! I'm here to assist you with any legal questions or to guide you to the right advocate for your case.";
        }

        return "That's an important inquiry. While I'm an AI assistant, I can definitely help direct you to the right legal expert. Please provide a few more details or feel free to leave your contact information so our team can reach out to you.";
    }
}

// Initialize the chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.hakiChat = new HakiChatbot();
});
