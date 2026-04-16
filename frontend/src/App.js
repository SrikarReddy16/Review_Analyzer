import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState("");
  const [summary, setSummary] = useState({});

  const analyze = async () => {
    const res = await axios.post("http://127.0.0.1:8000/api/analyze/", {
      text: review
    });
    setResult(res.data.sentiment);
    fetchSummary();
  };

  const fetchSummary = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/summary/");
    setSummary(res.data);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div style={{padding:20}}>
      <h1>Review Analyzer</h1>

      <textarea
        rows="4"
        cols="50"
        onChange={(e) => setReview(e.target.value)}
      />

      <br/><br/>
      <button onClick={analyze}>Analyze</button>

      <h2>Sentiment: {result}</h2>

      <h3>Summary</h3>
      <p>Positive: {summary.Positive}</p>
      <p>Negative: {summary.Negative}</p>
      <p>Neutral: {summary.Neutral}</p>
    </div>
  );
}

export default App;
