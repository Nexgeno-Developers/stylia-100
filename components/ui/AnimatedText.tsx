interface AnimatedTextProps {
  text: string
  delay?: number
  className?: string
  isVisible: boolean
}

// Animated text component that splits text into characters
const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  className = '',
  isVisible,
}) => {
  const words = text.split(' ')
  let charIndex = 0

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, idx) => {
            const currentCharIndex = charIndex++
            return (
              <span
                key={idx}
                className="inline-block"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(120%)',
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                  transitionDelay: `${delay + currentCharIndex * 30}ms`,
                }}
              >
                {char}
              </span>
            )
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}

export default AnimatedText
