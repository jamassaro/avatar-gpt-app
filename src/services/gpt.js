import OpenAI from "openai";

const apiKey = localStorage.getItem('key')

console.log('apiKey', apiKey)

const key = apiKey;
const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,

});


export const  createThreathread =  async () => {
  const messageThread = await openai.beta.threads.create()
  return messageThread;
};

export const sendMessages = async (question, id) => {
  const response = await fetch(`https://api.openai.com/v1/threads/${id}/messages`, {
    method: "POST",
    params: {
      model: "gpt-4o-mini",
    },
    headers: {
      "OpenAI-Beta": "assistants=v2",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({
      role: "user",
      content: [
        {
         type: "text", 
          text: question,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error:", errorData);
    throw new Error(errorData.error.message);
  }

  const data = await response.json();
  return data;
};

export const runMessage = async (id, assistantId) => {
 const response = await fetch(`https://api.openai.com/v1/threads/${id}/runs`, {
    method: "POST",
    headers: {
      "OpenAI-Beta": "assistants=v2",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({ 
      "assistant_id": assistantId,
      "additional_instructions":null,
      "tool_choice":null
      
    }),

  })


  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error:", errorData);
    throw new Error(errorData.error.message);
  }

  const data = await response.json();
  return data;
}


export const getRun = async (threadId, runId) => {
  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
    method: "GET",
    headers: {
      "OpenAI-Beta": "assistants=v2",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  const data = await response.json();
  return data;
} 

export const getMessages = async (id) => {
  const response = await fetch(`https://api.openai.com/v1/threads/${id}/messages`, {
    method: "GET",
    headers: {
      "OpenAI-Beta": "assistants=v2",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message);
  }

  const data = await response.json();
  return data;
};
