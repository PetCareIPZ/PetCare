import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { addDrug, getAnimalById, getDrugs } from '~/server/animal/animal.service';

export async function GET(context: any) {
    const { params } = context as { params: { petId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const petId = Number(params.petId)

    if (Number.isNaN(petId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    const animal = await getAnimalById(petId, userId)
    if (!animal || animal.length === 0) {
        return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    try {
        return NextResponse.json(await getDrugs(petId), { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function POST(request: NextRequest, context: any) {
    const { params } = context as { params: { petId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    
    const petId = Number(params.petId)

    if (Number.isNaN(petId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    const animal = await getAnimalById(petId, userId)
    if (!animal || animal.length === 0) {
        return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    try{
        const body = await request.json() as { drugType: string; drugDate: string; drugDose: string; drugNote: string; };

        await addDrug({ ...body, petId });
        return NextResponse.json({ message: "Drug added successfully" }, { status: 201 });
    } catch (error : unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 })
    }
}