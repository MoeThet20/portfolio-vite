import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/test-utils'
import Hero from '../Hero'


// Mock scrollIntoView
const mockScrollIntoView = vi.fn()
Element.prototype.scrollIntoView = mockScrollIntoView

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByText(/Hello, I'm/)).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Hero />)
    expect(screen.getByText(/Full-stack developer passionate about creating beautiful/)).toBeInTheDocument()
    expect(screen.getByText(/functional web experiences with modern technologies/)).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: 'View Projects' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Download CV' })).toBeInTheDocument()
  })

  it('renders technology badges', () => {
    render(<Hero />)
    expect(screen.getByText('HTML')).toBeInTheDocument()
    expect(screen.getByText('CSS')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('scrolls to projects section when "View Projects" is clicked', () => {
    // Mock getElementById
    const mockElement = { scrollIntoView: mockScrollIntoView }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)

    render(<Hero />)
    const viewProjectsButton = screen.getByRole('button', { name: 'View Projects' })
    
    fireEvent.click(viewProjectsButton)
    
    expect(document.getElementById).toHaveBeenCalledWith('projects')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('downloads CV when "Download CV" is clicked', () => {
    // Mock document.createElement and appendChild/removeChild
    const mockLink = {
      href: '',
      download: '',
      click: vi.fn(),
    }
    vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any)
    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any)

    render(<Hero />)
    const downloadButton = screen.getByRole('button', { name: 'Download CV' })
    
    fireEvent.click(downloadButton)
    
    expect(document.createElement).toHaveBeenCalledWith('a')
    expect(mockLink.href).toBe('/cv-resume.pdf')
    expect(mockLink.download).toBe('John-Developer-CV.pdf')
    expect(mockLink.click).toHaveBeenCalled()
    expect(appendChildSpy).toHaveBeenCalled()
    expect(removeChildSpy).toHaveBeenCalled()
  })

  it('scrolls to about section when scroll indicator is clicked', () => {
    // Mock getElementById
    const mockElement = { scrollIntoView: mockScrollIntoView }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any)

    render(<Hero />)
    // The scroll indicator should be the ChevronDown icon
    const scrollIndicator = screen.getByRole('button')
    
    fireEvent.click(scrollIndicator)
    
    expect(document.getElementById).toHaveBeenCalledWith('about')
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('has proper semantic structure', () => {
    render(<Hero />)
    
    const section = screen.getByRole('main') || screen.getByText(/Hello, I'm/).closest('section')
    expect(section).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})