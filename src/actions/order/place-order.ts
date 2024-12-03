'use server'

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { error } from "console";

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
    const {subTotal, tax, total} = productIds.reduce( (totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find( product => product.id === item.productId );

        if( !product ) throw new Error(`${item.productId} 500 - No existe`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
    }, {subTotal:0, tax:0, total:0})

    // Crear la transacción de Base de Datos
    const prismaTx = await prisma.$transaction(async(tx) => {

        // 1. Actualizar el Stock de los productos


        // 2. Crear la orden - Encabezado - Detalles
        const order = await tx.order.create({
            data: {
                userId: userId,
                itemsInOrder: itemsInOrder,
                subTotal: subTotal,
                tax: tax,
                total: total,

                OrderItem: {
                    createMany: {
                        data: productIds.map( p => ({
                            quantity: p.quantity,
                            size: p.size,
                            productId: p.productId,
                            price: products.find(product => product.id === p.productId)?.price ?? 0
                        }))
                    }
                }
            }
        });

        // Validar, si el precio es 0, entonces, lanzar un error.



        // 3. Crear la dirección de la orden
        const {country, ...restAddress} = address;
        const orderAddress = await tx.orderAddress.create({
            data: {
                ...restAddress,
                countryId: country,
                orderId: order.id,
            }
        })



        return {
            updatedProducts: [],
            order: order,
            orderAddress: orderAddress,
        }



    })

}