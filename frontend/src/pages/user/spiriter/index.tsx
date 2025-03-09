import { useEffect, useRef, useState } from "react";

export const UserSpiriterPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Spiriter, your fantasy sports assistant. I can help you with player stats, details, and recommend the best team. What would you like to know?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate response (this would connect to your AI backend)
    setTimeout(() => {
      let botResponse;

      // Demo responses based on query content
      if (input.toLowerCase().includes("best team")) {
        botResponse = {
          id: messages.length + 2,
          text: "Based on the latest data, here's the best team of 11 players I recommend:\n\n**Goalkeeper**:\n- Alisson Becker (Liverpool)\n\n**Defenders**:\n- Virgil van Dijk (Liverpool)\n- Ruben Dias (Manchester City)\n- Trent Alexander-Arnold (Liverpool)\n\n**Midfielders**:\n- Kevin De Bruyne (Manchester City)\n- Bruno Fernandes (Manchester United)\n- Rodri (Manchester City)\n- Martin Ødegaard (Arsenal)\n\n**Forwards**:\n- Mohamed Salah (Liverpool)\n- Erling Haaland (Manchester City)\n- Son Heung-min (Tottenham)\n\nThis recommendation is based on player performance and does not reveal individual point values.",
          sender: "bot",
        };
      } else if (
        input.toLowerCase().includes("salah") ||
        input.toLowerCase().includes("mohamed")
      ) {
        botResponse = {
          id: messages.length + 2,
          text: "Mohamed Salah is a forward who plays for Liverpool. He's 31 years old and from Egypt. This season, he has scored 19 goals with 10 assists in 2,340 minutes played.",
          sender: "bot",
        };
      } else if (
        input.toLowerCase().includes("point") ||
        input.toLowerCase().includes("score")
      ) {
        botResponse = {
          id: messages.length + 2,
          text: "I cannot provide information about player points or point values. Please ask about other player statistics or details.",
          sender: "bot",
        };
      } else if (
        input.toLowerCase().includes("contract") ||
        input.toLowerCase().includes("salary")
      ) {
        botResponse = {
          id: messages.length + 2,
          text: "I don't have enough knowledge to answer that question.",
          sender: "bot",
        };
      } else {
        botResponse = {
          id: messages.length + 2,
          text: "I'll help you find that information. Could you please be more specific about which player or team you're interested in?",
          sender: "bot",
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="bg-blue-500 text-white p-4">
        <h2 className="text-xl font-bold">Spiriter Assistant</h2>
        <p className="text-sm opacity-80">
          Ask about player stats, details, or get team recommendations
        </p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-3/4 mb-4 p-3 rounded-lg ${
              msg.sender === "user"
                ? "ml-auto bg-blue-500 text-white rounded-br-none"
                : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
            }`}
          >
            {msg.text.split("\n").map((line, i) => (
              <p key={i} className={i > 0 ? "mt-2" : ""}>
                {line}
              </p>
            ))}
          </div>
        ))}

        {isLoading && (
          <div className="mr-auto bg-gray-200 text-gray-800 rounded-lg rounded-bl-none max-w-3/4 mb-4 p-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about players or request the best team..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className={`px-4 py-2 rounded-r-lg font-medium ${
            isLoading || !input.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};
