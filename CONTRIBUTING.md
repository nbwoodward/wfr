# Contributing to WildMed

Thank you for your interest in contributing to WildMed! This guide will help you get started.

## Types of Contributions

### 1. Medical Content (Most Needed!)

The primary way to contribute is by adding or improving medical protocol content. All protocols are stored as Markdown files in the `content/` directory.

**Requirements for content contributors:**
- Wilderness medicine training/certification (WFR, WEMT, or equivalent)
- Familiarity with current wilderness medicine guidelines
- Ability to write clear, concise medical instructions

### 2. Code Contributions

We welcome improvements to the app functionality, UI/UX, and infrastructure.

### 3. Bug Reports & Feature Requests

Open an issue on GitHub to report bugs or suggest new features.

## Content Contribution Guide

### File Structure

Each protocol is a Markdown file with YAML frontmatter:

```
content/
├── assessment/         # Patient assessment (ABCDE, SAMPLE, etc.)
├── medical/           # Medical emergencies
├── trauma/            # Trauma care
├── environmental/     # Environmental emergencies
└── evacuation/        # Evacuation criteria
```

### Protocol Template

```markdown
---
title: "Protocol Title"
slug: "protocol-slug"           # URL-friendly, lowercase, hyphens
category: "medical"             # assessment, medical, trauma, environmental, evacuation
tags: ["keyword1", "keyword2"]  # Search keywords
severity: "critical"            # critical, urgent, or standard
lastUpdated: "2025-01-15"
version: "1.0"
quickRef: true                  # Show in quick reference tab
order: 1                        # Sort order within category
summary: "One-line description"
evacuate: "immediate"           # immediate, urgent, delayed, field-treatable, varies
---

# Protocol Title

Brief introduction to the condition/procedure.

## Recognition

Signs and symptoms to identify the condition.

## Treatment Protocol

Step-by-step treatment instructions.

## Evacuation Criteria

When and how urgently to evacuate.

## Key Points

Important takeaways and reminders.

## References

- Source citations
```

### Writing Guidelines

1. **Be Concise**: Protocols should be scannable in emergency situations
2. **Use Lists**: Bullet points and numbered lists are easier to follow
3. **Highlight Critical Info**: Use bold for critical warnings and dosages
4. **Include Context**: Explain the "why" when relevant
5. **Field-Oriented**: Focus on what's practical in wilderness settings

### Special Markdown Blocks

Use these custom blocks for enhanced formatting:

```markdown
:::warning
Critical safety information that must not be ignored.
:::

:::checklist
- [ ] Step one
- [ ] Step two
- [ ] Step three
:::

:::dosage
| Patient | Dose | Route |
|---------|------|-------|
| Adult   | 0.3mg| IM    |
:::

:::evacuation[immediate]
Evacuation criteria and transport considerations.
:::
```

### Severity Levels

- **critical**: Life-threatening, time-sensitive conditions (red)
- **urgent**: Serious conditions requiring prompt attention (orange)
- **standard**: Non-emergent reference information (blue)

### Evacuation Levels

- **immediate**: Life-threatening, evacuate now
- **urgent**: Serious, evacuate within hours
- **delayed**: Can wait, evacuate when practical
- **field-treatable**: Can be managed entirely in the field
- **varies**: Depends on specific circumstances

## Code Contribution Guide

### Development Setup

```bash
# Clone and install
git clone https://github.com/yourusername/wildmed.git
cd wildmed
npm install

# Start development server
npm start
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test on multiple platforms if possible
5. Commit with clear messages
6. Push to your fork
7. Open a pull request

### Code Style

- Use TypeScript for all new code
- Follow existing patterns in the codebase
- Use NativeWind (Tailwind) for styling
- Keep components small and focused

## Review Process

All contributions go through review:

- **Content**: Reviewed for medical accuracy and clarity
- **Code**: Reviewed for functionality, style, and best practices

## Questions?

Open an issue or reach out to the maintainers.

## Medical Disclaimer

Contributors should note that WildMed is for educational reference only. Content should:

- Be based on established wilderness medicine guidelines
- Include appropriate references
- Not replace professional medical training
- Defer to local protocols when applicable
