# WildMed

An open-source wilderness medicine field reference app for WFR-certified individuals.

## Features

- **Offline-first**: All content is bundled into the app - no internet required
- **Cross-platform**: iOS, Android, and web from a single codebase
- **Open source content**: Medical protocols stored as markdown files for easy contribution
- **Quick reference**: Fast access to critical protocols when you need them most

## Tech Stack

- [Expo](https://expo.dev) - React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- iOS Simulator (Mac only) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wildmed.git
cd wildmed

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on specific platform
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Web browser
```

## Project Structure

```
wildmed/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── protocol/          # Protocol detail views
│   └── category/          # Category listing views
├── content/               # Markdown protocol files
│   ├── assessment/        # Patient assessment protocols
│   ├── medical/           # Medical emergency protocols
│   ├── trauma/            # Trauma protocols
│   ├── environmental/     # Environmental emergency protocols
│   └── evacuation/        # Evacuation criteria
├── src/
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand state stores
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript definitions
└── scripts/               # Build scripts
```

## Contributing Content

The medical protocol content lives in the `content/` directory as markdown files. Each protocol file includes:

1. **YAML frontmatter** with metadata (title, category, severity, etc.)
2. **Markdown content** with the protocol information

### Protocol Template

```markdown
---
title: "Protocol Name"
slug: "protocol-slug"
category: "medical"
tags: ["tag1", "tag2"]
severity: "critical"  # critical, urgent, or standard
summary: "Brief description"
evacuate: "immediate" # immediate, urgent, delayed, field-treatable
quickRef: true
order: 1
---

# Protocol Name

## Recognition
...

## Treatment Protocol
...

## Evacuation Criteria
...
```

### Contributing Steps

1. Fork the repository
2. Create or edit markdown files in `content/`
3. Submit a pull request

## Disclaimer

This app is for **educational reference only**. Always follow your training and local protocols. This app is not a substitute for proper wilderness medicine training and certification.

## License

MIT License - see [LICENSE](LICENSE) for details.
