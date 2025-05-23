# AI Job Impact Visualizer

## Concept

The AI Job Impact Visualizer helps professionals understand how artificial intelligence can already and will increasingly handle most of their work tasks within the next decade. The tool breaks down roles into their most time-consuming tasks and shows:

- **AI vs. Human Performance**: At a glance, see which AI models match or exceed expert-level benchmarks across critical capabilities, from language understanding and data analysis to code generation and strategic planning.

- **Task Automation Risk**: For your chosen role, view the percentage of each core task AI can handle today and projected timeframes for deeper automation.

- **Acceleration Timeline**: Track the anticipated evolution of AI capabilities and adoption pressures from 2024 through 2045.

- **Reality Check**: Compare global job displacement and creation forecasts to gauge net impact on employment.

## User Journey

- **Landing & Introduction**: Users arrive at the homepage and see a compelling headline about AI's potential to automate work tasks.

- **Explore AI vs. Human Performance**: A responsive bar chart compares AI and human benchmark scores with a clear legend.

- **Select Your Role**: Users choose the job title that best matches their profession.

- **Key Task Breakdown**: The app reveals the four core tasks for that role and the percentage AI can automate for each, making the data immediately actionable.

- **Timeline Projection**: An interactive timeline animates projected AI milestones, showing how automation potential grows over time.

- **Reality Check**: A final summary presents net job impact forecasts and suggests upskilling paths in AI safety, policy, and adaptation strategies.

## Live Demo

Check out the deployed site here: [AI Job Impact Visualizer](https://aijobimpact.netlify.app/)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/afiorg9000/job-impact-visualizer.git
cd job-impact-visualizer
npm install
```

## Development

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:8080` to view the app.

## Production

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server.
- `npm run build` - Build for production.
- `npm run build:dev` - Build in development mode.
- `npm run lint` - Lint code with ESLint.
- `npm run preview` - Preview production build locally.

## Configuration

- **Vite**: Bundler and dev server configured in `vite.config.ts`.
- **Tailwind CSS**: Utility-first styling configured in `tailwind.config.js`.
- **Environment Variables**: Place custom vars in `.env`.

## Dependencies

Key libraries used:

- React & React DOM
- Vite for fast bundling
- TypeScript for type safety
- Radix UI for accessible components
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide-react for icons
- @tanstack/react-query for data fetching/caching
- Zod for schema validation

See `package.json` for the complete list.

## License

This project is licensed under the MIT License.

Built with Vite, React, and Tailwind by the AI Job Impact team.
