import { render, screen, fireEvent } from '@testing-library/react';
import InputText from './InputText';

describe('InputText', () => {
  it('renders with label', () => {
    render(<InputText label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders input element', () => {
    render(<InputText label="Email" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('accepts user input', () => {
    render(<InputText label="Name" />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input).toHaveValue('John Doe');
  });

  it('displays error message when error prop is provided', () => {
    render(<InputText label="Email" error="Email is required" />);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('applies error class when error prop is provided', () => {
    render(<InputText label="Email" error="Invalid email" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('inputError');
  });

  it('displays info message when info prop is provided', () => {
    render(<InputText label="Password" info="Minimum 8 characters" />);
    expect(screen.getByText('Minimum 8 characters')).toBeInTheDocument();
  });

  it('shows required indicator when required prop is true', () => {
    render(<InputText label="Required Field" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies placeholder', () => {
    render(<InputText label="Search" placeholder="Type to search..." />);
    expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<InputText label="Disabled" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<InputText label="Custom" className="my-input" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('my-input');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<InputText label="With Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

