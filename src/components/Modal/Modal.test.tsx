import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Test Modal',
    onClose: jest.fn(),
    onReject: jest.fn(),
    actionLabel: 'Confirm',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders title correctly', () => {
    render(<Modal {...defaultProps} title="My Modal Title" />);
    expect(screen.getByText('My Modal Title')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Modal {...defaultProps}>
        <p>Modal content here</p>
      </Modal>
    );
    expect(screen.getByText('Modal content here')).toBeInTheDocument();
  });

  it('renders action button with correct label', () => {
    render(<Modal {...defaultProps} actionLabel="Save Changes" />);
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
  });

  it('renders reject button with default label', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
  });

  it('renders reject button with custom label', () => {
    render(<Modal {...defaultProps} rejectLabel="Discard" />);
    expect(screen.getByRole('button', { name: 'Discard' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    const closeButton = screen.getByLabelText('Cerrar modal');
    
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onReject when reject button is clicked', () => {
    render(<Modal {...defaultProps} />);
    const rejectButton = screen.getByRole('button', { name: 'Cancelar' });
    
    fireEvent.click(rejectButton);
    expect(defaultProps.onReject).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking overlay', () => {
    const { container } = render(<Modal {...defaultProps} />);
    const overlay = container.querySelector('[class*="overlay"]');
    
    fireEvent.click(overlay!);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking inside modal', () => {
    const { container } = render(<Modal {...defaultProps} />);
    const modal = container.querySelector('[class*="modal"]');
    
    fireEvent.click(modal!);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('disables action button when isValid is false', () => {
    render(<Modal {...defaultProps} isValid={false} />);
    const actionButton = screen.getByRole('button', { name: 'Confirm' });
    expect(actionButton).toBeDisabled();
  });

  it('enables action button when isValid is true', () => {
    render(<Modal {...defaultProps} isValid={true} />);
    const actionButton = screen.getByRole('button', { name: 'Confirm' });
    expect(actionButton).not.toBeDisabled();
  });

  it('disables buttons when isLoading is true', () => {
    render(<Modal {...defaultProps} isLoading={true} />);
    const closeButton = screen.getByLabelText('Cerrar modal');
    const rejectButton = screen.getByRole('button', { name: 'Cancelar' });
    
    expect(closeButton).toBeDisabled();
    expect(rejectButton).toBeDisabled();
  });

  it('does not close on overlay click when isLoading', () => {
    const { container } = render(<Modal {...defaultProps} isLoading={true} />);
    const overlay = container.querySelector('[class*="overlay"]');
    
    fireEvent.click(overlay!);
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape key press', () => {
    render(<Modal {...defaultProps} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on Escape when isLoading', () => {
    render(<Modal {...defaultProps} isLoading={true} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });
});

