import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import { deleteDrug, getAnimalById, getDrugById, updateDrug } from "~/server/animal/animal.service";


export async function GET(request: Request, { params }: { params: { petId: number; drugId: number } }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(params.petId, userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error: Error) => {
        return NextResponse.json({ error: error }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.drugId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        const drug = await getDrugById(params.drugId, params.petId);
        if (!drug || drug.length === 0) {
            return NextResponse.json({ error: 'Drug not found' }, { status: 404 });
        }
        return NextResponse.json(drug, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { petId: number; drugId: number } }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(params.petId, userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error: Error) => {
        return NextResponse.json({ error: error.message }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.drugId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        await deleteDrug(params.drugId, params.petId);
        return NextResponse.json({ message: 'Drug deleted successfully' }, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function PATCH(request: Request, { params }: { params: { petId: number; drugId: number } }) {
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    getAnimalById(params.petId, userId).then((animal) => {
        if (!animal || animal.length === 0) {
            return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
        }
    }).catch((error: Error) => {
        return NextResponse.json({ error: error.message }, { status: 500 });
    });

    if (Number.isNaN(params.petId) || Number.isNaN(params.drugId)) {
        return NextResponse.json(
            { error: "Invalid ID" },
            { status: 400 }
        );
    }

    try{
        const body = await request.json() as {
            drugType: string;
            drugDate: string;
            drugDose: string;
            drugNote?: string;
        };
        await updateDrug({
            ...body, drugId: params.drugId,
            petId: params.petId
        });
        return NextResponse.json({ message: 'Drug updated successfully' }, { status: 200 });
    }catch(error){
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}