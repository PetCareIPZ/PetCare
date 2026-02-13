'use server';
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import { deleteAnimal } from "~/server/animal/animal.service";


export async function GET(){

}

export async function PATCH(){

}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })
	
	if (!isAuthenticated) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

    const petId = parseInt(params.id, 10);

    if (Number.isNaN(petId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }
    try{
        deleteAnimal(petId,userId!);
        return NextResponse.json({message: "Success"},{status: 200})
    }catch(error){
        return NextResponse.json({error: error},{status: 500})
    }

}