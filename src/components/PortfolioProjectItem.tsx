import { ReactNode, useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

interface ProjectItemProps {
    title: string
    subtitle: string
    children: ReactNode
}

export default function PortfolioProjectItem({ title, subtitle, children }: ProjectItemProps) {
    return (
        <article className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 bg-white dark:bg-gray-800 mb-8 last:mb-0">
            <header>
                <h3 className="text-xl font-semibold dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            </header>
            {children}
        </article>
    )
}

interface ProjectSectionProps {
    title: string
    children: ReactNode
}

export function ProjectSection({ title, children }: ProjectSectionProps) {
    return (
        <div>
            <h4 className="font-semibold mb-1 dark:text-gray-200">{title}</h4>
            {children}
        </div>
    )
}

interface ProjectImageProps {
    src: string
    alt: string
    caption?: string
    className?: string
}

export function ProjectImage({ src, alt, caption, className = '' }: ProjectImageProps) {
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isModalOpen])

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false)
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isModalOpen])

    if (hasError) {
        return (
            <div
                className={`mt-4 rounded-lg shadow overflow-hidden bg-gray-100 dark:bg-gray-700 p-8 text-center ${className}`}
            >
                <p className="text-gray-600 dark:text-gray-400">Image unavailable</p>
            </div>
        )
    }

    return (
        <>
            <figure className={`mt-4 ${className}`}>
                <div className="rounded-lg shadow overflow-hidden">
                    {isLoading && <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />}
                    <img
                        src={src}
                        alt={alt}
                        className={`w-full cursor-pointer transition-opacity hover:opacity-90 ${isLoading ? 'hidden' : ''}`}
                        onClick={() => setIsModalOpen(true)}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setHasError(true)
                            setIsLoading(false)
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                setIsModalOpen(true)
                            }
                        }}
                        aria-label={`Click to view ${alt} in larger size`}
                    />
                </div>
                {caption && (
                    <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center italic">
                        {caption}
                    </figcaption>
                )}
            </figure>

            {/* Modal/Lightbox */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90 p-4"
                    onClick={() => setIsModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Viewing ${alt}`}
                >
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded p-2 z-10"
                        aria-label="Close image viewer"
                    >
                        <FaTimes size={24} />
                    </button>
                    <div
                        className="relative max-w-full max-h-[85vh] flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <img src={src} alt={alt} className="max-w-full max-h-[80vh] object-contain" />
                        {caption && (
                            <figcaption className="mt-4 text-sm text-white text-center italic max-w-4xl px-4">
                                {caption}
                            </figcaption>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
