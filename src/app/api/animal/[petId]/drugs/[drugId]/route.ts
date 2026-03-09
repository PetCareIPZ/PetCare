import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import { deleteDrug, getAnimalById, getDrugById, updateDrug } from "~/server/animal/animal.service";


export async function GET(request: NextRequest, context: any) {
    const { params } = context as { params: { petId: string; drugId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const petId = Number(params.petId)
    const drugId = Number(params.drugId)

    if (Number.isNaN(petId) || Number.isNaN(drugId)) {
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
        const drug = await getDrugById(drugId, petId);
        if (!drug || drug.length === 0) {
            return NextResponse.json({ error: 'Drug not found' }, { status: 404 });
        }
        return NextResponse.json(drug, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, context: any) {
    const { params } = context as { params: { petId: string; drugId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const petId = Number(params.petId)
    const drugId = Number(params.drugId)

    if (Number.isNaN(petId) || Number.isNaN(drugId)) {
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
        await deleteDrug(drugId, petId);
        return NextResponse.json({ message: 'Drug deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, context: any) {
    const { params } = context as { params: { petId: string; drugId: string } }
    const { isAuthenticated, userId } = await auth({ acceptsToken: 'api_key' })

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const petId = Number(params.petId)
    const drugId = Number(params.drugId)

    if (Number.isNaN(petId) || Number.isNaN(drugId)) {
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
        const body = await request.json() as {
            drugType: string;
            drugDate: string;
            drugDose: string;
            drugNote?: string;
        };
        await updateDrug({
            ...body,
            drugId,
            petId,
        });
        return NextResponse.json({ message: 'Drug updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}