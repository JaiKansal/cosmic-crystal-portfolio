
-----

# Cosmic Crystal Portfolio ✨

A stunning 3D interactive portfolio website featuring a cosmic crystal theme with space elements. Built with Next.js, React Three Fiber, and Framer Motion for an immersive desktop experience, with a responsive 2D fallback for mobile devices.

🌟 **Live Demo:** [View Portfolio](https://jaikansalportfolio.vercel.app)

![Portfolio Preview](https://via.placeholder.com/800x400/0f172a/06b6d4?text=3D+Crystal+Portfolio)

## Features

  * **3D Interactive Scene:** A full-screen 3D environment using React Three Fiber.
  * **Camera-Based Navigation:** Click on 3D nodes to fly the camera to different sections.
  * **Custom 3D Models:** Loads an optimized `.glb` model for scene navigation.
  * **Post-Processing Effects:** Includes Bloom and an "infinite" starfield for a polished, cinematic feel.
  * **Fully Responsive:** Uses a custom hook to detect mobile devices and serves a lightweight, fast, 2D-only version.
  * **Animated UI:** Uses Framer Motion to animate 2D cards (Experience, Projects, etc.) as they appear.
  * **Working Contact Form:** Pre-wired to use Formspree for easy setup.

## Tech Stack

  * **Framework:** [Next.js](https://nextjs.org/) (App Router)
  * **Language:** [TypeScript](https://www.typescriptlang.org/)
  * **3D:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [React Three Drei](https://github.com/pmndrs/drei)
  * **Animation:** [Framer Motion](https://www.framer.com/motion/)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **3D Post-Processing:** [@react-three/postprocessing](https://github.com/pmndrs/postprocessing)

-----

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### 1\. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### 2\. Installation

1.  Clone or download this repository.
2.  Open your terminal, `cd` into the project directory, and install the dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

-----

## 🎨 Customization Guide

This is the most important section. Follow these steps to replace all the placeholder content with your own.

### 1\. Personal Info & Resume

This is the quickest way to make the site your own.

  * **Resume:** Replace the `Resume.pdf` file in the `/public` folder with your own PDF.
  * **Name & Title:** You need to change your name in two places:
      * **3D (Desktop):** `src/app/page.tsx` (in the `<header>`)
      * **2D (Mobile):** `src/app/components/Portfolio2D.tsx`
  * **Social Links (LinkedIn, GitHub):** You also need to change these in two places:
      * **3D (Desktop):** `src/app/page.tsx` (in the `<footer>`)
      * **2D (Mobile):** `src/app/components/Portfolio2D.tsx` (in the `<footer>`)

### 2\. Site Content (Experience, Projects, Skills)

All of your professional data is managed in one central location for easy editing.

Go to the `src/app/components/data/` folder:

  * **`experienceData.ts`**: Edit this array to add your work history.
  * **`projectData.ts`**: Edit this array to add your projects.
  * **`skillsData.ts`**: Edit this object to list your technical skills.

The 3D and 2D sites *both* read from these files, so you only have to update your info once\!

### 3\. Contact Form

The contact form is set up to use [Formspree](https://formspree.io) (a free form-handling service).

1.  Sign up for a free Formspree account.
2.  Create a new form and get your unique **Endpoint URL**.
3.  Open `src/app/components/Contact.tsx`.
4.  Find this line:
    ```tsx
    <form 
      action="https://formspree.io/f/YOUR_UNIQUE_ID" // <-- PASTE YOUR URL HERE
      method="POST"
      ...
    >
    ```
5.  Replace `https://formspree.io/f/YOUR_UNIQUE_ID` with your own URL.
6.  That's it\! Your form is now live and will send submissions to your email.

### 4\. Replacing the 3D Crystal Model

This is the most advanced customization. The current 3D crystal model has a **NonCommercial license**, so you **must** replace it if you plan to sell this template.

Here is the process:

1.  **Find a Model:** Go to [Sketchfab](https://sketchfab.com/search?features=downloadable&type=models) or a similar site. Search for a model with a **`CC0` (Public Domain)** or **`CC-BY` (Commercial-OK)** license. Download it as a **`.glb`** file.
2.  **Place the Model:** Put your new `.glb` file (e.g., `new_model.glb`) into the `/public` folder.
3.  **Run the Converter:** In your terminal, run the `gltfjsx` tool to create a new component. (Make sure to delete the old `crystal-transformed.glb` and `CrystalModel.tsx` files first).
    ```bash
    npx gltfjsx public/new_model.glb -o src/app/components/NewModel.tsx -t -s -T
    ```
4.  **Edit the New Component:** Open the new `src/app/components/NewModel.tsx`. You will need to edit it to add our custom props (rotation, text, visibility, etc.).
      * You'll need to import `useFrame`, `Text`, and `useRef`.
      * You'll need to add the `CrystalModelProps` (you can copy this from the old `CrystalModel.tsx`).
      * You'll need to wrap the `<mesh>` in a `<group>` and apply the props (`position`, `visible`, `onClick`, etc.).
      * You must add the `<Text>` component back in.
      * This step requires some React Three Fiber knowledge.
5.  **Update `Scene3D.tsx`:**
      * Import your `NewModel` at the top: `import { NewModel } from './NewModel'`.
      * Replace all instances of `<CrystalModel ... />` with `<NewModel ... />`.

-----

## 📜 License & Attribution

The code for this template is licensed under the [MIT License](LICENSE.txt). (You can create this file and add your own license).

### Asset Attribution

The 3D assets used in this project have their own licenses. The current model **CANNOT** be used for commercial purposes.

  * **Model:** ["Crystal stone (rock)"](https://sketchfab.com/3d-models/crystal-stone-rock-1ad829e2f464446fa4945562ab611255) by [GenEugene](https://sketchfab.com/geneugene).
  * **License:** [CC BY-NC 4.0](http://creativecommons.org/licenses/by-nc/4.0/)

This attribution is included in the site footer as required by the license.