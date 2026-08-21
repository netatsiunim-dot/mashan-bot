# מש״א-בוט AI

## הפעלה
1. התקיני Node.js.
2. פתחי טרמינל בתיקייה והריצי: `npm install`
3. העתיקי `.env.example` ל-`.env`.
4. הכניסי את מפתח ה-API שלך אחרי `OPENAI_API_KEY=`.
5. הריצי: `npm start`
6. פתחי בדפדפן: `http://localhost:3000`

המפתח נשמר בצד השרת ולא בתוך קובץ ה-HTML.

## פריסה ב-Render
- העלי את התיקייה ל-GitHub.
- ב-Render בחרי New > Web Service וחברי את המאגר.
- Build Command: `npm install`
- Start Command: `npm start`
- הוסיפי Environment Variable בשם `OPENAI_API_KEY`.
- אל תעלי `.env` או מפתח API ל-GitHub.
