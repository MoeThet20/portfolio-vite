import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Contact from '../Contact'


// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon">📧</div>,
  Phone: () => <div data-testid="phone-icon">📞</div>,
  MapPin: () => <div data-testid="mappin-icon">📍</div>,
  Github: () => <div data-testid="github-icon">🐙</div>,
  Linkedin: () => <div data-testid="linkedin-icon">💼</div>,
  Twitter: () => <div data-testid="twitter-icon">🐦</div>,
  Download: () => <div data-testid="download-icon">⬇️</div>,
}))

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: 'Get In Touch' })).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Contact />)
    expect(screen.getByText(/I'm always open to discussing new opportunities and interesting projects/)).toBeInTheDocument()
    expect(screen.getByText(/Let's connect and create something amazing together!/)).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Contact />)
    
    // Check for specific contact values instead of labels to avoid duplication
    expect(screen.getByText('hello@developer.com')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
    
    // Check that labels exist (there may be duplicates between contact info and form)
    expect(screen.getAllByText('Email').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Phone').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Location').length).toBeGreaterThanOrEqual(1)
  })

  it('renders contact icons', () => {
    render(<Contact />)
    
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument()
    expect(screen.getByTestId('mappin-icon')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Contact />)
    
    expect(screen.getByTestId('github-icon')).toBeInTheDocument()
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<Contact />)
    
    expect(screen.getByRole('heading', { name: 'Send Message' })).toBeInTheDocument()
    
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your project...')).toBeInTheDocument()
    
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('has proper form field placeholders', () => {
    render(<Contact />)
    
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your project...')).toBeInTheDocument()
  })

  it('renders download resume button', () => {
    render(<Contact />)
    
    const resumeButton = screen.getByRole('button', { name: '⬇️ Resume' })
    expect(resumeButton).toBeInTheDocument()
    expect(screen.getByTestId('download-icon')).toBeInTheDocument()
  })

  it('downloads CV when resume button is clicked', () => {
    // Mock document.createElement and appendChild/removeChild
    const mockLink = {
      href: '',
      download: '',
      click: vi.fn(),
    }
    vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any)
    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any)

    render(<Contact />)
    const resumeButton = screen.getByRole('button', { name: '⬇️ Resume' })
    
    fireEvent.click(resumeButton)
    
    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(mockLink.href).toBe('/cv-resume.pdf')
    expect(mockLink.download).toBe('John-Developer-CV.pdf')
    expect(mockLink.click).toHaveBeenCalled()
    expect(appendChildSpy).toHaveBeenCalled()
    expect(removeChildSpy).toHaveBeenCalled()
  })

  it('can fill out the contact form', () => {
    render(<Contact />)
    
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Hello, I would like to work with you!' } })
    
    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect(messageInput.value).toBe('Hello, I would like to work with you!')
  })

  it('has proper semantic structure', () => {
    render(<Contact />)
    
    const section = screen.getByText('Get In Touch').closest('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'contact')
    
    const mainHeading = screen.getByRole('heading', { name: 'Get In Touch' })
    expect(mainHeading.tagName).toBe('H2')
    
    const form = screen.getByRole('form') || screen.getByText('Send Message').closest('form')
    expect(form).toBeInTheDocument()
  })

  it('renders with proper responsive classes', () => {
    render(<Contact />)
    
    const section = screen.getByText('Get In Touch').closest('section')
    expect(section).toHaveClass('min-h-screen', 'py-16', 'sm:py-20', 'relative')
  })

  it('has proper form accessibility', () => {
    render(<Contact />)
    
    const nameInput = screen.getByLabelText('Name')
    expect(nameInput).toHaveAttribute('type', 'text')
    
    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toHaveAttribute('type', 'email')
    
    const messageInput = screen.getByLabelText('Message')
    expect(messageInput.tagName).toBe('TEXTAREA')
  })
})