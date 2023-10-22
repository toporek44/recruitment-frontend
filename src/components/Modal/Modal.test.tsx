import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockContent = jest.fn();
  const mockModalComponent = (
    <Modal
      content={mockContent}
      title="Test Modal"
      openButton={<button>Open Modal</button>}
    />
  );
  test('renders modal correctly when open', () => {
    const { getByText } = render(mockModalComponent);

    fireEvent.click(getByText('Open Modal'));
    expect(getByText('Test Modal')).toBeInTheDocument();
  });

  test('does not render modal when closed', () => {
    const { queryByText } = render(mockModalComponent);

    expect(queryByText('Test Modal')).not.toBeInTheDocument();
  });

  test('calls closeModal function when close button is clicked', () => {
    const { getByText } = render(mockModalComponent);

    fireEvent.click(getByText('Open Modal'));
    fireEvent.click(screen.getByTestId('close-icon'));
    expect(mockContent).toHaveBeenCalled();
  });
});
