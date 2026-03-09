import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import { deleteVacc, getAnimalById, getVaccById, updateVacc } from "~/server/animal/animal.service";

export async function GET(context: any) {
    const { params } = context as { params: { petId: string; vaccId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if(!userId){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(parseInt(params.petId), userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error : unknown) => {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.vaccId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        const vacc = await getVaccById(parseInt(params.vaccId), parseInt(params.petId));
        if (!vacc || vacc.length === 0) {
            return NextResponse.json({ error: 'Vaccination not found' }, { status: 404 });
        }
        return NextResponse.json(vacc, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function DELETE(context: any) {
    const { params } = context as { params: { petId: string; vaccId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(parseInt(params.petId), userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error : unknown) => {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.vaccId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        await deleteVacc(parseInt(params.vaccId), parseInt(params.petId));
        return NextResponse.json({ message: 'Vaccination deleted successfully' }, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, context: any) {
    const { params } = context as { params: { petId: string; vaccId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(parseInt(params.petId), userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error : unknown) => {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.vaccId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        const body = await request.json() as { vaccType?: string; vaccDate?: string; vaccDose?: string; vaccNote?: string; };
        await updateVacc({
            ...body, vaccId: parseInt(params.vaccId),
            petId: parseInt(params.petId)
        });
        return NextResponse.json({ message: 'Vaccination updated successfully' }, { status: 200 });
    }catch(error : unknown){
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}