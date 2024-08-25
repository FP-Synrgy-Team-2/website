import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonSecondary } from '@/components';

jest.mock('@/constants', () => ({
  VITE_API_URL: 'https://jangkau1-65einymbia-et.a.run.app',
}));

describe('ButtonSecondary Component', () => {
  test('renders correctly with children', () => {
    render(<ButtonSecondary className="button">Click Me</ButtonSecondary>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies additional class names correctly', () => {
    render(<ButtonSecondary className="extra-class">Click Me</ButtonSecondary>);
    expect(screen.getByText('Click Me')).toHaveClass('extra-class');
  });

  test('applies correct default styles', () => {
    render(<ButtonSecondary className="button">Click Me</ButtonSecondary>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('border-2');
    expect(button).toHaveClass('border-primary-dark-blue');
    expect(button).toHaveClass('text-primary-dark-blue');
    expect(button).toHaveClass('hover:bg-gray-300');
    expect(button).toHaveClass('focus:bg-gray-300');
    expect(button).toHaveClass('active:bg-gray-300');
  });

  test('forwards additional props correctly', () => {
    const handleClick = jest.fn();
    render(
      <ButtonSecondary className="button" onClick={handleClick}>
        Click Me
      </ButtonSecondary>
    );
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
