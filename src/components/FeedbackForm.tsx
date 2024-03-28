import { type FormEvent, useState } from "react";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.sentimentResult) {
      // console.log(data);
      setResponseMessage(data.sentimentResult);
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <div className="w-md">
        
        <label htmlFor="message">
            Enter your text
          <textarea id="message" name="message" autoComplete="off" />
        </label>
        <br />
        <button className="mt-2 rounded-md bg-gradient-to-r from-purple-300 to-purple-400 px-4 py-3 font-semibold text-white shadow-lg mb-4">Analyze</button>
        {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
      
    </form>
  );
}