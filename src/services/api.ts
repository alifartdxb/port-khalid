export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface InquiryData {
  company?: string;
  commodity?: string;
  temperature?: string;
  volume?: string;
  summary?: string;
}

export const chatWithGemini = async (messages: Message[]) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!response.ok) throw new Error("Connection error");
  return response.json();
};

export const notifyLogistics = async (data: InquiryData) => {
  const response = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
