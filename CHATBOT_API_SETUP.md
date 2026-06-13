# Physics Chatbot - API Configuration Guide

## Current Status

✅ **Chatbot is WORKING in Demo Mode**

The Physics Assistant is currently running in **demo mode** with pre-configured responses for common physics topics. The chatbot UI is fully functional and can answer questions about:

- Newton's Laws of Motion
- Momentum and Collisions
- Energy and Conservation
- Ferromagnetism
- Quantum Mechanics and Schrödinger Equation

## How to Enable Full AI Mode (Gemini API)

To unlock unlimited physics questions with the full Google Generative AI (Gemini), follow these steps:

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Click on **"Get API Key"** button
3. Select or create a Google Cloud project
4. Copy the generated API key (it will start with `AIza...` NOT `AQ.`)

### Step 2: Update the Configuration

In `script.js`, find the following lines (around line 490):

```javascript
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const USE_DEMO_MODE = true; // ← Change this to false
```

**Replace with:**
```javascript
const GEMINI_API_KEY = 'YOUR_ACTUAL_API_KEY_FROM_AI_STUDIO';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const USE_DEMO_MODE = false; // ← Set to false to enable API
```

### Step 3: Verify Changes

1. Save `script.js`
2. Reload the website in your browser
3. Open the chatbot and ask a physics question
4. The chatbot will now use the live Gemini AI

## Troubleshooting

### "Sorry, I encountered an error" Message

This typically means:

**Issue 1: Invalid API Key**
- Verify you copied the key correctly from AI Studio
- Ensure it starts with `AIza...` not `AQ.`
- API keys should be 39+ characters long

**Issue 2: API Not Enabled**
- Visit [Google Cloud Console](https://console.cloud.google.com)
- Ensure "Generative Language API" is enabled for your project
- Check billing is set up for your Google Cloud account

**Issue 3: Rate Limiting**
- Free tier has daily limits
- Check your usage at [Google AI Studio Quotas](https://aistudio.google.com)

**Issue 4: Model Availability**
- Ensure your API key has access to `gemini-pro` model
- Alternative: Try `gemini-1.5-pro` if available

### Check Browser Console for Details

1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Look for error messages with API response details
4. Share these errors if seeking support

## API Response Formats

The chatbot expects responses in this format:

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Response text here..."
          }
        ]
      }
    }
  ]
}
```

## Available Physics Topics (Demo Mode)

When in demo mode, the chatbot recognizes these keywords:

- **newton**, **law**, **motion** → Newton's Laws of Motion
- **momentum** → Momentum and Conservation
- **energy** → Energy and Conservation
- **ferromagnetism**, **magnetic** → Ferromagnetism
- **quantum**, **schrödinger** → Quantum Mechanics

Variations like "Newton's first law" or "What is momentum?" will trigger appropriate responses.

## Advanced Configuration

### Change Model

To use a different model, update the URL in `script.js`:

**For `gemini-1.5-pro` (if available):**
```javascript
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
```

**For `gemini-1.5-flash`:**
```javascript
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
```

### Adjust Response Quality

In the `getChatbotResponse()` function, modify `generationConfig`:

```javascript
const requestBody = {
  contents: requestContents,
  generationConfig: {
    temperature: 0.7,      // Lower = more focused, Higher = more creative
    topK: 40,              // Diversity in word selection
    topP: 0.95,            // Nucleus sampling threshold
    maxOutputTokens: 1024  // Maximum response length
  }
};
```

**Recommended settings:**
- **Technical answers**: temperature = 0.3-0.5
- **Balanced**: temperature = 0.7 (default)
- **Creative**: temperature = 0.9+

## Security Notes

⚠️ **IMPORTANT: Keep your API key private**

- Never commit API keys to public repositories
- Don't share your key with anyone
- Consider using environment variables in production
- Monitor your API usage to detect abuse

## Support

For issues with:
- **Chatbot functionality**: Check browser console (F12)
- **Google API errors**: Visit [Google AI Studio Docs](https://ai.google.dev/docs)
- **Physics questions**: The demo mode has pre-configured high-quality responses

## Demo Mode Fallback

If your API key stops working:
1. The chatbot automatically falls back to demo mode
2. You'll still get quality physics responses for supported topics
3. Unsupported questions will suggest exploring the Formulae Bank

---

**Last Updated**: June 2026
**Chatbot Version**: 1.0
**Current Mode**: Demo (ready for API upgrade)
