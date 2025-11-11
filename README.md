# Samrakshni - Women's Safety SOS Application

Samrakshni is a comprehensive personal safety application designed to provide a quick and effective way for users to signal for help in emergencies. It's a proactive safety companion that leverages community and technology to create a safer environment.



## Key Features

- **Instant SOS Panic Button**: A prominent SOS button on the home screen that, when activated, simulates sending the user's live location to emergency contacts, local authorities, and nearby community members.
- **Interactive Safety Map**: A map interface that displays reported incidents (e.g., harassment, theft) as red markers and verified safe spots (e.g., police stations, hospitals) as green markers.
- **Community Watch**: A section to foster community engagement, featuring tabs for recent incident reports and a list of trusted, verified community contributors.
- **Safety Tips**: A collaborative space where users can read and share practical safety tips, helping to build a collective knowledge base.
- **Emergency Contacts**: A settings page where users can manage a list of personal contacts who will be notified during an emergency.

## Tech Stack

This project is built with a modern, performant, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI/Generative Features**: [Genkit](https://firebase.google.com/docs/genkit)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (including Firestore for data storage)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

To run this project locally, you will need to set up your environment variables.

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Set up environment variables**:
    Create a `.env.local` file in the root of your project and add your Google Maps API key:
    ```
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
