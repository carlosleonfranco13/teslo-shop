'use server'

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    // Verificar sesión de usuario
    if (!userId) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    // Obtener la info de todos los productos
    // NOTA: Recuerden que podemos llevar +2 productos con el mismo ID
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });

    // Calcular los montos - Encabezado
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    // Los totales de tax, subTotal, y total

}