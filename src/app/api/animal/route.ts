import { NextResponse } from 'next/server'
import { addAnimal, getAnimals } from '~/server/animal/animal.service'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
	const { userId } = await auth({ acceptsToken: 'any' })
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	try{
		return NextResponse.json(await getAnimals(userId as string), { status: 200 })
	}catch(error){
		return NextResponse.json({ error: (error as Error).message }, { status: 500 })
	}
}

export async function POST(req: Request) {
	const { userId } = await auth()
	
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' },{ status: 401 })
	}

	const body = await req.json() as { name: string; dateOfBirth: string; species: string; race: string; sex: string; weight: string; chipNumber: string; imageUrl: string; };
	const animal = await addAnimal({...body,userId: userId,})
	return NextResponse.json(animal, { status: 201 })
}

