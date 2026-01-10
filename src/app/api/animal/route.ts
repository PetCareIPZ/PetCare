import { NextResponse } from 'next/server'
import { addAnimal, getAnimals } from '~/server/animal/animal.service'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
	const { userId } = await auth()

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const animals = await getAnimals(userId)
	return NextResponse.json(animals)
}

export async function POST(req: Request) {
	const { userId } = await auth()
	
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' },{ status: 401 })
	}

	const body = await req.json()
	const animal = await addAnimal({...body,ownerId: userId,})
	return NextResponse.json(animal, { status: 201 })
}
