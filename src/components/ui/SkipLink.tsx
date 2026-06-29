const SkipLink = () => {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus: top-4 focus:left-4 bg-accent text-white p-3 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-background"
    >
      Skip to main content
    </a>
  )
}

export default SkipLink
