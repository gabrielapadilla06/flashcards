'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Box, CircularProgress, Container, Typography } from "@mui/material"

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchChekoutSession = async () => {
            if (!sessionId) {
                return
            }
            try {
                const res = await fetch(`/api/checkout-session?session_id=${sessionId}`)
                const sessionData = await res.json()
                if (res.ok) {
                    setSession(sessionData)
                } else {
                    setError(sessionData.error)
                }
            } catch (err) {
                console.error(err)
                setError('An error occurred while retrieving the session.')
            } finally {
                setLoading(false)
            }
        }

        fetchChekoutSession()
    }, [sessionId])

    if (loading) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6">{error}</Typography>
            </Container>
        )
    }

    return (
        <Container maxWidth="100vw" sx={{ textAlign: 'center', mt: 4 }}>
            {
                session.payment_status === 'paid' ? (
                    <>
                        <Typography variant="h4">Thank you for your payment</Typography>
                        <Box sx={{ mt: 22 }}>
                            <Typography variant="h6">Payment ID: {session.payment_id}</Typography>
                            <Typography variant="h6">Amount: {session.amount}</Typography>
                            <Typography variant="body1">You will receive an email confirmation shortly.</Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h4">Payment failed</Typography>
                        <Box sx={{ mt: 22 }}>
                            <Typography variant="body1">Your payment was not successful. Please try again.</Typography>
                        </Box>
                    </>
                )
            }
        </Container>
    )
}

export default ResultPage
