import OpenAI from "openai";

const key = "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";
const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,

});


export const  createThreathread =  async () => {
  const messageThread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: "Hello, how are you?",
      },
    ],
  });
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
    // Handle possible errors
    const errorData = await response.json();
    console.error("Error:", errorData);
    throw new Error(errorData.error.message);
  }

  const data = await response.json();
  console.log("data", data);
  return data;
};

export const runMessage = async (id) => {
  await fetch(`https://api.openai.com/v1/threads/${id}/runs`, {
    method: "POST",
    headers: {
      "OpenAI-Beta": "assistants=v2",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({ 
      "assistant_id":"asst_y8DrMYKghk2n1p1FN0BLG8oA",
      "additional_instructions":null,
      "tool_choice":null
      
    }),

  })

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
    // Handle possible errors
    const errorData = await response.json();
    console.error("Error:", errorData);
    throw new Error(errorData.error.message);
  }

  const data = await response.json();
  console.log("data", data);
  return data;
};
