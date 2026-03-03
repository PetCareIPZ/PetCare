import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { addDrug, getAnimalById, getDrugs } from '~/server/animal/animal.service';

export async function GET(request: Request, { params }: { params: { petId: number } }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(params.petId, userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error : Error) => {
        return NextResponse.json({ error: error.message }, { status: 500 });
    });

    if (Number.isNaN(params.petId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        return NextResponse.json(await getDrugs(params.petId), { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function POST(request: Request, { params }: { params: {petId: number; drugType: string; drugDate: string; drugDose: string; drugNote: string;} }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    
    if (Number.isNaN(params.petId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    getAnimalById(params.petId, userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error : unknown) => {
        const message = error instanceof Error ? error.message : "An unknown error occurred";

        return NextResponse.json({ error: message }, { status: 500 });
    });

    try{
        const body = await request.json() as { drugType: string; drugDate: string; drugDose: string; drugNote: string; };

        await addDrug({...body, petId: params.petId});
        return NextResponse.json({ message: "Drug added successfully" }, { status: 201 });
    }catch(error : unknown){
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 })
    }
}