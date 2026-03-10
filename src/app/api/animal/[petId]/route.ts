'use server';
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server";
import { deleteAnimal, getAnimalById, updateAnimal} from "~/server/animal/animal.service";


export async function GET(context: any) {
    const { params } = context as { params: { petId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const petId = parseInt(params.petId, 10);

    if (Number.isNaN(petId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        const animal = await getAnimalById(petId, userId);
        return NextResponse.json(animal, { status: 200 });
    }catch(error){
        return NextResponse.json({error: error},{status: 500})
    }

}

export async function PATCH(request: NextRequest, context: any){
    const { params } = context as { params: { petId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const petId = parseInt(params.petId, 10);

    if (Number.isNaN(petId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        const body = await request.json() as { 
            petId: number;
            name?: string;
            dateOfBirth?: string;
            species?: string;
            race?: string;
            sex?: string;
            weight?: string;
            chipNumber?: string;
            imageUrl?: string;
        };  
        await updateAnimal({...body, petId: petId}, userId);
        return NextResponse.json({ message: 'Updated' }, { status: 200 });
    }catch(error){
        return NextResponse.json({error: error},{status: 500})
    }

}

export async function DELETE(request: NextRequest, context: any) {
    const { params } = context as { params: { petId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })
    
    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const petId = parseInt(params.petId, 10);

    if (Number.isNaN(petId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }
    try{
        await deleteAnimal(petId,userId);
        return NextResponse.json({message: "Success"},{status: 200})
    }catch(error){
        return NextResponse.json({error: error},{status: 500})
    }

}