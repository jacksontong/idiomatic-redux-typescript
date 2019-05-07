import React from 'react'

type Props = {
    message: string,
    onRetry: () => void
}

const FetchError: React.FC<Props> = ({
    message,
    onRetry
}) => (
        <p>
            <strong>Error: {message}</strong><br />
            <button onClick={onRetry}>Retry</button>
        </p>
    )

export default FetchError