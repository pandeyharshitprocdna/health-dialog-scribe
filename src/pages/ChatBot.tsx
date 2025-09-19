import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Stethoscope, Brain, Heart } from "lucide-react";
import ChatNavbar from "@/components/ui/chatNavbar";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface PersonaData {
  name: string;
  role: string;
  traits: string[];
  icon: React.ComponentType<any>;
  rating: number;
}

const personaData: Record<string, PersonaData> = {
  innovator: {
    name: "Dr. Sarah Chen",
    role: "Oncologist",
    traits: ["Quick to try new drugs", "Evidence-driven switcher"],
    icon: Brain,
    rating: 4.5
  },
  loyalist: {
    name: "Dr. Michael Torres", 
    role: "Dermatologist",
    traits: ["Brand loyalist", "Moderately evidence-aware"],
    icon: Stethoscope,
    rating: 4.3
  },
  guide: {
    name: "Dr. Emma Rodriguez",
    role: "Oncologist", 
    traits: ["Humorous", "Data-driven", "Motivational", "Referencing guidelines"],
    icon: Heart,
    rating: 4.6
  }
};

const products = ["Rengene", "Staquila", "Cardiomax", "Neurothera"];
const specialties = ["Oncologist", "Dermatologist", "Cardiologist"];
const personaTraits = ["Evidence-driven", "Brand loyalist", "Guidelines-focused", "Humorous"];

const ChatBot = () => {
  const { personaId } = useParams<{ personaId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("Rengene");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ Add navbar filter states
  const [specialty, setSpecialty] = useState<string | undefined>();
  const [trait, setTrait] = useState<string | undefined>();
  const [selectedProfessional, setSelectedProfessional] = useState<string | undefined>(undefined);

  // Dummy recent chats (you can swap with real data later)
  const recentChats = [
    {
      id: "chat-001",
      title: "Rengene Phase III in NSCLC",
      preview: "Show me the latest OS and PFS...",
      timestamp: new Date(),
      seedMessages: [
        { id: "rc-1", content: "Show me the latest OS and PFS for Rengene.", isUser: true, timestamp: new Date() },
        { id: "rc-2", content: "Here’s a summary of the pivotal data and endpoints...", isUser: false, timestamp: new Date() },
      ] as Message[],
    },
    {
      id: "chat-002",
      title: "Derm safety vs SoC",
      preview: "Compare AE profile with standard...",
      timestamp: new Date(),
      seedMessages: [
        { id: "rc-3", content: "Compare AE profile with SoC for Staquila.", isUser: true, timestamp: new Date() },
        { id: "rc-4", content: "Most common AEs are...", isUser: false, timestamp: new Date() },
      ] as Message[],
    },
    {
      id: "chat-003",
      title: "Access & reimbursement",
      preview: "Copay and prior auth details...",
      timestamp: new Date(),
      seedMessages: [
        { id: "rc-5", content: "What’s the prior auth criteria for Cardiomax?", isUser: true, timestamp: new Date() },
        { id: "rc-6", content: "Typical criteria include...", isUser: false, timestamp: new Date() },
      ] as Message[],
    },
  ];

  const handleLoadChat = (seed: Message[]) => {
    setMessages(seed);
    // OPTIONAL: scroll to bottom after loading
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };


  const persona = personaId ? personaData[personaId] : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (persona) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: `Hello! I'm ${persona.name}, ${persona.role}. I'm here to discuss medical treatments and answer any questions you might have. How can I help you today?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [persona]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !persona) return;

    const userMessage: Message = {
      id: Date.now().toString() + "-user",
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const aiResponse = generatePersonaResponse(inputValue, persona, selectedProduct);
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputValue("");
  };

  const generatePersonaResponse = (userInput: string, persona: PersonaData, product: string) => {
    const productContext = product ? ` regarding ${product}` : "";
    if (persona.name.includes("Sarah")) {
      return `As an oncologist who's quick to try new drugs${productContext}, I'm always interested in evidence-driven solutions. What's the latest clinical data and trial results supporting this treatment approach?`;
    } else if (persona.name.includes("Michael")) {
      return `As a dermatologist, I tend to be brand loyal and stick with established treatments that work${productContext}. Can you show me how this compares to the protocols I'm already comfortable using?`;
    } else {
      return `That's a great question! Let me reference the current guidelines${productContext}. The data suggests... *chuckles* You know, keeping up with evidence-based medicine keeps us all on our toes!`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!persona) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Persona not found</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = persona.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ✅ Navbar added at top */}
      <ChatNavbar
      professionals={["Oncologist - Dr. Chen", "Dermatologist - Dr. Torres", "Cardiologist - Dr. Rao"]}
      products={["Rengene", "Staquila", "Cardiomax", "Neurothera"]}
      selectedProfessional={selectedProfessional}
      selectedProduct={selectedProduct}
      onChangeProfessional={setSelectedProfessional}
      onChangeProduct={setSelectedProduct}
    />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-secondary/50 flex flex-col">
          <div className="p-6 border-b border-border">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="mb-4 p-0 h-auto font-normal text-foreground btn-back-hover"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
            
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Clinical Q&A
            </h2>

            {/* Recent Chats */}
            <div className="mt-2">
              <h3 className="text-md font-semibold text-foreground mb-2">Recent chats</h3>
              <div className="space-y-2">
                {recentChats.map((c) => (
                  <Button
                    key={c.id}
                    variant="ghost"
                    className="w-full justify-start text-left px-3 py-2 h-auto rounded-xl hover:bg-accent/60"
                    onClick={() => handleLoadChat(c.seedMessages)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{c.title}</span>
                      <span className="text-xs text-muted-foreground truncate">{c.preview}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-muted-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-border p-6">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="btn-medical"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
