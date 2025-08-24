import { vi, expect, describe, test, beforeEach, type Mock } from 'vitest';
import { onKeyDown } from '../utils/keydownListener.ts';

describe('onKeyDown', () => {
  let mockCloseWindow: Mock;
  let mockFirstEl: HTMLElement;
  let mockLastEl: HTMLElement;
  let mockPreventDefault: Mock;

  beforeEach(() => {
    mockCloseWindow = vi.fn();
    mockPreventDefault = vi.fn();

    mockFirstEl = {
      focus: vi.fn(),
    } as unknown as HTMLElement;

    mockLastEl = {
      focus: vi.fn(),
    } as unknown as HTMLElement;

    vi.clearAllMocks();
  });

  describe('Escape key handling (строки 9-11)', () => {
    test('should call closeWindow when Escape key is pressed', () => {
      const event = {
        key: 'Escape',
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [mockFirstEl, mockLastEl],
        firstEl: mockFirstEl,
        lastEl: mockLastEl,
      });

      expect(mockCloseWindow).toHaveBeenCalledTimes(1);
      expect(mockPreventDefault).not.toHaveBeenCalled();
    });

    test('should not call closeWindow for other keys', () => {
      const event = {
        key: 'Enter',
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [mockFirstEl, mockLastEl],
        firstEl: mockFirstEl,
        lastEl: mockLastEl,
      });

      expect(mockCloseWindow).not.toHaveBeenCalled();
    });
  });

  describe('Tab + Shift navigation (строки 13-16)', () => {
    test('should focus last element when Shift+Tab pressed from first element', () => {
      const event = {
        key: 'Tab',
        shiftKey: true,
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      Object.defineProperty(document, 'activeElement', {
        value: mockFirstEl,
        configurable: true,
      });

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [mockFirstEl, mockLastEl],
        firstEl: mockFirstEl,
        lastEl: mockLastEl,
      });

      expect(mockPreventDefault).toHaveBeenCalledTimes(1);
      expect(mockLastEl.focus).toHaveBeenCalledTimes(1);
    });

    test('should not prevent default when Shift+Tab but not on first element', () => {
      const event = {
        key: 'Tab',
        shiftKey: true,
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      const middleElement = {} as HTMLElement;
      Object.defineProperty(document, 'activeElement', {
        value: middleElement,
        configurable: true,
      });

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [mockFirstEl, middleElement, mockLastEl],
        firstEl: mockFirstEl,
        lastEl: mockLastEl,
      });

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLastEl.focus).not.toHaveBeenCalled();
    });

    test('should not handle Shift+Tab when focusableEls is empty', () => {
      const event = {
        key: 'Tab',
        shiftKey: true,
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      Object.defineProperty(document, 'activeElement', {
        value: mockFirstEl,
        configurable: true,
      });

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [],
        firstEl: mockFirstEl,
        lastEl: mockLastEl,
      });

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLastEl.focus).not.toHaveBeenCalled();
    });
  });

  describe('Tab navigation (строки 17-20)', () => {
    test('should focus first element when Tab pressed from last element', () => {
      const event = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      Object.defineProperty(document, 'activeElement', {
        value: mockLastEl,
        configurable: true,
      });

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [mockFirstEl, mockLastEl],
        firstEl: mockFirstEl,
        lastEl: mockLastEl,
      });

      expect(mockPreventDefault).toHaveBeenCalledTimes(1);
      expect(mockFirstEl.focus).toHaveBeenCalledTimes(1);
    });

    test('should not prevent default when Tab but not on last element', () => {
      const event = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      const middleElement = {} as HTMLElement;
      Object.defineProperty(document, 'activeElement', {
        value: middleElement,
        configurable: true,
      });

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [mockFirstEl, middleElement, mockLastEl],
        firstEl: mockFirstEl,
        lastEl: mockLastEl,
      });

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockFirstEl.focus).not.toHaveBeenCalled();
    });

    test('should not handle Tab when focusableEls is empty', () => {
      const event = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      Object.defineProperty(document, 'activeElement', {
        value: mockLastEl,
        configurable: true,
      });

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [],
        firstEl: mockFirstEl,
        lastEl: mockLastEl,
      });

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockFirstEl.focus).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    test('should handle single focusable element circular navigation', () => {
      const event = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      const singleElement = {
        focus: vi.fn(),
      } as unknown as HTMLElement;

      Object.defineProperty(document, 'activeElement', {
        value: singleElement,
        configurable: true,
      });

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [singleElement],
        firstEl: singleElement,
        lastEl: singleElement,
      });

      expect(mockPreventDefault).toHaveBeenCalledTimes(1);
      expect(singleElement.focus).toHaveBeenCalledTimes(1);
    });

    test('should handle Shift+Tab with single focusable element', () => {
      const event = {
        key: 'Tab',
        shiftKey: true,
        preventDefault: mockPreventDefault,
      } as unknown as KeyboardEvent;

      const singleElement = {
        focus: vi.fn(),
      } as unknown as HTMLElement;

      Object.defineProperty(document, 'activeElement', {
        value: singleElement,
        configurable: true,
      });

      onKeyDown({
        event,
        closeWindow: mockCloseWindow,
        focusableEls: [singleElement],
        firstEl: singleElement,
        lastEl: singleElement,
      });

      expect(mockPreventDefault).toHaveBeenCalledTimes(1);
      expect(singleElement.focus).toHaveBeenCalledTimes(1);
    });
  });
});
