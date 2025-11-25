import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders with children when no label provided', () => {
    render(<Button>Child content</Button>);
    expect(screen.getByRole('button', { name: 'Child content' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} disabled />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies primary variant by default', () => {
    render(<Button label="Primary" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('primary');
  });

  it('applies secondary variant when specified', () => {
    render(<Button label="Secondary" variant="SECONDARY" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('secondary');
  });

  it('applies fullWidth class by default', () => {
    render(<Button label="Full Width" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('fullWidth');
  });

  it('does not apply fullWidth class when false', () => {
    render(<Button label="Not Full Width" fullWidth={false} />);
    const button = screen.getByRole('button');
    expect(button.className).not.toContain('fullWidth');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button label="Custom" className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });
});

