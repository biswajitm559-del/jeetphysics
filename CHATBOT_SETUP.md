# Physics Chatbot - Setup & Documentation

## Overview
Your website now features an intelligent **Physics Chatbot** powered by **Google Gemini AI**. This chatbot helps students understand physics concepts, find website resources, and get study guidance.

## Features

### What the Chatbot Can Do:
- ✅ **Answer Physics Questions** - Explain laws, principles, formulae, and concepts
- ✅ **Provide Formulae** - Display mathematical expressions with LaTeX support
- ✅ **Guide Website Navigation** - Help students find resources and materials
- ✅ **Study Support** - Offer problem-solving strategies and learning tips
- ✅ **Curriculum Help** - Explain the 6-semester BSc Physics Honours structure

### Topics Covered:
- Classical Mechanics & Lagrangian/Hamiltonian formulations
- Quantum Mechanics & Schrödinger equation
- Electromagnetism & Maxwell's equations
- Thermodynamics & Statistical Mechanics
- Waves, Optics & Laser Physics
- Nuclear & Particle Physics
- Solid State Physics
- Atomic & Molecular Physics
- Mathematical Physics
- And much more!

## How It Works

### Architecture:
1. **Frontend**: React-like vanilla JS component with real-time messaging
2. **Backend**: Google Gemini 1.5 Pro AI API
3. **System Prompt**: Specialized prompt instructing the AI to act as a physics expert
4. **Chat History**: Maintains context for better responses (last 20 messages)

### User Interaction:
1. Click the **floating robot icon** (bottom-right) to open the chatbot
2. Type your physics question or website-related query
3. The AI responds with detailed explanations
4. Close the chatbot anytime with the ✕ button

## Technical Details

### Files Modified:
- `index.html` - Added chatbot HTML structure
- `style.css` - Added comprehensive chatbot styling
- `script.js` - Added Gemini API integration and chatbot logic

### API Configuration:
- **API**: Google Generative AI (Gemini Pro)
- **Model**: `gemini-pro`
- **API Key**: Configured in `script.js` (line with GEMINI_API_KEY)
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`

### Features:
- Real-time typing indicator animation
- Markdown formatting support
- Chat history management (prevents token overflow)
- Responsive design (works on mobile & desktop)
- Smooth animations and transitions
- Error handling with user-friendly messages

## Customization

### Change the System Prompt:
Edit the `PHYSICS_SYSTEM_PROMPT` constant in `script.js` to modify chatbot behavior:
```javascript
const PHYSICS_SYSTEM_PROMPT = `Your custom instructions here...`;
```

### Modify AI Parameters:
In the `getChatbotResponse()` function:
```javascript
generationConfig: {
  temperature: 0.7,      // Lower = more focused, Higher = more creative
  topK: 40,              // Diversity parameter
  topP: 0.95,            // Nucleus sampling
  maxOutputTokens: 1024, // Response length limit
}
```

### Style Customization:
The chatbot uses CSS variables defined in `style.css`:
- `.chatbot-toggle` - Floating button
- `.chatbot-container` - Main chat window
- `.chatbot-message` - Message styling
- Modify colors, sizes, and animations as needed

## Integration Notes

### Important:
1. **API Key Security**: The API key is embedded in the client-side code. For production, use a backend proxy.
2. **Rate Limiting**: Google Gemini API has usage quotas. Monitor your usage.
3. **Offline Mode**: The chatbot requires internet connection to work (uses cloud API).
4. **Data Privacy**: Chat history is stored only in browser memory and cleared on refresh.

## Future Enhancements

Possible improvements:
- [ ] Export chat history as PDF
- [ ] Speech input/output integration
- [ ] Multi-language support
- [ ] LaTeX equation rendering in responses
- [ ] Backend proxy for API key security
- [ ] Database storage of chat history
- [ ] Analytics on common questions
- [ ] Integration with MongoDB for user preferences

## Troubleshooting

### Chatbot not responding:
1. Check internet connection
2. Verify API key is correct
3. Check browser console for errors (F12 → Console)
4. Ensure API quotas haven't been exceeded

### Slow responses:
1. Normal during peak usage
2. Check network speed
3. Reduce `maxOutputTokens` if needed

### Display issues:
1. Try refreshing the page
2. Clear browser cache
3. Check CSS is properly loaded

## Support
For issues or improvements, contact the development team.

---

**Last Updated**: June 13, 2026
**API**: Google Gemini AI
**Status**: ✅ Active & Operational
