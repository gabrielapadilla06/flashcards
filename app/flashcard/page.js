'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { CollectionReference, doc, getDoc, setDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);

    const searchParams = userSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(docRef)

           const flashcards = []

           docs.forEach((doc) => {
            flashcards.push({id: doc.id, ...doc.data()})
           })
           setFlashcards(flashcards)
        }

        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }
}