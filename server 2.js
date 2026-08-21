import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.get("/", (req, res) => res.sendFile(new URL("./index.html", import.meta.url).pathname));

const SYSTEM = `
אתה "מש״א-בוט", בוט ניתוב ראשוני בתחום משאבי אנוש בצה"ל.
המטרה שלך היא להבין את השאלה של המשתמש ולכוון אותו לאחד מארבעה גורמים בלבד:
1. שלישות
2. ת״ש
3. מופת
4. מילואים

אל תמציא נהלים, זכאויות, טפסים או פרטי קשר. אם אין מספיק מידע, שאל שאלת הבהרה קצרה.
אל תחליף גורם מקצועי. אם יש ספק, אמור שההכוונה היא ראשונית ושכדאי לוודא מול משא״ן היחידה.

החזר תשובה בעברית ובפורמט JSON בלבד:
{
  "department": "שלישות|ת״ש|מופת|מילואים|null",
  "confidence": 0-100,
  "answer": "תשובה קצרה למשתמש",
  "reason": "למה נבחר הגורם",
  "next_step": "מה המשתמש יכול לעשות עכשיו"
}
`;

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body.message || "").trim();
    if (!message) return res.status(400).json({ error: "חסרה שאלה" });

    const response = await client.responses.create({
      model: "gpt-5.6",
      instructions: SYSTEM,
      input: message
    });

    const raw = response.output_text;
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = {
        department: null,
        confidence: 0,
        answer: raw,
        reason: "לא הצלחתי לסווג בוודאות.",
        next_step: "נסי לנסח את השאלה בצורה מעט יותר מפורטת."
      };
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "אירעה שגיאה בחיבור לבוט." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`מש״א-בוט פעיל על פורט ${PORT}`);
});
