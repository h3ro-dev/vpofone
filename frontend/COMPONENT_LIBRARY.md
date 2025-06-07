# Component Library Documentation

This component library provides a comprehensive set of reusable React components built with TypeScript, featuring both form and layout components with modern styling and accessibility features.

## Features

- 🎨 Modern design with CSS variables for easy theming
- 📱 Responsive components with mobile-first approach
- ♿ Accessibility-focused with proper ARIA attributes
- 🔧 Fully typed with TypeScript
- 🎯 Consistent API across all components
- 🌈 Multiple size variants (xs, sm, md, lg, xl)
- 🎭 Support for different states (error, success, warning)

## Form Components

### Input
A versatile text input component with various states and features.

**Props:**
- `label`: Label text for the input
- `error`: Error message to display
- `helperText`: Helper text below the input
- `size`: Size variant (xs, sm, md, lg, xl)
- `status`: Status variant (default, error, success, warning)
- `fullWidth`: Makes the input take full width
- `leftIcon`/`rightIcon`: Icons to display inside the input
- All standard HTML input attributes

**Example:**
```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Invalid email address"
  required
/>
```

### Select
A dropdown select component with custom styling.

**Props:**
- `options`: Array of {value, label, disabled?} objects
- `placeholder`: Placeholder text
- `label`, `error`, `helperText`, `size`, `status`, `fullWidth`: Same as Input
- All standard HTML select attributes

**Example:**
```tsx
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ]}
  placeholder="Select a country"
/>
```

### Checkbox
A custom checkbox component with label support.

**Props:**
- `label`: Label text for the checkbox
- `size`: Size variant
- `indeterminate`: Shows indeterminate state
- `error`: Error state
- All standard HTML checkbox attributes

**Example:**
```tsx
<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

### Radio & RadioGroup
Radio buttons with a convenient RadioGroup wrapper.

**RadioGroup Props:**
- `options`: Array of radio options
- `value`: Selected value
- `onChange`: Change handler
- `direction`: horizontal or vertical layout
- `size`, `error`: Styling options

**Example:**
```tsx
<RadioGroup
  name="plan"
  value={selectedPlan}
  onChange={setSelectedPlan}
  options={[
    { value: 'basic', label: 'Basic Plan' },
    { value: 'pro', label: 'Pro Plan' }
  ]}
/>
```

### Textarea
Multi-line text input with auto-resize support.

**Props:**
- `minRows`/`maxRows`: Control height
- `resize`: Resize behavior (none, vertical, horizontal, both)
- All other props similar to Input component

**Example:**
```tsx
<Textarea
  label="Comments"
  placeholder="Share your thoughts..."
  minRows={3}
  maxRows={10}
/>
```

## Layout Components

### Container
A responsive container that centers content with max-width constraints.

**Props:**
- `maxWidth`: sm, md, lg, xl, or full
- `padding`: Add horizontal padding
- `centered`: Center the container
- `as`: HTML element to render as

**Example:**
```tsx
<Container maxWidth="lg" padding>
  {/* Your content */}
</Container>
```

### Grid & GridItem
A powerful CSS Grid-based layout system.

**Grid Props:**
- `columns`: Number or responsive object {sm, md, lg, xl}
- `gap`, `rowGap`, `columnGap`: Spacing between items
- `alignItems`, `justifyItems`: Alignment options

**GridItem Props:**
- `span`: How many columns to span
- `start`/`end`: Grid positioning

**Example:**
```tsx
<Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="md">
  <GridItem>Item 1</GridItem>
  <GridItem span={2}>Item 2 (spans 2 columns)</GridItem>
</Grid>
```

### Flex
Flexbox layout component for flexible arrangements.

**Props:**
- `direction`: row, column, row-reverse, column-reverse
- `wrap`: nowrap, wrap, wrap-reverse
- `justify`: start, end, center, between, around, evenly
- `align`: start, end, center, stretch, baseline
- `gap`: Spacing between items
- `inline`: Use inline-flex

**Example:**
```tsx
<Flex justify="between" align="center" gap="md">
  <div>Left</div>
  <div>Right</div>
</Flex>
```

### Card
A versatile card component with header, body, and footer sections.

**Card Props:**
- `padding`: Padding size
- `shadow`: Shadow intensity (none, sm, md, lg)
- `hover`: Enable hover effect
- `border`: Show border
- `clickable`: Make clickable
- `onClick`: Click handler

**Example:**
```tsx
<Card shadow="md" hover>
  <CardHeader>Title</CardHeader>
  <CardBody>Content goes here</CardBody>
  <CardFooter>Footer content</CardFooter>
</Card>
```

### Stack
Stacks elements vertically or horizontally with consistent spacing.

**Props:**
- `spacing`: Gap between items
- `direction`: vertical or horizontal
- `align`, `justify`: Alignment options
- `divider`: Show dividers between items
- `wrap`: Allow wrapping

**Example:**
```tsx
<Stack spacing="md" divider>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

## Design System

### Colors
The library uses CSS variables for consistent theming:
- Primary, Secondary, Success, Danger, Warning, Info colors
- Gray scale from 50 to 900
- Easy to customize by overriding CSS variables

### Spacing
Consistent spacing system: xs, sm, md, lg, xl, 2xl

### Typography
Font sizes from xs to 4xl with proper line heights

### Shadows & Borders
Pre-defined shadow levels and border radius options

## Usage

1. Import the components you need:
```tsx
import { Input, Card, Grid } from './components';
```

2. Import the global styles in your app:
```tsx
import './styles/global.css';
```

3. Use the components in your React app:
```tsx
<Card>
  <CardBody>
    <Input label="Name" placeholder="Enter your name" />
  </CardBody>
</Card>
```

## Customization

Override CSS variables to customize the theme:
```css
:root {
  --color-primary: #your-color;
  --spacing-md: 1.5rem;
  /* etc... */
}
```

## Accessibility

All components follow accessibility best practices:
- Proper ARIA labels and attributes
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Error announcements

## Browser Support

Modern browsers with CSS Grid and Flexbox support. The library uses CSS custom properties (variables) which require relatively recent browser versions.