import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import { deleteVacc, getAnimalById, getVaccById, updateVacc } from "~/server/animal/animal.service";

export async function GET(request: Request, { params }: { params: { petId: number; vaccId: number } }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(params.petId, userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error) => {
        return NextResponse.json({ error: error }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.vaccId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        const vacc = await getVaccById(params.vaccId, params.petId);
        if (!vacc || vacc.length === 0) {
            return NextResponse.json({ error: 'Vaccination not found' }, { status: 404 });
        }
        return NextResponse.json(vacc, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { petId: number; vaccId: number } }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(params.petId, userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error) => {
        return NextResponse.json({ error: error }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.vaccId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        await deleteVacc(params.vaccId, params.petId);
        return NextResponse.json({ message: 'Vaccination deleted successfully' }, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function PATCH(request: Request, { params }: { params: { petId: number; vaccId: number } }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(params.petId, userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error) => {
        return NextResponse.json({ error: error }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.vaccId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        const body = await request.json();
        const vaccData = {
            vaccType: body.vaccType ?? undefined,
            vaccDate: body.vaccDate ?? undefined,
            vaccDose: body.vaccDose ?? undefined,
            vaccNote: body.vaccNote ?? undefined
        }
        await updateVacc({
            ...vaccData, vaccId: params.vaccId,
            petId: params.petId
        });
        return NextResponse.json({ message: 'Vaccination updated successfully' }, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}