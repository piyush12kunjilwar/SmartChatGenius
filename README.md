## 🤖 Overview

An advanced AI-powered chatbot platform featuring immersive 3D visuals, dynamic animations, and intelligent conversation capabilities. This modern web application combines cutting-edge frontend technologies with natural language processing to deliver a premium user experience.

## ✨ Key Features

- **Advanced 3D User Interface**
  - Interactive animated robot character that responds to conversation
  - Immersive 3D background with dynamic elements and lighting effects
  - 3D-enhanced message bubbles with animations and particle effects
  - Responsive design that works on desktop and mobile devices

- **AI-Powered Conversations**
  - Natural language understanding using OpenAI's powerful models
  - Conversation memory that maintains context across messages
  - Support for complex queries and detailed responses
  - Mock mode for development and testing without API keys

- **Modern Technical Architecture**
  - Full-stack JavaScript/TypeScript application
  - React frontend with Vite for blazing-fast development
  - Node.js/Express backend for API handling
  - In-memory storage with optional database integration

## 🔧 Technologies Used

### Frontend
- **React + TypeScript**: For component-based UI development
- **Three.js**: For creating and rendering 3D elements
- **Framer Motion**: For advanced animations and transitions
- **TailwindCSS + shadcn/ui**: For styling and UI components
- **TanStack Query**: For efficient data fetching and caching

### Backend
- **Node.js + Express**: For API routing and server implementation
- **OpenAI API**: For natural language processing capabilities
- **Drizzle ORM**: For type-safe database operations
- **Zod**: For schema validation and type safety

## 📋 Prerequisites

- Node.js 18+ 
- An OpenAI API key for the chatbot functionality
- Modern web browser that supports WebGL (for 3D rendering)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-chatbot.git
   cd ai-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## 💬 Using the Chatbot

1. When you first open the application, you'll see the animated 3D interface with the robot character in the header.
2. Type your message in the input field at the bottom of the screen and press Enter or click the send button.
3. The AI will process your message and respond with an appropriate answer.
4. The 3D robot character will animate when the AI is processing your request.
5. Your conversation history is preserved within the session.
6. You can start a new conversation by clicking the "New Chat" button.

## 🏗️ Project Structure

```
├── client                  # Frontend React application
│   ├── src
│   │   ├── components      # UI components
│   │   │   ├── AnimatedBackground.tsx
│   │   │   ├── AnimatedHeader.tsx
│   │   │   ├── AnimatedMessageBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── RobotModel.tsx
│   │   │   └── ui/         # shadcn UI components
│   │   ├── hooks           # Custom React hooks
│   │   ├── lib             # Utility functions
│   │   └── pages           # Page components
│   └── index.html          # HTML entry point
│
├── server                  # Backend Node.js/Express server
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data storage implementation
│   ├── openai.ts           # OpenAI API integration
│   └── vite.ts             # Vite development server integration
│
├── shared                  # Shared code between frontend and backend
│   └── schema.ts           # Data models and validation schemas
│
├── public                  # Static assets
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## 🎮 3D Features

### Robot Model
The centerpiece of the UI is a detailed 3D robot character rendered using Three.js. The robot features:
- Advanced materials with metallic and glowing surfaces
- Complex animation system that responds to chat interaction
- Dynamic lighting effects and particle systems
- Hierarchical structure with multiple animated parts

### Immersive Background
The 3D background creates depth and atmosphere with:
- Starfield with varied colors and sizes
- Animated geometric shapes with wireframe and translucent surfaces
- Energy beam effects that traverse the space
- Subtle camera movement for parallax effect
- Fog and lighting for enhanced depth perception

### Message Bubbles
Messages receive 3D treatment with:
- Perspective transforms that create a floating effect
- Dynamic shadows and lighting
- Particle effects and energy beams for AI responses
- Shimmer and glow effects

## 🔄 Mock Mode

When no OpenAI API key is provided, the system automatically operates in mock mode, which:
- Generates placeholder responses to demonstrate UI functionality
- Shows a notification banner to inform users
- Allows testing of the interface without API costs
- Provides consistent responses for development purposes

## 🛠️ Development Notes

### Custom Components
All 3D components are custom-built using Three.js and integrated with React through reference hooks. The animation systems use requestAnimationFrame for smooth performance.

### Performance Considerations
3D rendering is resource-intensive. The application implements several optimizations:
- Efficient material reuse
- Limited polygon counts
- Conditional animations based on viewport visibility
- Throttled render updates

### Mobile Compatibility
The 3D effects adapt to mobile devices by:
- Reducing particle counts and effect complexity
- Adjusting camera distance and field of view
- Using device orientation for subtle parallax when available
- Simplifying animations to conserve battery

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Three.js community for 3D rendering capabilities
- OpenAI for providing the language model API
- Framer Motion for animation utilities
- shadcn/ui for accessible component designs
