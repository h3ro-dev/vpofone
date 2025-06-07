import React, { useState } from 'react';
import {
  Container,
  Grid,
  GridItem,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  Checkbox,
  RadioGroup,
  Textarea,
  Flex
} from './components';
import './styles/global.css';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <Container maxWidth="xl" padding>
      <Stack spacing="xl">
        {/* Header */}
        <header>
          <h1>Component Library Demo</h1>
          <p>A comprehensive collection of form and layout components built with React and TypeScript.</p>
        </header>

        {/* Form Components Section */}
        <section>
          <h2>Form Components</h2>
          <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
            <GridItem>
              <Card>
                <CardHeader>Input Component</CardHeader>
                <CardBody>
                  <Stack spacing="md">
                    <Input
                      label="Default Input"
                      placeholder="Enter text..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Input
                      label="With Helper Text"
                      helperText="This is helper text"
                      placeholder="Type something..."
                    />
                    <Input
                      label="Error State"
                      error="This field is required"
                      placeholder="Required field"
                    />
                    <Input
                      label="Disabled"
                      disabled
                      placeholder="Disabled input"
                    />
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card>
                <CardHeader>Select Component</CardHeader>
                <CardBody>
                  <Stack spacing="md">
                    <Select
                      label="Choose an option"
                      placeholder="Select..."
                      options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' }
                      ]}
                      value={selectValue}
                      onChange={(e) => setSelectValue(e.target.value)}
                    />
                    <Select
                      label="With Error"
                      error="Please select an option"
                      options={[
                        { value: 'a', label: 'Choice A' },
                        { value: 'b', label: 'Choice B' }
                      ]}
                    />
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card>
                <CardHeader>Checkbox Component</CardHeader>
                <CardBody>
                  <Stack spacing="md">
                    <Checkbox
                      label="Default Checkbox"
                      checked={checkboxValue}
                      onChange={(e) => setCheckboxValue(e.target.checked)}
                    />
                    <Checkbox label="Checked" checked />
                    <Checkbox label="Disabled" disabled />
                    <Checkbox label="Error State" error />
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card>
                <CardHeader>Radio Component</CardHeader>
                <CardBody>
                  <RadioGroup
                    name="demo-radio"
                    value={radioValue}
                    onChange={setRadioValue}
                    options={[
                      { value: 'option1', label: 'Option 1' },
                      { value: 'option2', label: 'Option 2' },
                      { value: 'option3', label: 'Option 3' }
                    ]}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card>
                <CardHeader>Textarea Component</CardHeader>
                <CardBody>
                  <Textarea
                    label="Message"
                    placeholder="Enter your message..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    helperText="Maximum 500 characters"
                  />
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </section>

        {/* Layout Components Section */}
        <section>
          <h2>Layout Components</h2>
          
          <Stack spacing="lg">
            <Card>
              <CardHeader>Grid Layout</CardHeader>
              <CardBody>
                <Grid columns={4} gap="md">
                  <GridItem span={1}>
                    <div className="demo-box">1</div>
                  </GridItem>
                  <GridItem span={2}>
                    <div className="demo-box">Span 2</div>
                  </GridItem>
                  <GridItem span={1}>
                    <div className="demo-box">1</div>
                  </GridItem>
                  <GridItem span={4}>
                    <div className="demo-box">Full Width</div>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>Flex Layout</CardHeader>
              <CardBody>
                <Stack spacing="md">
                  <Flex gap="md" justify="between">
                    <div className="demo-box">Start</div>
                    <div className="demo-box">End</div>
                  </Flex>
                  <Flex gap="sm" justify="center" align="center">
                    <div className="demo-box small">1</div>
                    <div className="demo-box medium">2</div>
                    <div className="demo-box small">3</div>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>Stack Layout</CardHeader>
              <CardBody>
                <Stack spacing="md" divider>
                  <div>Item 1 with divider</div>
                  <div>Item 2 with divider</div>
                  <div>Item 3 with divider</div>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </section>

        {/* Size Variants */}
        <section>
          <h2>Size Variants</h2>
          <Card>
            <CardBody>
              <Stack spacing="lg">
                <Stack spacing="md" direction="horizontal" align="end">
                  <Input size="xs" placeholder="Extra Small" />
                  <Input size="sm" placeholder="Small" />
                  <Input size="md" placeholder="Medium" />
                  <Input size="lg" placeholder="Large" />
                  <Input size="xl" placeholder="Extra Large" />
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </section>
      </Stack>
    </Container>
  );
}

export default App;