
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  X, 
  Send, 
  Image as ImageIcon,
  Paperclip,
  Smile 
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm StyleSphere's AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Predefined responses for demo purposes
    const botResponses: string[] = [
      "I'd be happy to help you find the perfect outfit for your occasion!",
      "Our new summer collection is now available online and in stores.",
      "Yes, we offer free shipping on orders over $100.",
      "Returns are accepted within 30 days of purchase with receipt.",
      "Our customer support team is available Monday through Friday, 9am-6pm EST.",
      "Let me know if you need assistance with sizing or color recommendations."
    ];
    
    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleAttachment = () => {
    toast.info("File attachment coming soon!");
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-30">
        <Button
          className={`h-14 w-14 rounded-full shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-fashion-purple hover:bg-fashion-purple/90'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </div>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-30 flex flex-col border overflow-hidden">
          {/* Header */}
          <div className="bg-fashion-purple p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
                <MessageCircle size={16} className="text-fashion-purple" />
              </div>
              <div>
                <h3 className="font-medium">StyleSphere Assistant</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <button 
              className="text-white hover:bg-white/10 rounded-full p-1"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-fashion-purple/90 text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span 
                    className={`text-xs ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    } block mt-1 text-right`}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: "0.2s"}}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: "0.4s"}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form 
            className="border-t p-3 flex items-center gap-2 bg-gray-50"
            onSubmit={handleSendMessage}
          >
            <button 
              type="button"
              className="text-gray-500 hover:text-fashion-purple"
              onClick={handleAttachment}
            >
              <Paperclip size={18} />
            </button>
            <button 
              type="button"
              className="text-gray-500 hover:text-fashion-purple"
              onClick={handleAttachment}
            >
              <ImageIcon size={18} />
            </button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <button
              type="submit"
              className={`text-white p-2 rounded-full ${
                message.trim() ? 'bg-fashion-purple hover:bg-fashion-purple/90' : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!message.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
