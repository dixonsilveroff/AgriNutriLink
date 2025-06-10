// Ask ANL AI Chatbot functionality

document.addEventListener('DOMContentLoaded', () => {
    // AI Chatbot logic for Ask ANL
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotAskBtn = document.getElementById('chatbotAskBtn');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (chatbotInput && chatbotAskBtn && chatbotMessages) {
        chatbotAskBtn.addEventListener('click', () => {
            handleAIChatbotAsk();
        });
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAIChatbotAsk();
            }
        });
    }

    function handleAIChatbotAsk() {
        const question = chatbotInput.value.trim();
        if (!question) return;
        addChatbotMessage(question, 'user');
        chatbotInput.value = '';
        setTimeout(() => {
            const response = getPresetChatbotResponse(question);
            addChatbotMessage(response, 'bot');
        }, 600);
    }

    function addChatbotMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = 'ai-message ' + sender;
        msg.textContent = text;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getPresetChatbotResponse(question) {
        // Simple keyword-based preset responses
        const lower = question.toLowerCase();
        if (lower.includes('protein')) {
            return 'Protein is essential for growth and repair. Beans and cassava leaves are good sources.';
        }
        if (lower.includes('rice')) {
            return 'Rice is a staple crop, rich in carbohydrates but low in protein and fiber.';
        }
        if (lower.includes('vitamin')) {
            return 'Vitamins are micronutrients needed in small amounts. Pumpkin leaf is rich in vitamins A and C.';
        }
        if (lower.includes('cassava')) {
            return 'Cassava is a root crop high in carbohydrates. It should be properly processed before eating.';
        }
        if (lower.includes('beans')) {
            return 'Beans are a great source of plant protein, fiber, and minerals like iron and magnesium.';
        }
        if (lower.includes('ugu') || lower.includes('pumpkin')) {
            return 'Pumpkin leaf (Ugu) is rich in vitamins and minerals, especially vitamin A and iron.';
        }
        // Default response
        return 'Thank you for your question! Please consult our experts or explore our modules for more information.';
    }
}); 