import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies card class', () => {
    render(
      <Card>
        <p>Content</p>
      </Card>
    );
    const card = screen.getByText('Content').parentElement;
    expect(card?.className).toContain('card');
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-card">
        <p>Content</p>
      </Card>
    );
    const card = screen.getByText('Content').parentElement;
    expect(card?.className).toContain('custom-card');
  });

  it('renders multiple children', () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
        <button>Action</button>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});

